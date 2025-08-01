import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy - TutorHub',
  description: 'Privacy Policy for TutorHub online tutoring platform',
}

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Privacy Policy for TutorHub</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-sm text-gray-600 mb-6">
              <strong>Effective Date:</strong> July 31, 2025<br />
              <strong>Last Updated:</strong> July 31, 2025
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Introduction</h2>
              <p className="text-gray-700 leading-relaxed">
                TutorHub (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our online tutoring platform and services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Information We Collect</h2>
              
              <h3 className="text-xl font-medium text-gray-800 mb-3">Personal Information</h3>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li><strong>Account Information:</strong> Name, email address, profile picture</li>
                <li><strong>Educational Information:</strong> Subject preferences, learning goals, academic level</li>
                <li><strong>Communication Data:</strong> Messages, lesson notes, feedback</li>
                <li><strong>Payment Information:</strong> Billing details (processed securely through third-party processors)</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-800 mb-3">Google Services Integration</h3>
              <p className="text-gray-700 mb-2">When you use our Google Meet integration for video lessons, we may access:</p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li><strong>Google Calendar:</strong> To create and manage lesson appointments</li>
                <li><strong>Google Meet:</strong> To generate video conference links</li>
                <li><strong>Basic Profile Information:</strong> Name and email address from your Google account</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">How We Use Your Information</h2>
              <p className="text-gray-700 mb-4">We use collected information to:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li><strong>Provide Services:</strong> Facilitate tutoring sessions and platform functionality</li>
                <li><strong>Schedule Lessons:</strong> Create calendar events and video meeting links</li>
                <li><strong>Communication:</strong> Enable messaging between tutors and students</li>
                <li><strong>Account Management:</strong> Maintain your profile and preferences</li>
                <li><strong>Payment Processing:</strong> Handle billing and transactions securely</li>
                <li><strong>Platform Improvement:</strong> Analyze usage to enhance our services</li>
                <li><strong>Support:</strong> Respond to inquiries and provide customer assistance</li>
                <li><strong>Legal Compliance:</strong> Meet regulatory requirements and prevent fraud</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Google Data Usage</h2>
              
              <h3 className="text-xl font-medium text-gray-800 mb-3">Scope of Access</h3>
              <p className="text-gray-700 mb-2">We request minimal permissions for Google services:</p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li><strong>Calendar Access:</strong> Only to create and manage lesson appointments</li>
                <li><strong>Meet Integration:</strong> Only to generate meeting links for scheduled lessons</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-800 mb-3">Data Handling</h3>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>We <strong>DO NOT</strong> access your personal calendar events unrelated to TutorHub</li>
                <li>We <strong>DO NOT</strong> store your Google account credentials</li>
                <li>Meeting data is only used for lesson management purposes</li>
                <li>We comply with Google API Services User Data Policy</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Data Security</h2>
              <p className="text-gray-700 mb-4">We implement appropriate security measures including:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li><strong>Encryption:</strong> Data encrypted in transit and at rest</li>
                <li><strong>Access Controls:</strong> Limited access to personal information</li>
                <li><strong>Regular Audits:</strong> Security assessments and updates</li>
                <li><strong>Secure Infrastructure:</strong> Industry-standard hosting and protection</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Rights and Choices</h2>
              
              <h3 className="text-xl font-medium text-gray-800 mb-3">Account Control</h3>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li><strong>Access:</strong> View your personal information</li>
                <li><strong>Update:</strong> Modify your profile and preferences</li>
                <li><strong>Delete:</strong> Request account deletion and data removal</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-800 mb-3">Google Integration</h3>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li><strong>Revoke Access:</strong> Disconnect Google services at any time</li>
                <li><strong>Limited Permissions:</strong> We only request necessary calendar access</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact Information</h2>
              <p className="text-gray-700 mb-4">For privacy-related questions or requests:</p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700"><strong>Email:</strong> privacy@tutorhub.com</p>
                <p className="text-gray-700"><strong>Website:</strong> https://YOUR_SITE_NAME.netlify.app/contact</p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Updates to This Policy</h2>
              <p className="text-gray-700">
                We may update this Privacy Policy to reflect changes in our practices, legal requirements, or platform improvements. 
                We will notify you of significant changes through email notification, platform announcements, or an updated &quot;Last Modified&quot; date.
              </p>
            </section>

            <div className="border-t pt-6 mt-8">
              <p className="text-sm text-gray-500">
                <strong>Last Updated:</strong> July 31, 2025<br />
                <strong>Version:</strong> 1.0
              </p>
              <p className="text-sm text-gray-500 mt-2">
                This Privacy Policy is effective as of the date listed above. Your continued use of TutorHub constitutes acceptance of these terms.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
