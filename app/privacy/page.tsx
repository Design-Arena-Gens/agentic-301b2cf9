export default function PrivacyPage() {
  return (
    <div className="section-padding">
      <div className="container-custom max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>

        <div className="prose prose-lg space-y-6">
          <p className="text-sm text-gray-600">Last updated: January 2025</p>

          <section>
            <h2 className="text-2xl font-bold mb-4">Introduction</h2>
            <p className="text-gray-700">
              Fashion Boutique ("we," "our," or "us") respects your privacy and is
              committed to protecting your personal data. This privacy policy
              explains how we collect, use, and safeguard your information when
              you visit our website and make purchases.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Information We Collect</h2>
            <p className="text-gray-700 mb-3">
              We collect the following types of information:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Personal identification information (name, email, phone number)</li>
              <li>Shipping and billing addresses</li>
              <li>Payment information (processed securely through Stripe)</li>
              <li>Order history and preferences</li>
              <li>Website usage data and cookies</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">How We Use Your Information</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Process and fulfill your orders</li>
              <li>Communicate with you about your orders and account</li>
              <li>Send promotional emails (with your consent)</li>
              <li>Improve our website and services</li>
              <li>Prevent fraud and ensure security</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Data Security</h2>
            <p className="text-gray-700">
              We implement appropriate security measures to protect your personal
              information. All payment transactions are encrypted and processed
              through Stripe, a PCI-compliant payment processor.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Your Rights</h2>
            <p className="text-gray-700 mb-3">You have the right to:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Access your personal data</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Opt-out of marketing communications</li>
              <li>Object to processing of your data</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
            <p className="text-gray-700">
              If you have questions about this privacy policy or your personal
              data, please contact us at privacy@fashionboutique.com.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
