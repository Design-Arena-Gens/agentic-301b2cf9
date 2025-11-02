export default function ContactPage() {
  return (
    <div className="section-padding">
      <div className="container-custom max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">Contact Us</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
            <p className="text-gray-700 mb-6">
              Have questions? We'd love to hear from you. Send us a message and
              we'll respond as soon as possible.
            </p>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-1">Email</h3>
                <p className="text-gray-600">support@fashionboutique.com</p>
              </div>

              <div>
                <h3 className="font-semibold mb-1">Phone</h3>
                <p className="text-gray-600">+1 (555) 123-4567</p>
              </div>

              <div>
                <h3 className="font-semibold mb-1">Address</h3>
                <p className="text-gray-600">
                  123 Fashion Street
                  <br />
                  New York, NY 10001
                  <br />
                  United States
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-1">Business Hours</h3>
                <p className="text-gray-600">
                  Monday - Friday: 9:00 AM - 6:00 PM EST
                  <br />
                  Saturday: 10:00 AM - 4:00 PM EST
                  <br />
                  Sunday: Closed
                </p>
              </div>
            </div>
          </div>

          <div>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <input type="text" className="input-field" required />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input type="email" className="input-field" required />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Subject</label>
                <input type="text" className="input-field" required />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <textarea
                  className="input-field resize-none"
                  rows={6}
                  required
                ></textarea>
              </div>

              <button type="submit" className="btn-primary w-full">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
