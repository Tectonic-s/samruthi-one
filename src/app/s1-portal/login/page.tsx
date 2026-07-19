'use client'
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function AdminLogin() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(''); setLoading(true)
    const res = await signIn('credentials', { email, password, redirect: false })
    setLoading(false)
    if (res?.ok) router.push('/s1-portal')
    else setError('Invalid email or password.')
  }

  const inp: React.CSSProperties = { width: '100%', boxSizing: 'border-box', background: '#fff', border: '1px solid rgba(10,10,10,.15)', borderRadius: 8, color: '#0A0A0A', fontSize: '0.875rem', padding: '11px 14px' }
  const label: React.CSSProperties = { display: 'block', fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(10,10,10,.42)', marginBottom: 6 }

  return (
    <div style={{ minHeight: '100vh', background: '#FAFAF8', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div style={{ background: '#fff', border: '1px solid rgba(10,10,10,.08)', borderRadius: 16, padding: '2.5rem', width: '100%', maxWidth: 380, boxShadow: '0 1px 2px rgba(10,10,10,.04), 0 4px 12px rgba(10,10,10,.04)' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logos/Logo.png" alt="Samruthi One" style={{ height: 28, width: 'auto', objectFit: 'contain', filter: 'brightness(0)', margin: '0 auto 12px', display: 'block' }} />
          <p style={{ fontSize: '0.65rem', color: 'rgba(10,10,10,.42)', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 600, margin: 0 }}>Admin Portal</p>
        </div>
        <form onSubmit={submit}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={label}>Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required style={inp} />
          </div>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={label}>Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required style={inp} />
          </div>
          {error && <p style={{ fontSize: '0.75rem', color: '#B91C1C', fontWeight: 500, marginBottom: '1rem' }}>{error}</p>}
          <button
            type="submit"
            disabled={loading}
            style={{ width: '100%', background: '#0A0A0A', color: '#fff', fontWeight: 600, fontSize: '0.875rem', padding: '14px 0', border: 'none', borderRadius: 999, cursor: loading ? 'default' : 'pointer', opacity: loading ? 0.7 : 1 }}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  )
}
