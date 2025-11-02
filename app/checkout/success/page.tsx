import Link from 'next/link'
import { FiCheckCircle } from 'react-icons/fi'

export default function CheckoutSuccessPage() {
  return (
    <div className="section-padding">
      <div className="container-custom">
        <div className="max-w-2xl mx-auto text-center">
          <FiCheckCircle className="mx-auto text-green-500 mb-6" size={80} />
          <h1 className="text-4xl font-bold mb-4">Order Confirmed!</h1>
          <p className="text-gray-600 mb-8">
            Thank you for your purchase. Your order has been received and is being
            processed. You will receive an email confirmation shortly.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/dashboard/orders" className="btn-primary">
              View Orders
            </Link>
            <Link href="/shop" className="btn-secondary">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
