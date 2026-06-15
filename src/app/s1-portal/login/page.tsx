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

  const inp: React.CSSProperties = { width: '100%', background: '#f7f7f7', border: '1.5px solid #e8e8e8', borderRadius: 3, color: '#0a0a0a', fontFamily: "'Jost',sans-serif", fontSize: '0.875rem', padding: '11px 14px', outline: 'none' }

  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div style={{ background: '#fff', border: '1px solid #ebebeb', borderRadius: 8, padding: '2.5rem', width: '100%', maxWidth: 380, boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <svg width="36" height="36" viewBox="0 0 34 34" fill="none" style={{ margin: '0 auto 10px' }}><path d="M4 4 H24 Q30 4 30 10 V30 Q20 30 12 22 Q4 14 4 4Z" fill="#0a0a0a" /><path d="M2 22 Q2 32 12 32 L12 25 Q7 25 7 20Z" fill="#F7C83C" /></svg>
          <p style={{ fontWeight: 700, fontSize: '1.1rem', color: '#0a0a0a' }}>Samruthi One</p>
          <p style={{ fontSize: '0.65rem', color: '#aaa', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Admin Portal</p>
        </div>
        <form onSubmit={submit}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#555', marginBottom: 5 }}>Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required style={inp} />
          </div>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#555', marginBottom: 5 }}>Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required style={inp} />
          </div>
          {error && <p style={{ fontSize: '0.75rem', color: '#e53e3e', marginBottom: '1rem' }}>{error}</p>}
          <button type="submit" disabled={loading} className="btn-yellow" style={{ width: '100%', opacity: loading ? 0.7 : 1 }}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  )
}
