import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 10)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@fashionboutique.com' },
    update: {},
    create: {
      email: 'admin@fashionboutique.com',
      name: 'Admin User',
      password: hashedPassword,
      role: 'ADMIN',
    },
  })

  console.log('✅ Admin user created:', admin.email)

  // Create test user
  const testUserPassword = await bcrypt.hash('test123', 10)
  const testUser = await prisma.user.upsert({
    where: { email: 'test@example.com' },
    update: {},
    create: {
      email: 'test@example.com',
      name: 'Test User',
      password: testUserPassword,
      role: 'USER',
    },
  })

  console.log('✅ Test user created:', testUser.email)

  // Create categories
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: 'men' },
      update: {},
      create: {
        name: "Men's Fashion",
        slug: 'men',
        description: 'Premium menswear collection',
        image: 'https://images.unsplash.com/photo-1490114538077-0a7f8cb49891',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'women' },
      update: {},
      create: {
        name: "Women's Fashion",
        slug: 'women',
        description: 'Elegant womens apparel',
        image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'shoes' },
      update: {},
      create: {
        name: 'Shoes',
        slug: 'shoes',
        description: 'Footwear for every occasion',
        image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772',
      },
    }),
  ])

  console.log('✅ Categories created:', categories.length)

  // Create sample products
  const products = [
    {
      name: 'Classic Cotton T-Shirt',
      slug: 'classic-cotton-tshirt',
      description:
        'Premium 100% cotton t-shirt with a comfortable fit. Perfect for everyday wear. Made from soft, breathable fabric that gets better with every wash.',
      price: 29.99,
      categoryId: categories[0].id,
      brand: 'Fashion Co',
      featured: true,
      images: [
        {
          url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab',
          alt: 'Classic Cotton T-Shirt',
          order: 0,
        },
      ],
    },
    {
      name: 'Slim Fit Jeans',
      slug: 'slim-fit-jeans',
      description:
        'Modern slim fit jeans with stretch denim for comfort and style. Features a classic five-pocket design and premium construction.',
      price: 79.99,
      categoryId: categories[0].id,
      brand: 'Denim Studio',
      featured: true,
      images: [
        {
          url: 'https://images.unsplash.com/photo-1542272604-787c3835535d',
          alt: 'Slim Fit Jeans',
          order: 0,
        },
      ],
    },
    {
      name: 'Elegant Summer Dress',
      slug: 'elegant-summer-dress',
      description:
        'Flowing summer dress in lightweight fabric. Perfect for warm weather occasions. Features a flattering silhouette and beautiful print.',
      price: 89.99,
      categoryId: categories[1].id,
      brand: 'Elegance',
      featured: true,
      images: [
        {
          url: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8',
          alt: 'Elegant Summer Dress',
          order: 0,
        },
      ],
    },
    {
      name: 'Wool Blend Blazer',
      slug: 'wool-blend-blazer',
      description:
        'Professional wool blend blazer with a tailored fit. Perfect for the office or formal occasions. Features notch lapels and two-button closure.',
      price: 149.99,
      categoryId: categories[1].id,
      brand: 'Professional Line',
      featured: false,
      images: [
        {
          url: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea',
          alt: 'Wool Blend Blazer',
          order: 0,
        },
      ],
    },
    {
      name: 'Leather Sneakers',
      slug: 'leather-sneakers',
      description:
        'Premium leather sneakers with cushioned insole. Combines style and comfort for all-day wear. Features a classic design that never goes out of style.',
      price: 119.99,
      categoryId: categories[2].id,
      brand: 'Footwear Pro',
      featured: true,
      images: [
        {
          url: 'https://images.unsplash.com/photo-1549298916-b41d501d3772',
          alt: 'Leather Sneakers',
          order: 0,
        },
      ],
    },
    {
      name: 'Running Shoes',
      slug: 'running-shoes',
      description:
        'High-performance running shoes with advanced cushioning technology. Lightweight and breathable for maximum comfort during workouts.',
      price: 139.99,
      categoryId: categories[2].id,
      brand: 'Athletic Gear',
      featured: false,
      images: [
        {
          url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
          alt: 'Running Shoes',
          order: 0,
        },
      ],
    },
    {
      name: 'Casual Button-Down Shirt',
      slug: 'casual-button-down-shirt',
      description:
        'Versatile button-down shirt in soft cotton. Perfect for casual or semi-formal occasions. Available in multiple colors.',
      price: 49.99,
      categoryId: categories[0].id,
      brand: 'Fashion Co',
      featured: false,
      images: [
        {
          url: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c',
          alt: 'Casual Button-Down Shirt',
          order: 0,
        },
      ],
    },
    {
      name: 'Silk Evening Gown',
      slug: 'silk-evening-gown',
      description:
        'Luxurious silk evening gown for special occasions. Features an elegant silhouette and premium silk fabric.',
      price: 299.99,
      categoryId: categories[1].id,
      brand: 'Luxury Collection',
      featured: true,
      images: [
        {
          url: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae',
          alt: 'Silk Evening Gown',
          order: 0,
        },
      ],
    },
  ]

  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {},
      create: {
        name: product.name,
        slug: product.slug,
        description: product.description,
        price: product.price,
        categoryId: product.categoryId,
        brand: product.brand,
        featured: product.featured,
        images: {
          create: product.images,
        },
        variants: {
          create: [
            {
              size: 'S',
              sku: `${product.slug.toUpperCase()}-S`,
              stock: 10,
            },
            {
              size: 'M',
              sku: `${product.slug.toUpperCase()}-M`,
              stock: 15,
            },
            {
              size: 'L',
              sku: `${product.slug.toUpperCase()}-L`,
              stock: 12,
            },
          ],
        },
      },
    })
  }

  console.log('✅ Products created:', products.length)

  // Create a discount code
  await prisma.discount.upsert({
    where: { code: 'WELCOME10' },
    update: {},
    create: {
      code: 'WELCOME10',
      description: 'Welcome discount - 10% off',
      type: 'PERCENTAGE',
      value: 10,
      validFrom: new Date(),
      validUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year from now
      usageLimit: 1000,
      active: true,
    },
  })

  console.log('✅ Discount code created: WELCOME10')
  console.log('🎉 Seeding completed!')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
