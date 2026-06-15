import type { Metadata } from 'next'
import { SITE_CONFIG } from '@/lib/data/content'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Terms & Conditions — Samruthi One',
  description: 'Terms and Conditions governing use of Samruthi One services and website.',
}

const sections = [
  {
    title: '1. Acceptance of Terms',
    content: `By accessing or using the Samruthi One website and services, you agree to be bound by these Terms and Conditions. If you do not agree to any part of these terms, please do not use our services. These terms apply to all visitors, users, and clients of Samruthi One.`,
  },
  {
    title: '2. Nature of Services',
    content: `Samruthi One is an RBI-registered Fintech advisory firm that acts as a facilitator and consultant connecting clients with banking institutions and NBFCs. We do not directly lend money, accept deposits, or act as a bank. All credit decisions are made independently by the respective lender partners. Our role is to provide advisory, documentation assistance, and liaison services.`,
  },
  {
    title: '3. Eligibility',
    content: `Our services are available to individuals and entities who are 18 years of age or older, residents or registered entities in India, and who have a genuine credit requirement for legitimate business or personal purposes. We reserve the right to decline service to any enquiry without providing a reason.`,
  },
  {
    title: '4. Enquiry & Application Process',
    content: `Submitting an enquiry through our platform does not constitute a guarantee of loan approval or any commitment from us or any lender. Enquiries are evaluated on a best-effort basis. Credit approval is entirely at the discretion of the respective lender based on their internal credit policies, which may change from time to time.`,
  },
  {
    title: '5. Fees & Charges',
    content: `Samruthi One operates on a success-fee model. Fees are charged only upon successful disbursement of the credit facility. The applicable fee structure will be disclosed in writing prior to engagement. No upfront fees are charged for submitting an enquiry. Any processing fees, documentation charges, or other costs levied by lenders are separate and governed by the respective lender's schedule of charges.`,
  },
  {
    title: '6. Accuracy of Information',
    content: `You are responsible for providing accurate, complete, and up-to-date information in your enquiry and during the application process. Providing false or misleading information may result in immediate termination of services and may constitute a criminal offence under applicable Indian law, including the Indian Penal Code and the Prevention of Money Laundering Act.`,
  },
  {
    title: '7. Confidentiality',
    content: `All financial and personal information shared with Samruthi One is treated as confidential and is not disclosed to any third party except as necessary to facilitate your credit application (i.e., sharing with lender partners) or as required by law. Both parties agree to maintain confidentiality of any commercially sensitive information shared during the engagement.`,
  },
  {
    title: '8. Intellectual Property',
    content: `All content on this website, including text, logos, graphics, and software, is the exclusive property of Samruthi One and is protected by applicable copyright and intellectual property laws. You may not reproduce, distribute, or use any content without prior written consent.`,
  },
  {
    title: '9. Limitation of Liability',
    content: `Samruthi One shall not be liable for any direct, indirect, incidental, or consequential losses arising from: (a) loan rejections by lender partners; (b) delays in processing by lenders; (c) changes in interest rates or product terms; (d) reliance on information provided on this website. Our liability, if any, shall be limited to the fees paid to us in connection with the specific engagement.`,
  },
  {
    title: '10. Regulatory Compliance',
    content: `Samruthi One operates in compliance with applicable Indian laws and RBI guidelines. All engagements are subject to KYC/AML requirements under the Prevention of Money Laundering Act, 2002. We reserve the right to report suspicious transactions to appropriate authorities as required by law.`,
  },
  {
    title: '11. Governing Law & Dispute Resolution',
    content: `These terms are governed by the laws of India. Any disputes arising from these terms or your use of our services shall be subject to the exclusive jurisdiction of the courts in Chennai, Tamil Nadu. Parties agree to first attempt resolution through mutual negotiation before initiating any legal proceedings.`,
  },
  {
    title: '12. Amendments',
    content: `We reserve the right to modify these Terms and Conditions at any time. Updated terms will be posted on this page with a revised date. Your continued use of our services after any modification constitutes your acceptance of the revised terms. We recommend reviewing this page periodically.`,
  },
  {
    title: '13. Contact',
    content: `For any questions regarding these Terms and Conditions, please contact us at: ${SITE_CONFIG.company.email} or write to us at our registered office: ${SITE_CONFIG.company.address.area1}, ${SITE_CONFIG.company.address.city1} – ${SITE_CONFIG.company.address.pincode1}.`,
  },
]

export default function TermsPage() {
  return (
    <div className="py-12 lg:py-20 relative z-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="bg-gray-950/30 backdrop-blur-xl p-8 sm:p-12 rounded-[2rem] border border-white/15 shadow-2xl mb-8">
          <p className="text-xs font-semibold tracking-widest uppercase text-[#F7C83C] mb-3">Legal</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">Terms &amp; Conditions</h1>
          <p className="text-gray-400 text-sm leading-relaxed">
            Last updated: January 2025 &nbsp;·&nbsp; CIN: {SITE_CONFIG.company.cin}
          </p>
          <p className="text-gray-300 text-sm leading-relaxed mt-4 max-w-2xl">
            Please read these Terms and Conditions carefully before using Samruthi One&apos;s services or website. By submitting an enquiry or engaging our services, you agree to be legally bound by these terms.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-4">
          {sections.map((section) => (
            <div
              key={section.title}
              className="bg-gray-950/30 backdrop-blur-xl p-6 sm:p-8 rounded-[2rem] border border-white/15 shadow-lg"
            >
              <h2 className="text-base font-bold text-white mb-3 tracking-tight">{section.title}</h2>
              <p className="text-sm text-gray-300 leading-relaxed">{section.content}</p>
            </div>
          ))}
        </div>

        {/* Back link */}
        <div className="mt-10 text-center">
          <Link href="/privacy" className="text-[#F7C83C] text-sm font-semibold hover:underline">
            &larr; Privacy Policy
          </Link>
          <span className="text-gray-600 mx-4">·</span>
          <Link href="/" className="text-[#F7C83C] text-sm font-semibold hover:underline">
            Back to Home &rarr;
          </Link>
        </div>

      </div>
    </div>
  )
}
