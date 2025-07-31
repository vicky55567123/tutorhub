import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service - TutorHub',
  description: 'Terms of Service for TutorHub online tutoring platform',
}

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Terms of Service</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-sm text-gray-600 mb-6">
              <strong>Effective Date:</strong> July 31, 2025<br />
              <strong>Last Updated:</strong> July 31, 2025
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Agreement to Terms</h2>
              <p className="text-gray-700 leading-relaxed">
                By accessing and using TutorHub (&quot;the Platform&quot;), you agree to be bound by these Terms of Service (&quot;Terms&quot;). 
                If you do not agree to these Terms, please do not use our services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Description of Service</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                TutorHub is an online platform that connects students with qualified tutors for educational purposes. 
                Our services include but are not limited to:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Tutor and student matching services</li>
                <li>HD video lessons via Google Meet integration</li>
                <li>Scheduling and calendar management</li>
                <li>Communication tools and messaging</li>
                <li>Payment processing for tutoring services</li>
                <li>Educational resources and materials</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">User Accounts</h2>
              <h3 className="text-xl font-medium text-gray-800 mb-3">Account Creation</h3>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>You must provide accurate and complete information</li>
                <li>You are responsible for maintaining account security</li>
                <li>You must be at least 13 years old (with parental consent for minors)</li>
                <li>One person may maintain only one account</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-800 mb-3">Account Responsibilities</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Keep your login credentials secure and confidential</li>
                <li>Notify us immediately of any unauthorized access</li>
                <li>You are responsible for all activities under your account</li>
                <li>Provide current and accurate contact information</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Acceptable Use</h2>
              <p className="text-gray-700 mb-4">You agree to use TutorHub only for lawful educational purposes. You may not:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Violate any applicable laws or regulations</li>
                <li>Harass, abuse, or harm other users</li>
                <li>Share inappropriate or offensive content</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Use automated tools to access our services</li>
                <li>Impersonate others or provide false information</li>
                <li>Engage in any form of academic dishonesty</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Google Services Integration</h2>
              <p className="text-gray-700 mb-4">
                Our platform integrates with Google services to provide enhanced functionality:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>Google Meet for HD video lessons</li>
                <li>Google Calendar for scheduling management</li>
                <li>Google OAuth for secure authentication</li>
              </ul>
              <p className="text-gray-700">
                By using these features, you also agree to Google&apos;s Terms of Service and Privacy Policy. 
                We only access the minimum necessary permissions to provide our tutoring services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Payment Terms</h2>
              <h3 className="text-xl font-medium text-gray-800 mb-3">For Students</h3>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>Payment is due before or at the time of service</li>
                <li>Rates are set by individual tutors</li>
                <li>Refunds are subject to our refund policy</li>
                <li>You are responsible for any applicable taxes</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-800 mb-3">For Tutors</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>You set your own rates and availability</li>
                <li>Platform fees may apply to transactions</li>
                <li>Payments are processed according to our payment schedule</li>
                <li>You are responsible for reporting income for tax purposes</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Intellectual Property</h2>
              <p className="text-gray-700 mb-4">
                The TutorHub platform, including its design, functionality, and content, is protected by copyright, 
                trademark, and other intellectual property laws.
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Users retain rights to their original content</li>
                <li>You grant us license to use content as necessary to provide services</li>
                <li>Respect the intellectual property rights of others</li>
                <li>Report any copyright infringement to us immediately</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Privacy and Data Protection</h2>
              <p className="text-gray-700">
                Your privacy is important to us. Please review our Privacy Policy, which explains how we collect, 
                use, and protect your information. By using TutorHub, you consent to our data practices as described 
                in our Privacy Policy.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Disclaimers and Limitations</h2>
              <h3 className="text-xl font-medium text-gray-800 mb-3">Service Availability</h3>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>Services are provided &quot;as is&quot; without warranties</li>
                <li>We do not guarantee uninterrupted access</li>
                <li>Technical issues may occasionally affect service quality</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-800 mb-3">Educational Outcomes</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>We facilitate connections but do not guarantee learning outcomes</li>
                <li>Tutor qualifications are self-reported</li>
                <li>Students and tutors are responsible for their own interactions</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Termination</h2>
              <p className="text-gray-700 mb-4">
                Either party may terminate their account at any time. We reserve the right to suspend or 
                terminate accounts that violate these Terms.
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>You may delete your account through your profile settings</li>
                <li>We may terminate accounts for Terms violations</li>
                <li>Certain provisions survive account termination</li>
                <li>Data retention follows our Privacy Policy</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact Information</h2>
              <p className="text-gray-700 mb-4">For questions about these Terms:</p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700"><strong>Email:</strong> legal@tutorhub.com</p>
                <p className="text-gray-700"><strong>Website:</strong> https://yourtutor.netlify.app/contact</p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Changes to Terms</h2>
              <p className="text-gray-700">
                We may update these Terms from time to time. Significant changes will be communicated through 
                email or platform notifications. Continued use of TutorHub after changes constitutes acceptance 
                of the updated Terms.
              </p>
            </section>

            <div className="border-t pt-6 mt-8">
              <p className="text-sm text-gray-500">
                <strong>Last Updated:</strong> July 31, 2025<br />
                <strong>Version:</strong> 1.0
              </p>
              <p className="text-sm text-gray-500 mt-2">
                These Terms of Service are effective as of the date listed above.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
