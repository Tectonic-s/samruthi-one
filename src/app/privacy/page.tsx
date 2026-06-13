import type { Metadata } from 'next'
import { SITE_CONFIG } from '@/lib/data/content'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy — Samruthi One',
  description: 'Privacy Policy for Samruthi One — how we collect, use, and protect your personal information.',
}

const sections = [
  {
    title: '1. Information We Collect',
    content: `When you submit an enquiry through our platform, we collect personal information including but not limited to: your full name, mobile number, email address, business type, nature of credit facility required, loan amount range, and annual turnover. We may also collect technical information such as your IP address, browser type, and device identifiers through standard server logs.`,
  },
  {
    title: '2. How We Use Your Information',
    content: `The information you provide is used solely to: (a) evaluate your credit requirement and match it with appropriate lender partners; (b) contact you via phone, email, or WhatsApp regarding your enquiry; (c) send you updates related to your application; and (d) improve our service offerings. We do not use your data for unsolicited marketing without your explicit consent.`,
  },
  {
    title: '3. Sharing With Lender Partners',
    content: `To facilitate your credit application, we may share your information with banking institutions and Non-Banking Financial Companies (NBFCs) in our lender network. All lender partners are regulated entities operating under the Reserve Bank of India (RBI). Your information is shared strictly for the purpose of credit evaluation and is governed by each lender's own privacy policy.`,
  },
  {
    title: '4. Data Security',
    content: `We implement industry-standard technical and organizational measures to protect your personal data from unauthorized access, disclosure, alteration, or destruction. Data is transmitted over encrypted connections (HTTPS/TLS). Our systems are hosted on secure, certified cloud infrastructure with access controls and audit trails.`,
  },
  {
    title: '5. Data Retention',
    content: `Your personal information is retained for a period of 3 years from the date of your last interaction with us, or as required by applicable Indian laws and regulations including the Prevention of Money Laundering Act (PMLA) and guidelines issued by the Reserve Bank of India. After this period, data is securely deleted.`,
  },
  {
    title: '6. Your Rights',
    content: `You have the right to: (a) access the personal data we hold about you; (b) request correction of inaccurate data; (c) request deletion of your data subject to regulatory retention requirements; (d) withdraw consent for marketing communications at any time. To exercise these rights, contact us at ${SITE_CONFIG.company.email}.`,
  },
  {
    title: '7. Cookies',
    content: `Our website uses essential cookies required for the site to function correctly. We do not use tracking cookies or third-party advertising cookies. You may disable cookies in your browser settings; however, this may affect certain functionalities of the site.`,
  },
  {
    title: '8. Third-Party Links',
    content: `Our website may contain links to third-party lender websites. We are not responsible for the privacy practices of those websites. We encourage you to review the privacy policies of any external sites you visit.`,
  },
  {
    title: '9. Changes to This Policy',
    content: `We reserve the right to update this Privacy Policy at any time. Material changes will be notified via email or a prominent notice on our website. Your continued use of our services after any changes constitutes acceptance of the updated policy.`,
  },
  {
    title: '10. Contact Us',
    content: `For any questions, concerns, or requests related to this Privacy Policy, please contact our Data Protection Officer at: ${SITE_CONFIG.company.email} or call us at ${SITE_CONFIG.company.phone} during business hours (${SITE_CONFIG.company.hours}).`,
  },
]

export default function PrivacyPolicyPage() {
  return (
    <div className="py-12 lg:py-20 relative z-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="bg-gray-950/80 backdrop-blur-xl p-8 sm:p-12 rounded-[2rem] border border-white/10 shadow-2xl mb-8">
          <p className="text-xs font-semibold tracking-widest uppercase text-[#FFC800] mb-3">Legal</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">Privacy Policy</h1>
          <p className="text-gray-400 text-sm leading-relaxed">
            Last updated: January 2025 &nbsp;·&nbsp; CIN: {SITE_CONFIG.company.cin}
          </p>
          <p className="text-gray-300 text-sm leading-relaxed mt-4 max-w-2xl">
            Samruthi One (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;) is committed to protecting your privacy. This policy explains how we collect, use, and safeguard your personal information when you use our services or visit our website.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-4">
          {sections.map((section) => (
            <div
              key={section.title}
              className="bg-gray-950/80 backdrop-blur-xl p-6 sm:p-8 rounded-[2rem] border border-white/10 shadow-lg"
            >
              <h2 className="text-base font-bold text-white mb-3 tracking-tight">{section.title}</h2>
              <p className="text-sm text-gray-300 leading-relaxed">{section.content}</p>
            </div>
          ))}
        </div>

        {/* Back link */}
        <div className="mt-10 text-center">
          <Link href="/" className="text-[#FFC800] text-sm font-semibold hover:underline">
            &larr; Back to Home
          </Link>
          <span className="text-gray-600 mx-4">·</span>
          <Link href="/terms" className="text-[#FFC800] text-sm font-semibold hover:underline">
            Terms &amp; Conditions &rarr;
          </Link>
        </div>

      </div>
    </div>
  )
}
