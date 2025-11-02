import Link from 'next/link'
import { FiArrowRight } from 'react-icons/fi'

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[600px] bg-gray-100 flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent z-10" />
        <div className="relative z-20 container-custom text-white">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 max-w-2xl">
            Elevate Your Style
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-xl">
            Discover premium fashion and timeless pieces that define elegance.
          </p>
          <Link href="/shop" className="btn-primary inline-flex items-center gap-2">
            Shop Now <FiArrowRight />
          </Link>
        </div>
      </section>

      {/* Categories Section */}
      <section className="section-padding">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            Shop by Category
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              href="/shop?categoryId=men"
              className="group relative h-96 overflow-hidden bg-gray-200"
            >
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors z-10" />
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <h3 className="text-white text-3xl font-bold">Men</h3>
              </div>
            </Link>

            <Link
              href="/shop?categoryId=women"
              className="group relative h-96 overflow-hidden bg-gray-200"
            >
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors z-10" />
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <h3 className="text-white text-3xl font-bold">Women</h3>
              </div>
            </Link>

            <Link
              href="/shop?categoryId=shoes"
              className="group relative h-96 overflow-hidden bg-gray-200"
            >
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors z-10" />
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <h3 className="text-white text-3xl font-bold">Shoes</h3>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <h3 className="text-xl font-bold mb-4">Free Shipping</h3>
              <p className="text-gray-600">
                On orders over $100. Fast and reliable delivery worldwide.
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-bold mb-4">Easy Returns</h3>
              <p className="text-gray-600">
                30-day return policy. Shop with confidence.
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-bold mb-4">Premium Quality</h3>
              <p className="text-gray-600">
                Carefully curated collection of the finest materials.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Stay in the Loop
            </h2>
            <p className="text-gray-600 mb-8">
              Subscribe to our newsletter for exclusive offers and updates.
            </p>
            <form className="flex gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="input-field flex-1"
              />
              <button type="submit" className="btn-primary">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}
