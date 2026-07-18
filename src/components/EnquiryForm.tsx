'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const businessTypes = ['Proprietorship', 'Partnership', 'Private Limited', 'LLP', 'Salaried', 'Self-Employed']
const facilities = [
  'Loan Against Property',
  'Home Loan',
  'Personal Loan',
  'Balance Transfer',
  'Business Loans',
  'Auto Loans',
  'Machinery Loans',
  'Commercial Vehicle Loan',
  'Bank Overdraft',
  'Dropline Overdraft',
  'Letter of Credit',
  'Not Sure — Need Advisory'
]
const ranges = ['<₹25L', '₹25L–1Cr', '₹1–5Cr', '₹5–25Cr', '>₹25Cr']

export default function EnquiryForm({ defaultFacility = '' }: { defaultFacility?: string }) {
  const router = useRouter()
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    businessType: '',
    facility: defaultFacility,
    loanAmount: '',
    turnover: '',
    message: '',
    consent: false
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)

  const set = (k: string, v: string | boolean) => setForm((p) => ({ ...p, [k]: v }))

  const validate = () => {
    const e: Record<string, string> = {}
    if (!form.name.trim()) e.name = 'Required'
    if (!/^[6-9]\d{9}$/.test(form.phone.replace(/\s/g, ''))) e.phone = 'Enter valid 10-digit number'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter valid email'
    if (!form.businessType) e.businessType = 'Required'
    if (!form.facility) e.facility = 'Required'
    if (!form.consent) e.consent = 'Please agree to proceed'
    return e
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) {
      setErrors(errs)
      return
    }
    setErrors({})
    setLoading(true)
    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      const data = await res.json()
      if (data.success) {
        router.push(`/thank-you?ref=${data.referenceId}`)
      } else {
        setErrors({ submit: data.error ?? 'Something went wrong' })
      }
    } catch {
      setErrors({ submit: 'Network error. Please try again.' })
    } finally {
      setLoading(false)
    }
  }

  const inputClass = "w-full bg-white border border-line text-ink rounded-xl focus:border-ink focus:ring-1 focus:ring-ink px-4 py-3 text-sm transition-all outline-none placeholder:text-ink-faint appearance-none"
  const labelClass = "block text-[0.68rem] font-semibold tracking-widest uppercase text-ink-faint mb-2"
  const errClass = "text-red-600 text-xs mt-1.5 font-medium"

  return (
    <form onSubmit={submit} noValidate className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className={labelClass}>Full Name *</label>
          <input
            id="name"
            className={inputClass}
            value={form.name}
            onChange={(e) => set('name', e.target.value)}
            placeholder="Your full name"
          />
          {errors.name && <p className={errClass}>{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="phone" className={labelClass}>Mobile Number *</label>
          <input
            id="phone"
            className={inputClass}
            value={form.phone}
            onChange={(e) => set('phone', e.target.value)}
            placeholder="10-digit number"
          />
          {errors.phone && <p className={errClass}>{errors.phone}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="email" className={labelClass}>Email Address *</label>
          <input
            id="email"
            type="email"
            className={inputClass}
            value={form.email}
            onChange={(e) => set('email', e.target.value)}
            placeholder="your@email.com"
          />
          {errors.email && <p className={errClass}>{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="businessType" className={labelClass}>Business Type *</label>
          <div className="relative">
            <select
              id="businessType"
              className={`${inputClass} cursor-pointer`}
              value={form.businessType}
              onChange={(e) => set('businessType', e.target.value)}
            >
              <option value="">Select</option>
              {businessTypes.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-ink-faint">
              ▼
            </div>
          </div>
          {errors.businessType && <p className={errClass}>{errors.businessType}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="facility" className={labelClass}>Facility Required *</label>
          <div className="relative">
            <select
              id="facility"
              className={`${inputClass} cursor-pointer`}
              value={form.facility}
              onChange={(e) => set('facility', e.target.value)}
            >
              <option value="">Select</option>
              {facilities.map((f) => (
                <option key={f} value={f}>{f}</option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-ink-faint">
              ▼
            </div>
          </div>
          {errors.facility && <p className={errClass}>{errors.facility}</p>}
        </div>
        <div>
          <label htmlFor="loanAmount" className={labelClass}>Loan Amount</label>
          <div className="relative">
            <select
              id="loanAmount"
              className={`${inputClass} cursor-pointer`}
              value={form.loanAmount}
              onChange={(e) => set('loanAmount', e.target.value)}
            >
              <option value="">Select range</option>
              {ranges.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-ink-faint">
              ▼
            </div>
          </div>
        </div>
      </div>

      <div>
        <label htmlFor="turnover" className={labelClass}>Annual Turnover</label>
        <div className="relative">
          <select
            id="turnover"
            className={`${inputClass} cursor-pointer`}
            value={form.turnover}
            onChange={(e) => set('turnover', e.target.value)}
          >
            <option value="">Select range</option>
            {ranges.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-ink-faint">
            ▼
          </div>
        </div>
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>Brief Description</label>
        <textarea
          id="message"
          className={`${inputClass} min-h-[100px] resize-y`}
          value={form.message}
          onChange={(e) => set('message', e.target.value)}
          placeholder="Tell us about your business and requirement..."
        />
      </div>

      <div>
        <label className="flex items-start gap-3 cursor-pointer group">
          <input
            type="checkbox"
            checked={form.consent}
            onChange={(e) => set('consent', e.target.checked)}
            className="mt-1.5 accent-[#F7C83C] h-4 w-4 rounded border-line bg-white text-[#F7C83C] focus:ring-0 focus:ring-offset-0"
          />
          <span className="text-xs text-ink-soft leading-relaxed group-hover:text-ink transition-colors">
            I agree to the <a href="/privacy" target="_blank" rel="noopener noreferrer" className="text-ink font-semibold underline decoration-gold decoration-2 underline-offset-2 hover:decoration-gold-hover">Privacy Policy</a> and{' '}
            <a href="/terms" target="_blank" rel="noopener noreferrer" className="text-ink font-semibold underline decoration-gold decoration-2 underline-offset-2 hover:decoration-gold-hover">Terms</a> and consent to being contacted by Samruthi One.
          </span>
        </label>
        {errors.consent && <p className={errClass}>{errors.consent}</p>}
      </div>

      {errors.submit && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl text-sm font-medium">
          {errors.submit}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-ink text-white font-semibold py-4 rounded-full hover:bg-black hover:shadow-pill transition-all duration-200 text-[14px] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Submitting...' : 'Submit Enquiry'}
      </button>
    </form>
  )
}
