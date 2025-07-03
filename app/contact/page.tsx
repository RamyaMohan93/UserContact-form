import ContactForm from "@/components/contact-form"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Get in Touch</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Have a question or want to work together? We'd love to hear from you. Send us a message and we'll respond as
            soon as possible.
          </p>
        </div>

        <ContactForm />

        <div className="mt-12 text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Email</h3>
              <p className="text-gray-600">contact@example.com</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Phone</h3>
              <p className="text-gray-600">+1 (555) 123-4567</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Office</h3>
              <p className="text-gray-600">
                123 Business St, Suite 100
                <br />
                City, State 12345
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
