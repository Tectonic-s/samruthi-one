'use client'
import { useState, useEffect, useCallback } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import type { Lead } from '@/types'

const HAIR = '1px solid rgba(10,10,10,.08)'
const HAIR_SOFT = '1px solid rgba(10,10,10,.06)'
const HEAD = 'Plus Jakarta Sans, sans-serif'

const STATUS_COLORS: Record<string, { bg: string; color: string }> = {
  'New':         { bg: 'rgba(59,130,246,.10)',  color: '#1d4ed8' },
  'Contacted':   { bg: 'rgba(247,200,60,.25)',  color: '#7a5c00' },
  'In Progress': { bg: 'rgba(167,139,250,.14)', color: '#5b21b6' },
  'Closed':      { bg: 'rgba(52,211,153,.14)',  color: '#047857' },
}

const STATUSES = ['New', 'Contacted', 'In Progress', 'Closed']

// Never let a non-JSON response (500 with empty body, proxy error page,
// dropped connection mid-reload) crash the dashboard.
const safeJson = (r: Response) => r.json().catch(() => ({}))

const inputStyle: React.CSSProperties = {
  padding: '7px 12px', background: '#fff', border: '1px solid rgba(10,10,10,.15)',
  borderRadius: 8, fontSize: '0.78rem', color: '#0A0A0A',
}

const yellowPill: React.CSSProperties = {
  padding: '7px 16px', background: '#F7C83C', color: '#0A0A0A', border: 'none',
  borderRadius: 999, fontSize: '0.72rem', fontWeight: 700, cursor: 'pointer',
  letterSpacing: '0.08em', textTransform: 'uppercase',
}

function DeleteConfirm({ onConfirm, onCancel }: { onConfirm: (p: string) => void; onCancel: () => void }) {
  const [val, setVal] = useState('')
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(10,10,10,.45)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div role="dialog" aria-modal="true" aria-labelledby="delete-title" style={{ background: '#fff', border: HAIR, borderRadius: 16, padding: '2rem', width: 360, boxShadow: '0 24px 64px rgba(10,10,10,.18)' }}>
        <p id="delete-title" style={{ color: '#0A0A0A', fontWeight: 700, fontFamily: HEAD, marginBottom: 8, marginTop: 0 }}>Confirm Delete</p>
        <p style={{ color: 'rgba(10,10,10,.55)', fontSize: '0.78rem', marginBottom: 16, marginTop: 0 }}>Enter the delete passphrase to permanently remove this lead.</p>
        <input
          type="password"
          value={val}
          onChange={e => setVal(e.target.value)}
          placeholder="Passphrase"
          autoFocus
          aria-label="Delete passphrase"
          style={{ ...inputStyle, width: '100%', boxSizing: 'border-box', marginBottom: 16 }}
        />
        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
          <button onClick={onCancel} style={{ padding: '6px 16px', background: 'transparent', border: '1px solid rgba(10,10,10,.15)', borderRadius: 999, color: 'rgba(10,10,10,.62)', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 600 }}>Cancel</button>
          <button onClick={() => val && onConfirm(val)} disabled={!val} style={{ padding: '6px 16px', background: '#DC2626', border: 'none', borderRadius: 999, color: '#fff', cursor: val ? 'pointer' : 'not-allowed', fontSize: '0.75rem', fontWeight: 700, opacity: val ? 1 : 0.6 }}>Delete</button>
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
    const data = await safeJson(res)
    setLeads(data.leads ?? [])
    setTotal(data.total ?? 0)
    setTotalPages(data.totalPages ?? 1)
    setLoading(false)
  }, [page, search, filterStatus])

  const fetchStats = useCallback(async () => {
    const [all, newL, inp, cls] = await Promise.all([
      fetch('/api/admin/leads?page=1').then(safeJson),
      fetch('/api/admin/leads?page=1&status=New').then(safeJson),
      fetch('/api/admin/leads?page=1&status=In%20Progress').then(safeJson),
      fetch('/api/admin/leads?page=1&status=Closed').then(safeJson),
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
    const data = await safeJson(res)
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
    { label: 'Total Leads', value: stats.total, filter: '' },
    { label: 'New', value: stats.new, filter: 'New' },
    { label: 'In Progress', value: stats.inProgress, filter: 'In Progress' },
    { label: 'Closed', value: stats.closed, filter: 'Closed' },
  ]

  const grouped = leads.reduce<Record<string, Lead[]>>((acc, lead) => {
    const key = new Date(lead.createdAt).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })
    if (!acc[key]) acc[key] = []
    acc[key].push(lead)
    return acc
  }, {})

  if (authStatus === 'loading' || authStatus === 'unauthenticated') {
    return (
      <div style={{ minHeight: '100vh', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ color: 'rgba(10,10,10,.45)', fontSize: '0.8rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Loading...</div>
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

      <div style={{ minHeight: '100vh', background: '#fff', fontFamily: 'Inter, sans-serif', color: '#0A0A0A' }}>

        {/* Header */}
        <header style={{ background: 'rgba(247,200,60,.94)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(10,10,10,.12)', height: 58, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 28px', position: 'sticky', top: 0, zIndex: 50 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logos/Logo.png" alt="Samruthi One" style={{ height: 24, width: 'auto', objectFit: 'contain', filter: 'brightness(0)' }} />
            <span style={{ background: '#fff', color: '#0A0A0A', fontSize: '0.58rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', padding: '3px 10px', borderRadius: 999, border: '1px solid rgba(10,10,10,.12)' }}>Portal</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <span style={{ color: 'rgba(10,10,10,.55)', fontSize: '0.75rem' }}>{session?.user?.email}</span>
            <button
              aria-label="Sign out"
              onClick={() => signOut({ callbackUrl: '/s1-portal/login' })}
              style={{ color: '#0A0A0A', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', background: 'none', border: '1px solid rgba(10,10,10,.3)', padding: '5px 16px', borderRadius: 999, cursor: 'pointer' }}
            >
              Sign Out
            </button>
          </div>
        </header>

        <main style={{ padding: '2rem 28px', maxWidth: 1300, margin: '0 auto' }}>

          {/* Page title */}
          <div style={{ marginBottom: '1.5rem' }}>
            <p style={{ fontSize: '0.65rem', color: '#E6B400', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 4, marginTop: 0 }}>Dashboard</p>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 800, fontFamily: HEAD, color: '#0A0A0A', letterSpacing: '-0.02em', margin: 0 }}>Enquiry Leads</h1>
          </div>

          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
            {statCards.map(s => (
              <div key={s.label} style={{ background: '#fff', border: HAIR, borderTop: filterStatus === s.filter && s.filter !== '' ? '3px solid #F7C83C' : HAIR, borderRadius: 12, padding: '1.25rem 1.5rem' }}>
                <p style={{ fontSize: '0.62rem', color: 'rgba(10,10,10,.55)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 8, marginTop: 0 }}>{s.label}</p>
                <p style={{ fontSize: '2.1rem', fontWeight: 800, fontFamily: HEAD, color: '#0A0A0A', lineHeight: 1, margin: 0 }}>{s.value}</p>
              </div>
            ))}
          </div>

          {/* Table card */}
          <div style={{ background: '#fff', border: HAIR, borderRadius: 16, overflow: 'hidden' }}>

            {/* Toolbar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 1.5rem', borderBottom: HAIR, flexWrap: 'wrap', gap: 12 }}>
              <p style={{ fontSize: '0.75rem', color: 'rgba(10,10,10,.45)', margin: 0 }}>{total} leads</p>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
                <input
                  value={search}
                  onChange={e => { setSearch(e.target.value); setPage(1) }}
                  placeholder="Search name, phone, email, ref…"
                  aria-label="Search leads"
                  style={{ ...inputStyle, minWidth: 220 }}
                />
                <select
                  value={filterStatus}
                  onChange={e => { setFilterStatus(e.target.value); setPage(1) }}
                  aria-label="Filter by status"
                  style={{ ...inputStyle, cursor: 'pointer', color: filterStatus ? '#0A0A0A' : 'rgba(10,10,10,.55)' }}
                >
                  <option value="">All Statuses</option>
                  {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
                <button onClick={exportLeads} aria-label="Export leads to Excel" style={yellowPill}>
                  ↓ Export
                </button>
              </div>
            </div>

            {/* Table */}
            {loading ? (
              <div style={{ padding: '4rem', textAlign: 'center', color: 'rgba(10,10,10,.45)', fontSize: '0.8rem' }}>Fetching leads…</div>
            ) : leads.length === 0 ? (
              <div style={{ padding: '4rem', textAlign: 'center', color: 'rgba(10,10,10,.45)', fontSize: '0.8rem' }}>No leads found.</div>
            ) : (
              <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {Object.entries(grouped).map(([month, monthLeads]) => (
                  <div key={month} style={{ border: HAIR_SOFT, borderRadius: 12, overflow: 'hidden' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 16px', background: 'rgba(247,200,60,.12)', borderBottom: HAIR_SOFT }}>
                      <span style={{ fontSize: '0.68rem', fontWeight: 700, color: '#0A0A0A', letterSpacing: '0.12em', textTransform: 'uppercase' }}>{month}</span>
                      <span style={{ fontSize: '0.65rem', color: 'rgba(10,10,10,.45)' }}>{monthLeads.length} {monthLeads.length === 1 ? 'lead' : 'leads'}</span>
                    </div>
                    <div style={{ overflowX: 'auto' }}>
                      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.78rem' }}>
                        <thead>
                          <tr style={{ borderBottom: HAIR_SOFT }}>
                            {['Ref ID', 'Date', 'Name', 'Phone', 'Facility', 'Amount', 'Status', 'Actions'].map(h => (
                              <th key={h} style={{ padding: '8px 16px', textAlign: 'left', fontWeight: 600, fontSize: '0.62rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(10,10,10,.45)', whiteSpace: 'nowrap' }}>{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {monthLeads.map((l) => {
                            const sc = STATUS_COLORS[l.status] ?? { bg: 'rgba(10,10,10,.06)', color: 'rgba(10,10,10,.55)' }
                            const isOpen = expandedId === l.id
                            return (
                              <>
                                <tr key={`row-${l.id}`} style={{ borderBottom: HAIR_SOFT, background: isOpen ? 'rgba(247,200,60,.06)' : 'transparent' }}>
                                  <td style={{ padding: '12px 16px', fontWeight: 600, color: '#A67C00', whiteSpace: 'nowrap', fontFamily: 'monospace', fontSize: '0.72rem' }}>{l.referenceId}</td>
                                  <td style={{ padding: '12px 16px', color: 'rgba(10,10,10,.45)', whiteSpace: 'nowrap' }}>{new Date(l.createdAt).toLocaleDateString('en-IN')}</td>
                                  <td style={{ padding: '12px 16px', fontWeight: 600, color: '#0A0A0A' }}>{l.name}</td>
                                  <td style={{ padding: '12px 16px', color: 'rgba(10,10,10,.62)', whiteSpace: 'nowrap' }}>{l.phone}</td>
                                  <td style={{ padding: '12px 16px', color: 'rgba(10,10,10,.62)' }}>{l.facility}</td>
                                  <td style={{ padding: '12px 16px', color: 'rgba(10,10,10,.62)', whiteSpace: 'nowrap' }}>{l.loanAmount}</td>
                                  <td style={{ padding: '12px 16px' }}>
                                    <span style={{ background: sc.bg, color: sc.color, padding: '3px 10px', borderRadius: 999, fontSize: '0.65rem', fontWeight: 600, whiteSpace: 'nowrap' }}>{l.status}</span>
                                  </td>
                                  <td style={{ padding: '12px 16px' }}>
                                    <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                                      <select
                                        value={l.status}
                                        onChange={e => updateStatus(l.id, e.target.value)}
                                        aria-label={`Change status for ${l.referenceId}`}
                                        style={{ fontSize: '0.7rem', padding: '4px 8px', background: '#fff', border: '1px solid rgba(10,10,10,.15)', borderRadius: 8, cursor: 'pointer', color: '#0A0A0A' }}
                                      >
                                        {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                                      </select>
                                      <button
                                        onClick={() => toggleExpand(l)}
                                        aria-expanded={isOpen}
                                        aria-label={isOpen ? 'Collapse lead details' : 'Expand lead details'}
                                        style={{ fontSize: '0.65rem', padding: '4px 12px', background: isOpen ? 'rgba(247,200,60,.25)' : '#fff', border: '1px solid rgba(10,10,10,.15)', borderRadius: 999, cursor: 'pointer', color: '#0A0A0A', fontWeight: 600, whiteSpace: 'nowrap' }}
                                      >
                                        {isOpen ? '▲ Close' : '▼ Details'}
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                                {isOpen && (
                                  <tr key={`expanded-${l.id}`} style={{ borderBottom: HAIR_SOFT, background: 'rgba(247,200,60,.04)' }}>
                                    <td colSpan={8} style={{ padding: '0 16px 16px' }}>
                                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', paddingTop: 16 }}>
                                        <div style={{ background: '#F5F5F3', borderRadius: 8, padding: '1rem' }}>
                                          <p style={{ fontSize: '0.6rem', color: 'rgba(10,10,10,.45)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 10, marginTop: 0 }}>Lead Details</p>
                                          {[
                                            ['Email', l.email],
                                            ['Business Type', l.businessType],
                                            ['Turnover', l.turnover],
                                            ['Submitted', new Date(l.createdAt).toLocaleString('en-IN')],
                                          ].map(([k, v]) => (
                                            <div key={k} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                                              <span style={{ color: 'rgba(10,10,10,.45)', fontSize: '0.72rem' }}>{k}</span>
                                              <span style={{ color: '#0A0A0A', fontSize: '0.72rem', fontWeight: 500, textAlign: 'right', maxWidth: '60%' }}>{v}</span>
                                            </div>
                                          ))}
                                        </div>
                                        <div style={{ background: '#F5F5F3', borderRadius: 8, padding: '1rem' }}>
                                          <p style={{ fontSize: '0.6rem', color: 'rgba(10,10,10,.45)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 10, marginTop: 0 }}>Client Message</p>
                                          <p style={{ color: 'rgba(10,10,10,.62)', fontSize: '0.75rem', lineHeight: 1.6, margin: 0 }}>{l.message || '—'}</p>
                                        </div>
                                        <div style={{ background: '#F5F5F3', borderRadius: 8, padding: '1rem', display: 'flex', flexDirection: 'column', gap: 8 }}>
                                          <p style={{ fontSize: '0.6rem', color: 'rgba(10,10,10,.45)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', margin: 0 }}>Internal Notes</p>
                                          <textarea
                                            value={notesMap[l.id] ?? l.notes ?? ''}
                                            onChange={e => setNotesMap(prev => ({ ...prev, [l.id]: e.target.value }))}
                                            rows={4}
                                            placeholder="Add notes about this lead…"
                                            aria-label="Internal notes"
                                            style={{ background: '#fff', border: '1px solid rgba(10,10,10,.15)', borderRadius: 8, color: '#0A0A0A', fontSize: '0.75rem', padding: '8px 10px', resize: 'none', lineHeight: 1.5, flex: 1, fontFamily: 'Inter, sans-serif' }}
                                          />
                                          <button onClick={() => saveNotes(l.id)} style={{ ...yellowPill, padding: '6px 14px', fontSize: '0.7rem', alignSelf: 'flex-end' }}>
                                            Save Notes
                                          </button>
                                        </div>
                                      </div>
                                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', paddingTop: 12, gap: 6 }}>
                                        {deleteError && deleteTarget === l.id && (
                                          <p style={{ color: '#B91C1C', fontSize: '0.72rem', margin: 0 }}>{deleteError}</p>
                                        )}
                                        <button
                                          onClick={() => { setDeleteTarget(l.id); setDeleteError('') }}
                                          aria-label="Delete lead"
                                          style={{ padding: '5px 14px', background: 'rgba(239,68,68,.08)', border: 'none', borderRadius: 999, fontSize: '0.65rem', fontWeight: 600, color: '#B91C1C', cursor: 'pointer', letterSpacing: '0.08em', textTransform: 'uppercase' }}
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
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 1.5rem', borderTop: HAIR, fontSize: '0.75rem', color: 'rgba(10,10,10,.45)' }}>
                <span>Page {page} of {totalPages}</span>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} aria-label="Previous page" style={{ padding: '5px 16px', background: '#fff', border: '1px solid rgba(10,10,10,.15)', borderRadius: 999, color: page === 1 ? 'rgba(10,10,10,.25)' : '#0A0A0A', cursor: page === 1 ? 'not-allowed' : 'pointer', fontSize: '0.75rem' }}>← Prev</button>
                  <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} aria-label="Next page" style={{ padding: '5px 16px', background: '#fff', border: '1px solid rgba(10,10,10,.15)', borderRadius: 999, color: page === totalPages ? 'rgba(10,10,10,.25)' : '#0A0A0A', cursor: page === totalPages ? 'not-allowed' : 'pointer', fontSize: '0.75rem' }}>Next →</button>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  )
}
