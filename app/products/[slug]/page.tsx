'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { FiShoppingCart } from 'react-icons/fi'

interface Product {
  id: string
  name: string
  description: string
  price: number
  brand?: string
  category: { name: string }
  images: Array<{ url: string; alt?: string }>
  variants: Array<{ id: string; color?: string; size?: string; stock: number }>
  reviews: Array<{
    rating: number
    title?: string
    comment: string
    user: { name: string }
    createdAt: string
  }>
  avgRating: number
  reviewCount: number
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const { data: session } = useSession()
  const router = useRouter()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [adding, setAdding] = useState(false)

  useEffect(() => {
    fetchProduct()
  }, [params.slug])

  const fetchProduct = async () => {
    try {
      // First get by slug
      const res = await fetch(`/api/products?search=${params.slug}`)
      const data = await res.json()

      if (data.products && data.products.length > 0) {
        const foundProduct = data.products.find((p: any) => p.slug === params.slug)
        if (foundProduct) {
          // Get full product details
          const detailRes = await fetch(`/api/products/${foundProduct.id}`)
          const detailData = await detailRes.json()
          setProduct(detailData)
        }
      }
    } catch (error) {
      console.error('Error fetching product:', error)
    } finally {
      setLoading(false)
    }
  }

  const addToCart = async () => {
    if (!session) {
      toast.error('Please sign in to add items to cart')
      router.push('/auth/signin')
      return
    }

    try {
      setAdding(true)
      const res = await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: product?.id,
          quantity,
        }),
      })

      if (res.ok) {
        toast.success('Added to cart!')
      } else {
        toast.error('Failed to add to cart')
      }
    } catch (error) {
      toast.error('An error occurred')
    } finally {
      setAdding(false)
    }
  }

  if (loading) {
    return (
      <div className="section-padding">
        <div className="container-custom">
          <div className="animate-pulse flex flex-col lg:flex-row gap-8">
            <div className="lg:w-1/2 space-y-4">
              <div className="aspect-square bg-gray-200" />
            </div>
            <div className="lg:w-1/2 space-y-4">
              <div className="h-8 bg-gray-200 rounded w-3/4" />
              <div className="h-6 bg-gray-200 rounded w-1/4" />
              <div className="h-24 bg-gray-200 rounded" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="section-padding">
        <div className="container-custom text-center">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <button onClick={() => router.push('/shop')} className="btn-primary">
            Back to Shop
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="section-padding">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Images */}
          <div>
            <div className="aspect-square bg-gray-100 mb-4 overflow-hidden">
              {product.images[selectedImage] ? (
                <img
                  src={product.images[selectedImage].url}
                  alt={product.images[selectedImage].alt || product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  No Image
                </div>
              )}
            </div>
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`aspect-square bg-gray-100 border-2 ${
                      selectedImage === idx ? 'border-black' : 'border-transparent'
                    }`}
                  >
                    <img
                      src={img.url}
                      alt={img.alt || `${product.name} ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-4xl font-bold mb-2">{product.name}</h1>
            {product.brand && (
              <p className="text-gray-600 mb-4">{product.brand}</p>
            )}
            <p className="text-3xl font-bold mb-6">${product.price.toFixed(2)}</p>

            {product.reviewCount > 0 && (
              <div className="flex items-center gap-2 mb-6">
                <span className="text-yellow-500">⭐</span>
                <span className="font-medium">{product.avgRating.toFixed(1)}</span>
                <span className="text-gray-600">({product.reviewCount} reviews)</span>
              </div>
            )}

            <p className="text-gray-700 mb-8 leading-relaxed">
              {product.description}
            </p>

            <div className="space-y-6">
              <div>
                <label className="block font-medium mb-2">Quantity</label>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-10 h-10 border border-gray-300 hover:bg-gray-100"
                  >
                    -
                  </button>
                  <span className="w-12 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-10 h-10 border border-gray-300 hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={addToCart}
                disabled={adding}
                className="btn-primary w-full flex items-center justify-center gap-2"
              >
                <FiShoppingCart />
                {adding ? 'Adding...' : 'Add to Cart'}
              </button>
            </div>

            {/* Reviews */}
            {product.reviews.length > 0 && (
              <div className="mt-12 pt-12 border-t">
                <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
                <div className="space-y-6">
                  {product.reviews.map((review, idx) => (
                    <div key={idx} className="border-b pb-6">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-yellow-500">
                          {'⭐'.repeat(review.rating)}
                        </span>
                        <span className="font-medium">{review.user.name}</span>
                      </div>
                      {review.title && (
                        <h3 className="font-semibold mb-1">{review.title}</h3>
                      )}
                      <p className="text-gray-700">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
