'use client'
import { useState, useEffect, useCallback } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import type { Lead } from '@/types'

const STATUS_COLORS: Record<string, { bg: string; color: string; border: string }> = {
  'New':         { bg: 'rgba(59,130,246,0.12)',  color: '#60a5fa', border: 'rgba(59,130,246,0.3)'  },
  'Contacted':   { bg: 'rgba(251,191,36,0.12)',  color: '#FFC800', border: 'rgba(251,191,36,0.3)'  },
  'In Progress': { bg: 'rgba(167,139,250,0.12)', color: '#a78bfa', border: 'rgba(167,139,250,0.3)' },
  'Closed':      { bg: 'rgba(52,211,153,0.12)',  color: '#34d399', border: 'rgba(52,211,153,0.3)'  },
}

const STATUSES = ['New', 'Contacted', 'In Progress', 'Closed']

function DeleteConfirm({ onConfirm, onCancel }: { onConfirm: (p: string) => void; onCancel: () => void }) {
  const [val, setVal] = useState('')
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div role="dialog" aria-modal="true" aria-labelledby="delete-title" style={{ background: '#111', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, padding: '2rem', width: 360 }}>
        <p id="delete-title" style={{ color: '#fff', fontWeight: 700, marginBottom: 8 }}>Confirm Delete</p>
        <p style={{ color: '#888', fontSize: '0.78rem', marginBottom: 16 }}>Enter the delete passphrase to permanently remove this lead.</p>
        <input
          type="password"
          value={val}
          onChange={e => setVal(e.target.value)}
          placeholder="Passphrase"
          autoFocus
          aria-label="Delete passphrase"
          style={{ width: '100%', background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 6, color: '#fff', padding: '8px 12px', fontSize: '0.85rem', outline: 'none', marginBottom: 16, boxSizing: 'border-box' }}
        />
        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
          <button onClick={onCancel} style={{ padding: '6px 16px', background: 'transparent', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 6, color: '#888', cursor: 'pointer', fontSize: '0.75rem' }}>Cancel</button>
          <button onClick={() => val && onConfirm(val)} disabled={!val} style={{ padding: '6px 16px', background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 6, color: '#f87171', cursor: val ? 'pointer' : 'not-allowed', fontSize: '0.75rem', fontWeight: 600 }}>Delete</button>
        </div>
      </div>
    </div>
  )
}

export default function AdminDashboard() {
  const { data: session, status: authStatus } = useSession()
  const router = useRouter()
  const [leads, setLeads] = useState<Lead[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({ total: 0, new: 0, inProgress: 0, closed: 0 })
  const [expandedId, setExpandedId] = useState<number | null>(null)
  const [notesMap, setNotesMap] = useState<Record<number, string>>({})
  const [deleteTarget, setDeleteTarget] = useState<number | null>(null)
  const [deleteError, setDeleteError] = useState('')

  const fetchLeads = useCallback(async () => {
    setLoading(true)
    const params = new URLSearchParams({ page: String(page) })
    if (search) params.set('search', search)
    if (filterStatus) params.set('status', filterStatus)
    const res = await fetch(`/api/admin/leads?${params}`)
    const data = await res.json()
    setLeads(data.leads ?? [])
    setTotal(data.total ?? 0)
    setTotalPages(data.totalPages ?? 1)
    setLoading(false)
  }, [page, search, filterStatus])

  const fetchStats = useCallback(async () => {
    const [all, newL, inp, cls] = await Promise.all([
      fetch('/api/admin/leads?page=1').then(r => r.json()),
      fetch('/api/admin/leads?page=1&status=New').then(r => r.json()),
      fetch('/api/admin/leads?page=1&status=In%20Progress').then(r => r.json()),
      fetch('/api/admin/leads?page=1&status=Closed').then(r => r.json()),
    ])
    setStats({ total: all.total ?? 0, new: newL.total ?? 0, inProgress: inp.total ?? 0, closed: cls.total ?? 0 })
  }, [])

  useEffect(() => {
    if (authStatus === 'unauthenticated') router.push('/s1-portal/login')
  }, [authStatus, router])

  useEffect(() => { fetchLeads() }, [fetchLeads])
  useEffect(() => { fetchStats() }, [fetchStats])

  const updateStatus = async (id: number, newStatus: string) => {
    await fetch('/api/admin/leads', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, status: newStatus }) })
    setLeads(prev => prev.map(l => l.id === id ? { ...l, status: newStatus } : l))
    fetchStats()
  }

  const saveNotes = async (id: number) => {
    await fetch('/api/admin/leads', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, notes: notesMap[id] ?? '' }) })
    setLeads(prev => prev.map(l => l.id === id ? { ...l, notes: notesMap[id] ?? '' } : l))
  }

  const exportLeads = async () => {
    const params = new URLSearchParams()
    if (filterStatus) params.set('status', filterStatus)
    const res = await fetch(`/api/admin/leads/export?${params}`)
    const blob = await res.blob()
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `samruthi-leads-${new Date().toISOString().split('T')[0]}.xlsx`
    document.body.appendChild(a); a.click(); document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const toggleExpand = (lead: Lead) => {
    setExpandedId(prev => prev === lead.id ? null : lead.id)
    if (!notesMap[lead.id]) setNotesMap(prev => ({ ...prev, [lead.id]: lead.notes ?? '' }))
  }

  const deleteLead = async (id: number, passphrase: string) => {
    const res = await fetch('/api/admin/leads', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, delete: true, passphrase }),
    })
    const data = await res.json()
    if (!res.ok) {
      setDeleteError(data.error ?? 'Failed to delete')
      return
    }
    setLeads(prev => prev.filter(l => l.id !== id))
    setExpandedId(null)
    setDeleteTarget(null)
    setDeleteError('')
    fetchStats()
  }

  const statCards = [
    { label: 'Total Leads', value: stats.total, accent: '#fff' },
    { label: 'New', value: stats.new, accent: '#60a5fa' },
    { label: 'In Progress', value: stats.inProgress, accent: '#a78bfa' },
    { label: 'Closed', value: stats.closed, accent: '#34d399' },
  ]

  const grouped = leads.reduce<Record<string, Lead[]>>((acc, lead) => {
    const key = new Date(lead.createdAt).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })
    if (!acc[key]) acc[key] = []
    acc[key].push(lead)
    return acc
  }, {})

  if (authStatus === 'loading' || authStatus === 'unauthenticated') {
    return (
      <div style={{ minHeight: '100vh', background: '#0a0a0a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ color: '#FFC800', fontSize: '0.8rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Loading...</div>
      </div>
    )
  }

  return (
    <>
      {deleteTarget !== null && (
        <DeleteConfirm
          onConfirm={(p) => deleteLead(deleteTarget, p)}
          onCancel={() => { setDeleteTarget(null); setDeleteError('') }}
        />
      )}

      <div style={{ minHeight: '100vh', background: '#0a0a0a', fontFamily: 'var(--font-inter, sans-serif)', color: '#fff' }}>

        {/* Header */}
        <header style={{ background: '#111', borderBottom: '1px solid rgba(255,255,255,0.06)', height: 58, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 28px', position: 'sticky', top: 0, zIndex: 50 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <svg width="26" height="26" viewBox="0 0 34 34" fill="none" aria-hidden="true"><path d="M4 4 H24 Q30 4 30 10 V30 Q20 30 12 22 Q4 14 4 4Z" fill="#fff" /><path d="M2 22 Q2 32 12 32 L12 25 Q7 25 7 20Z" fill="#FFC800" /></svg>
            <span style={{ color: '#fff', fontWeight: 700, fontSize: '0.95rem', letterSpacing: '-0.01em' }}>Samruthi One</span>
            <span style={{ background: 'rgba(255,200,0,0.12)', color: '#FFC800', fontSize: '0.58rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', padding: '3px 8px', borderRadius: 4, border: '1px solid rgba(255,200,0,0.2)' }}>Portal</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <span style={{ color: '#555', fontSize: '0.75rem' }}>{session?.user?.email}</span>
            <button
              aria-label="Sign out"
              onClick={() => signOut({ callbackUrl: '/s1-portal/login' })}
              style={{ color: '#888', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', background: 'none', border: '1px solid #222', padding: '5px 14px', borderRadius: 4, cursor: 'pointer' }}
            >
              Sign Out
            </button>
          </div>
        </header>

        <main style={{ padding: '2rem 28px', maxWidth: 1300, margin: '0 auto' }}>

          {/* Page title */}
          <div style={{ marginBottom: '1.5rem' }}>
            <p style={{ fontSize: '0.65rem', color: '#FFC800', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 4 }}>Dashboard</p>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#fff', letterSpacing: '-0.02em' }}>Enquiry Leads</h1>
          </div>

          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
            {statCards.map(s => (
              <div key={s.label} style={{ background: '#111', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12, padding: '1.25rem 1.5rem' }}>
                <p style={{ fontSize: '0.62rem', color: '#555', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 8 }}>{s.label}</p>
                <p style={{ fontSize: '2rem', fontWeight: 700, color: s.accent, lineHeight: 1 }}>{s.value}</p>
              </div>
            ))}
          </div>

          {/* Table card */}
          <div style={{ background: '#111', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16, overflow: 'hidden' }}>

            {/* Toolbar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 1.5rem', borderBottom: '1px solid rgba(255,255,255,0.06)', flexWrap: 'wrap', gap: 12 }}>
              <p style={{ fontSize: '0.75rem', color: '#555' }}>{total} leads</p>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
                <input
                  value={search}
                  onChange={e => { setSearch(e.target.value); setPage(1) }}
                  placeholder="Search name, phone, email, ref…"
                  aria-label="Search leads"
                  style={{ padding: '7px 12px', background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 6, fontSize: '0.78rem', outline: 'none', color: '#fff', minWidth: 220 }}
                />
                <select
                  value={filterStatus}
                  onChange={e => { setFilterStatus(e.target.value); setPage(1) }}
                  aria-label="Filter by status"
                  style={{ padding: '7px 12px', background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 6, fontSize: '0.78rem', outline: 'none', color: filterStatus ? '#FFC800' : '#888' }}
                >
                  <option value="">All Statuses</option>
                  {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
                <button
                  onClick={exportLeads}
                  aria-label="Export leads to Excel"
                  style={{ padding: '7px 16px', background: '#FFC800', color: '#0a0a0a', border: 'none', borderRadius: 6, fontSize: '0.72rem', fontWeight: 700, cursor: 'pointer', letterSpacing: '0.08em', textTransform: 'uppercase' }}
                >
                  ↓ Export
                </button>
              </div>
            </div>

            {/* Table */}
            {loading ? (
              <div style={{ padding: '4rem', textAlign: 'center', color: '#444', fontSize: '0.8rem' }}>Fetching leads…</div>
            ) : leads.length === 0 ? (
              <div style={{ padding: '4rem', textAlign: 'center', color: '#444', fontSize: '0.8rem' }}>No leads found.</div>
            ) : (
              <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {Object.entries(grouped).map(([month, monthLeads]) => (
                  <div key={month} style={{ border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12, overflow: 'hidden' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 16px', background: 'rgba(255,200,0,0.04)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                      <span style={{ fontSize: '0.68rem', fontWeight: 700, color: '#FFC800', letterSpacing: '0.12em', textTransform: 'uppercase' }}>{month}</span>
                      <span style={{ fontSize: '0.65rem', color: '#555' }}>{monthLeads.length} {monthLeads.length === 1 ? 'lead' : 'leads'}</span>
                    </div>
                    <div style={{ overflowX: 'auto' }}>
                      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.78rem' }}>
                        <thead>
                          <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                            {['Ref ID', 'Date', 'Name', 'Phone', 'Facility', 'Amount', 'Status', 'Actions'].map(h => (
                              <th key={h} style={{ padding: '8px 16px', textAlign: 'left', fontWeight: 600, fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#444', whiteSpace: 'nowrap' }}>{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {monthLeads.map((l) => {
                            const sc = STATUS_COLORS[l.status] ?? { bg: 'rgba(255,255,255,0.05)', color: '#888', border: 'rgba(255,255,255,0.1)' }
                            const isOpen = expandedId === l.id
                            return (
                              <>
                                <tr key={`row-${l.id}`} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', background: isOpen ? 'rgba(255,200,0,0.03)' : 'transparent' }}>
                                  <td style={{ padding: '12px 16px', fontWeight: 600, color: '#FFC800', whiteSpace: 'nowrap', fontFamily: 'monospace', fontSize: '0.72rem' }}>{l.referenceId}</td>
                                  <td style={{ padding: '12px 16px', color: '#555', whiteSpace: 'nowrap' }}>{new Date(l.createdAt).toLocaleDateString('en-IN')}</td>
                                  <td style={{ padding: '12px 16px', fontWeight: 500, color: '#ddd' }}>{l.name}</td>
                                  <td style={{ padding: '12px 16px', color: '#888', whiteSpace: 'nowrap' }}>{l.phone}</td>
                                  <td style={{ padding: '12px 16px', color: '#aaa' }}>{l.facility}</td>
                                  <td style={{ padding: '12px 16px', color: '#aaa', whiteSpace: 'nowrap' }}>{l.loanAmount}</td>
                                  <td style={{ padding: '12px 16px' }}>
                                    <span style={{ background: sc.bg, color: sc.color, border: `1px solid ${sc.border}`, padding: '3px 10px', borderRadius: 9999, fontSize: '0.65rem', fontWeight: 600, whiteSpace: 'nowrap' }}>{l.status}</span>
                                  </td>
                                  <td style={{ padding: '12px 16px' }}>
                                    <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                                      <select
                                        value={l.status}
                                        onChange={e => updateStatus(l.id, e.target.value)}
                                        aria-label={`Change status for ${l.referenceId}`}
                                        style={{ fontSize: '0.7rem', padding: '4px 8px', background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 4, cursor: 'pointer', outline: 'none', color: '#aaa' }}
                                      >
                                        {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                                      </select>
                                      <button
                                        onClick={() => toggleExpand(l)}
                                        aria-expanded={isOpen}
                                        aria-label={isOpen ? 'Collapse lead details' : 'Expand lead details'}
                                        style={{ fontSize: '0.65rem', padding: '4px 10px', background: isOpen ? 'rgba(255,200,0,0.12)' : 'rgba(255,255,255,0.05)', border: `1px solid ${isOpen ? 'rgba(255,200,0,0.3)' : 'rgba(255,255,255,0.08)'}`, borderRadius: 4, cursor: 'pointer', color: isOpen ? '#FFC800' : '#888', whiteSpace: 'nowrap' }}
                                      >
                                        {isOpen ? '▲ Close' : '▼ Details'}
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                                {isOpen && (
                                  <tr key={`expanded-${l.id}`} style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,200,0,0.02)' }}>
                                    <td colSpan={8} style={{ padding: '0 16px 16px' }}>
                                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', paddingTop: 16 }}>
                                        <div style={{ background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 8, padding: '1rem' }}>
                                          <p style={{ fontSize: '0.6rem', color: '#555', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 10 }}>Lead Details</p>
                                          {[
                                            ['Email', l.email],
                                            ['Business Type', l.businessType],
                                            ['Turnover', l.turnover],
                                            ['Submitted', new Date(l.createdAt).toLocaleString('en-IN')],
                                          ].map(([k, v]) => (
                                            <div key={k} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                                              <span style={{ color: '#555', fontSize: '0.72rem' }}>{k}</span>
                                              <span style={{ color: '#ccc', fontSize: '0.72rem', fontWeight: 500, textAlign: 'right', maxWidth: '60%' }}>{v}</span>
                                            </div>
                                          ))}
                                        </div>
                                        <div style={{ background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 8, padding: '1rem' }}>
                                          <p style={{ fontSize: '0.6rem', color: '#555', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 10 }}>Client Message</p>
                                          <p style={{ color: '#888', fontSize: '0.75rem', lineHeight: 1.6 }}>{l.message || '—'}</p>
                                        </div>
                                        <div style={{ background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 8, padding: '1rem', display: 'flex', flexDirection: 'column', gap: 8 }}>
                                          <p style={{ fontSize: '0.6rem', color: '#555', textTransform: 'uppercase', letterSpacing: '0.12em' }}>Internal Notes</p>
                                          <textarea
                                            value={notesMap[l.id] ?? l.notes ?? ''}
                                            onChange={e => setNotesMap(prev => ({ ...prev, [l.id]: e.target.value }))}
                                            rows={4}
                                            placeholder="Add notes about this lead…"
                                            aria-label="Internal notes"
                                            style={{ background: '#111', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 6, color: '#ccc', fontSize: '0.75rem', padding: '8px 10px', outline: 'none', resize: 'none', lineHeight: 1.5, flex: 1 }}
                                          />
                                          <button
                                            onClick={() => saveNotes(l.id)}
                                            style={{ padding: '6px 14px', background: '#FFC800', color: '#0a0a0a', border: 'none', borderRadius: 6, fontSize: '0.7rem', fontWeight: 700, cursor: 'pointer', letterSpacing: '0.08em', textTransform: 'uppercase', alignSelf: 'flex-end' }}
                                          >
                                            Save Notes
                                          </button>
                                        </div>
                                      </div>
                                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', paddingTop: 12, gap: 6 }}>
                                        {deleteError && deleteTarget === l.id && (
                                          <p style={{ color: '#f87171', fontSize: '0.72rem' }}>{deleteError}</p>
                                        )}
                                        <button
                                          onClick={() => { setDeleteTarget(l.id); setDeleteError('') }}
                                          aria-label="Delete lead"
                                          style={{ padding: '5px 14px', background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 6, fontSize: '0.65rem', fontWeight: 600, color: '#f87171', cursor: 'pointer', letterSpacing: '0.08em', textTransform: 'uppercase' }}
                                        >
                                          🗑 Delete Lead
                                        </button>
                                      </div>
                                    </td>
                                  </tr>
                                )}
                              </>
                            )
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 1.5rem', borderTop: '1px solid rgba(255,255,255,0.06)', fontSize: '0.75rem', color: '#555' }}>
                <span>Page {page} of {totalPages}</span>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} aria-label="Previous page" style={{ padding: '5px 14px', background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 6, color: page === 1 ? '#333' : '#888', cursor: page === 1 ? 'not-allowed' : 'pointer' }}>← Prev</button>
                  <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} aria-label="Next page" style={{ padding: '5px 14px', background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 6, color: page === totalPages ? '#333' : '#888', cursor: page === totalPages ? 'not-allowed' : 'pointer' }}>Next →</button>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  )
}
