import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { z } from 'zod'

const orderSchema = z.object({
  items: z.array(
    z.object({
      productId: z.string(),
      variantId: z.string().optional(),
      quantity: z.number().positive(),
    })
  ),
  shippingInfo: z.object({
    fullName: z.string(),
    email: z.string().email(),
    phone: z.string(),
    address: z.string(),
    city: z.string(),
    state: z.string(),
    zipCode: z.string(),
    country: z.string(),
  }),
  discountCode: z.string().optional(),
})

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const orders = await prisma.order.findMany({
      where: { userId: session.user.id },
      include: {
        items: {
          include: {
            product: {
              include: {
                images: { take: 1 },
              },
            },
          },
        },
        shippingInfo: true,
      },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(orders)
  } catch (error) {
    console.error('Error fetching orders:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { items, shippingInfo, discountCode } = orderSchema.parse(body)

    // Calculate order totals
    const products = await prisma.product.findMany({
      where: {
        id: { in: items.map((item: any) => item.productId) },
      },
    })

    let subtotal = 0
    const orderItems = items.map((item: any) => {
      const product = products.find((p: any) => p.id === item.productId)
      if (!product) throw new Error('Product not found')

      const price = product.price
      subtotal += price * item.quantity

      return {
        productId: item.productId,
        variantId: item.variantId,
        quantity: item.quantity,
        price,
      }
    })

    const shippingCost = subtotal > 100 ? 0 : 10
    const tax = subtotal * 0.08
    let discount = 0

    if (discountCode) {
      const discountObj = await prisma.discount.findUnique({
        where: { code: discountCode, active: true },
      })

      if (
        discountObj &&
        new Date() >= discountObj.validFrom &&
        new Date() <= discountObj.validUntil
      ) {
        if (discountObj.type === 'PERCENTAGE') {
          discount = subtotal * (discountObj.value / 100)
          if (discountObj.maxDiscount && discount > discountObj.maxDiscount) {
            discount = discountObj.maxDiscount
          }
        } else {
          discount = discountObj.value
        }

        await prisma.discount.update({
          where: { id: discountObj.id },
          data: { usageCount: { increment: 1 } },
        })
      }
    }

    const total = subtotal + shippingCost + tax - discount

    const order = await prisma.order.create({
      data: {
        userId: session.user.id,
        subtotal,
        tax,
        shippingCost,
        discount,
        discountCode,
        total,
        items: {
          create: orderItems,
        },
        shippingInfo: {
          create: shippingInfo,
        },
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
        shippingInfo: true,
      },
    })

    // Clear cart after order
    await prisma.cartItem.deleteMany({
      where: { userId: session.user.id },
    })

    return NextResponse.json(order, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 })
    }
    console.error('Error creating order:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
