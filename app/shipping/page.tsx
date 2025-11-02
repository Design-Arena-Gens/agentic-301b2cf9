export default function ShippingPage() {
  return (
    <div className="section-padding">
      <div className="container-custom max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">Shipping & Returns</h1>

        <div className="prose prose-lg space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4">Shipping Information</h2>

            <h3 className="text-xl font-semibold mb-3">Shipping Rates</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Standard Shipping (5-7 business days): $10.00</li>
              <li>Express Shipping (2-3 business days): $20.00</li>
              <li>Free Standard Shipping on orders over $100</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-6">Processing Time</h3>
            <p className="text-gray-700">
              Orders are processed within 1-2 business days. Orders placed on
              weekends or holidays will be processed on the next business day.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">International Shipping</h3>
            <p className="text-gray-700">
              We currently ship to the United States and Canada. International
              shipping rates vary by destination and will be calculated at
              checkout. International orders may be subject to customs fees and
              import taxes.
            </p>
          </section>

          <section className="border-t pt-8">
            <h2 className="text-2xl font-bold mb-4">Return Policy</h2>

            <h3 className="text-xl font-semibold mb-3">30-Day Returns</h3>
            <p className="text-gray-700 mb-3">
              We offer a 30-day return policy on most items. To be eligible for a
              return, items must be:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Unworn, unwashed, and in original condition</li>
              <li>With all original tags attached</li>
              <li>In original packaging</li>
              <li>Accompanied by proof of purchase</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-6">Non-Returnable Items</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Final sale items</li>
              <li>Undergarments and swimwear</li>
              <li>Personalized or customized items</li>
              <li>Items damaged due to misuse</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-6">How to Return</h3>
            <ol className="list-decimal pl-6 space-y-2 text-gray-700">
              <li>Contact our customer service at support@fashionboutique.com</li>
              <li>Receive your return authorization and shipping label</li>
              <li>Pack items securely in original packaging</li>
              <li>Ship items back using the provided label</li>
            </ol>

            <h3 className="text-xl font-semibold mb-3 mt-6">Refunds</h3>
            <p className="text-gray-700">
              Once we receive and inspect your return, we'll process your refund
              within 5-10 business days. Refunds will be issued to the original
              payment method. Shipping costs are non-refundable.
            </p>
          </section>

          <section className="border-t pt-8">
            <h2 className="text-2xl font-bold mb-4">Exchanges</h2>
            <p className="text-gray-700">
              We currently do not offer direct exchanges. If you need a different
              size or color, please return the original item for a refund and
              place a new order.
            </p>
          </section>

          <section className="border-t pt-8">
            <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
            <p className="text-gray-700">
              For questions about shipping or returns, please contact us at
              support@fashionboutique.com or call +1 (555) 123-4567.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
