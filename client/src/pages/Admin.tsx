import { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { getInquiries, updateInquiryStatus, updateInquiryNotes, deleteInquiry, getDeals, createDeal, updateDeal, deleteDeal } from '../lib/api'
import { useAuth } from '../hooks/useAuth'
import type { Inquiry, Deal } from '../types'

const LEAD_STATUSES = ['new', 'contacted', 'qualified', 'proposal', 'booked', 'completed', 'lost'] as const
const DEAL_STAGES = ['proposal', 'negotiation', 'contract', 'won', 'lost'] as const

const statusColors: Record<string, string> = {
  new: 'bg-sage/10 text-sage-dark',
  contacted: 'bg-amber-50 text-amber-700',
  qualified: 'bg-sage-mist text-sage-dark',
  proposal: 'bg-blue-50 text-blue-700',
  booked: 'bg-emerald-50 text-emerald-700',
  completed: 'bg-sage/20 text-forest',
  lost: 'bg-red-50 text-red-600',
}

const dealStageColors: Record<string, string> = {
  proposal: 'bg-sage-mist text-sage-dark',
  negotiation: 'bg-amber-50 text-amber-700',
  contract: 'bg-blue-50 text-blue-700',
  won: 'bg-emerald-50 text-emerald-700',
  lost: 'bg-red-50 text-red-600',
}

type Tab = 'dashboard' | 'leads' | 'deals'
type LeadView = 'table' | 'kanban'

export function Admin() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [deals, setDeals] = useState<Deal[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<Tab>('dashboard')
  const [leadView, setLeadView] = useState<LeadView>('kanban')
  const [leadFilter, setLeadFilter] = useState<string>('all')
  const [dealFilter, setDealFilter] = useState<string>('all')
  const [selectedLead, setSelectedLead] = useState<Inquiry | null>(null)
  const [showDealForm, setShowDealForm] = useState(false)
  const [dealFormData, setDealFormData] = useState({ title: '', value: '', inquiryId: 0, expectedCloseDate: '', notes: '' })
  const { isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuthenticated) { navigate('/admin/login'); return }
    loadData()
  }, [isAuthenticated, navigate])

  async function loadData() {
    try {
      const [inqs, dls] = await Promise.all([getInquiries(), getDeals()])
      setInquiries(inqs)
      setDeals(dls)
    } catch { logout(); navigate('/admin/login') }
    finally { setLoading(false) }
  }

  async function handleStatusChange(id: number, status: string) {
    try {
      const updated = await updateInquiryStatus(id, status)
      setInquiries(prev => prev.map(i => i.id === id ? updated : i))
      if (selectedLead?.id === id) setSelectedLead(updated)
    } catch (err) { console.error('Failed to update:', err) }
  }

  async function handleNotesUpdate(id: number, notes: string) {
    try {
      const updated = await updateInquiryNotes(id, notes)
      setInquiries(prev => prev.map(i => i.id === id ? updated : i))
      if (selectedLead?.id === id) setSelectedLead(updated)
    } catch (err) { console.error('Failed to update notes:', err) }
  }

  async function handleDeleteInquiry(id: number) {
    if (!confirm('Delete this lead?')) return
    try { await deleteInquiry(id); setInquiries(prev => prev.filter(i => i.id !== id)) }
    catch (err) { console.error('Failed to delete:', err) }
  }

  async function handleCreateDeal() {
    try {
      const deal = await createDeal({
        title: dealFormData.title,
        value: dealFormData.value || undefined,
        inquiryId: dealFormData.inquiryId || undefined,
        expectedCloseDate: dealFormData.expectedCloseDate || undefined,
        notes: dealFormData.notes || undefined,
      })
      setDeals(prev => [deal, ...prev])
      setShowDealForm(false)
      setDealFormData({ title: '', value: '', inquiryId: 0, expectedCloseDate: '', notes: '' })
    } catch (err) { console.error('Failed to create deal:', err) }
  }

  async function handleDealStageChange(id: number, stage: string) {
    try {
      const updated = await updateDeal(id, { stage } as Partial<Deal>)
      setDeals(prev => prev.map(d => d.id === id ? updated : d))
    } catch (err) { console.error('Failed to update deal:', err) }
  }

  async function handleDeleteDeal(id: number) {
    if (!confirm('Delete this deal?')) return
    try { await deleteDeal(id); setDeals(prev => prev.filter(d => d.id !== id)) }
    catch (err) { console.error('Failed to delete:', err) }
  }

  const stats = useMemo(() => {
    const pipelineValue = deals.filter(d => d.stage !== 'lost').reduce((sum, d) => sum + (d.value ? parseFloat(d.value) : 0), 0)
    const wonValue = deals.filter(d => d.stage === 'won').reduce((sum, d) => sum + (d.value ? parseFloat(d.value) : 0), 0)
    return {
      totalLeads: inquiries.length,
      newLeads: inquiries.filter(i => i.status === 'new').length,
      booked: inquiries.filter(i => i.status === 'booked' || i.status === 'completed').length,
      totalDeals: deals.filter(d => d.stage !== 'lost').length,
      pipelineValue,
      wonValue,
    }
  }, [inquiries, deals])

  const monthlyData = useMemo(() => {
    const months: Record<string, number> = {}
    inquiries.forEach(inq => {
      const month = new Date(inq.createdAt).toLocaleString('default', { month: 'short', year: '2-digit' })
      months[month] = (months[month] || 0) + 1
    })
    return Object.entries(months).map(([month, count]) => ({ month, count }))
  }, [inquiries])

  const filteredLeads = leadFilter === 'all' ? inquiries : inquiries.filter(i => i.status === leadFilter)
  const filteredDeals = dealFilter === 'all' ? deals : deals.filter(d => d.stage === dealFilter)

  if (loading) {
    return (
      <div className="min-h-screen bg-light-warm flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-sage border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-light-warm">
      {/* Top Bar */}
      <div className="bg-surface border-b border-border">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 flex items-center justify-between h-16">
          <div className="flex items-center gap-6">
            <img src="/logo/logo-nav.png" alt="You're Invited Events" className="h-12 w-auto" />
            <span className="text-border">|</span>
            <span className="font-body text-[0.6875rem] tracking-[0.15em] uppercase text-taupe">CRM</span>
          </div>
          <button onClick={() => { logout(); navigate('/admin/login') }} className="font-body text-[0.75rem] tracking-[0.1em] uppercase text-taupe hover:text-charcoal transition-colors">
            Logout
          </button>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-8">
        {/* Tabs */}
        <div className="flex gap-1 mb-8 bg-surface p-1 w-fit border border-border">
          {([
            { key: 'dashboard', label: 'Dashboard' },
            { key: 'leads', label: 'Leads' },
            { key: 'deals', label: 'Deals' },
          ] as const).map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-5 py-2 font-body text-[0.75rem] tracking-[0.1em] uppercase transition-all duration-200 ${
                activeTab === tab.key ? 'bg-forest text-white' : 'text-taupe hover:text-charcoal'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* DASHBOARD TAB */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                { label: 'Total Leads', value: stats.totalLeads },
                { label: 'New Leads', value: stats.newLeads },
                { label: 'Booked', value: stats.booked },
                { label: 'Active Deals', value: stats.totalDeals },
                { label: 'Pipeline Value', value: `$${stats.pipelineValue.toLocaleString()}` },
                { label: 'Won Revenue', value: `$${stats.wonValue.toLocaleString()}` },
              ].map(stat => (
                <div key={stat.label} className="bg-surface border border-border p-5">
                  <p className="font-cormorant text-[2rem] font-light text-charcoal leading-none">{stat.value}</p>
                  <p className="font-body text-[0.625rem] tracking-[0.15em] uppercase text-taupe mt-2">{stat.label}</p>
                </div>
              ))}
            </div>

            {monthlyData.length > 0 && (
              <div className="bg-surface border border-border p-6">
                <h3 className="font-cormorant text-lg font-light text-charcoal mb-5">Lead Inquiries by Month</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E2DED9" />
                    <XAxis dataKey="month" tick={{ fontFamily: 'Lato', fontSize: 11, fill: '#B4AC9F' }} />
                    <YAxis tick={{ fontFamily: 'Lato', fontSize: 11, fill: '#B4AC9F' }} />
                    <Tooltip contentStyle={{ fontFamily: 'Lato', fontSize: 13, border: '1px solid #E2DED9', borderRadius: 0 }} />
                    <Bar dataKey="count" fill="#809A7B" radius={[2, 2, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-surface border border-border">
                <div className="p-5 border-b border-border">
                  <h3 className="font-cormorant text-lg font-light text-charcoal">Recent Leads</h3>
                </div>
                <div className="divide-y divide-border">
                  {inquiries.slice(0, 5).map(inq => (
                    <div key={inq.id} className="px-5 py-3 flex items-center justify-between">
                      <div>
                        <p className="font-body text-[0.875rem] text-charcoal">{inq.name}</p>
                        <p className="font-body text-[0.75rem] text-taupe">{inq.eventType || 'General Inquiry'}</p>
                      </div>
                      <span className={`font-body text-[0.625rem] tracking-[0.1em] uppercase px-2.5 py-1 ${statusColors[inq.status]}`}>
                        {inq.status}
                      </span>
                    </div>
                  ))}
                  {inquiries.length === 0 && (
                    <p className="px-5 py-8 text-center font-body text-[0.875rem] text-taupe">No leads yet</p>
                  )}
                </div>
              </div>

              <div className="bg-surface border border-border">
                <div className="p-5 border-b border-border">
                  <h3 className="font-cormorant text-lg font-light text-charcoal">Recent Deals</h3>
                </div>
                <div className="divide-y divide-border">
                  {deals.slice(0, 5).map(deal => (
                    <div key={deal.id} className="px-5 py-3 flex items-center justify-between">
                      <div>
                        <p className="font-body text-[0.875rem] text-charcoal">{deal.title}</p>
                        <p className="font-body text-[0.75rem] text-taupe">{deal.value ? `$${parseFloat(deal.value).toLocaleString()}` : '—'}</p>
                      </div>
                      <span className={`font-body text-[0.625rem] tracking-[0.1em] uppercase px-2.5 py-1 ${dealStageColors[deal.stage]}`}>
                        {deal.stage}
                      </span>
                    </div>
                  ))}
                  {deals.length === 0 && (
                    <p className="px-5 py-8 text-center font-body text-[0.875rem] text-taupe">No deals yet</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* LEADS TAB */}
        {activeTab === 'leads' && (
          <div>
            <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
              <h2 className="font-cormorant text-[1.75rem] font-light text-charcoal">Lead Pipeline</h2>
              <div className="flex gap-1 bg-surface border border-border p-0.5">
                <button onClick={() => setLeadView('kanban')} className={`px-3 py-1.5 font-body text-[0.625rem] tracking-[0.1em] uppercase ${leadView === 'kanban' ? 'bg-forest text-white' : 'text-taupe'}`}>Kanban</button>
                <button onClick={() => setLeadView('table')} className={`px-3 py-1.5 font-body text-[0.625rem] tracking-[0.1em] uppercase ${leadView === 'table' ? 'bg-forest text-white' : 'text-taupe'}`}>Table</button>
              </div>
            </div>

            {leadView === 'kanban' && (
              <div className="flex gap-3 overflow-x-auto pb-4">
                {LEAD_STATUSES.map(status => {
                  const col = inquiries.filter(i => i.status === status)
                  return (
                    <div key={status} className="min-w-[180px] flex-1">
                      <div className="flex items-center justify-between mb-3 px-1">
                        <span className="font-body text-[0.625rem] tracking-[0.15em] uppercase text-taupe">{status}</span>
                        <span className="font-body text-[0.625rem] text-taupe bg-surface-warm px-1.5 py-0.5">{col.length}</span>
                      </div>
                      <div className="space-y-2">
                        {col.map(inq => (
                          <motion.div
                            key={inq.id}
                            layout
                            className="bg-surface border border-border p-3 cursor-pointer hover:border-sage transition-colors"
                            onClick={() => setSelectedLead(inq)}
                          >
                            <p className="font-body text-[0.8125rem] text-charcoal font-medium truncate">{inq.name}</p>
                            <p className="font-body text-[0.6875rem] text-taupe mt-1 truncate">{inq.eventType || 'General'}</p>
                            {inq.budgetRange && (
                              <p className="font-body text-[0.625rem] text-sage mt-1.5">{inq.budgetRange}</p>
                            )}
                          </motion.div>
                        ))}
                        {col.length === 0 && (
                          <div className="border border-dashed border-border p-4 text-center">
                            <p className="font-body text-[0.6875rem] text-taupe/60">Empty</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            )}

            {leadView === 'table' && (
              <div className="bg-surface border border-border">
                <div className="p-4 border-b border-border flex items-center gap-4 flex-wrap">
                  {['all', ...LEAD_STATUSES].map(s => (
                    <button key={s} onClick={() => setLeadFilter(s)} className={`font-body text-[0.625rem] tracking-[0.1em] uppercase transition-colors ${leadFilter === s ? 'text-charcoal' : 'text-taupe hover:text-charcoal'}`}>
                      {s}
                    </button>
                  ))}
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        {['Name', 'Email', 'Event', 'Date', 'Budget', 'Status', ''].map(h => (
                          <th key={h} className="text-left px-4 py-2.5 font-body text-[0.625rem] tracking-[0.1em] uppercase text-taupe font-normal">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {filteredLeads.map(inq => (
                        <tr key={inq.id} className="border-b border-border last:border-0 hover:bg-surface-warm/50 transition-colors cursor-pointer" onClick={() => setSelectedLead(inq)}>
                          <td className="px-4 py-3 font-body text-[0.8125rem] text-charcoal">{inq.name}</td>
                          <td className="px-4 py-3 font-body text-[0.8125rem] text-taupe">{inq.email}</td>
                          <td className="px-4 py-3 font-body text-[0.8125rem] text-taupe">{inq.eventType || '—'}</td>
                          <td className="px-4 py-3 font-body text-[0.8125rem] text-taupe">{inq.eventDate || '—'}</td>
                          <td className="px-4 py-3 font-body text-[0.8125rem] text-taupe">{inq.budgetRange || '—'}</td>
                          <td className="px-4 py-3">
                            <select
                              value={inq.status}
                              onChange={e => { e.stopPropagation(); handleStatusChange(inq.id, e.target.value) }}
                              onClick={e => e.stopPropagation()}
                              className="font-body text-[0.75rem] bg-transparent border-0 cursor-pointer focus:outline-none"
                            >
                              {LEAD_STATUSES.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
                            </select>
                          </td>
                          <td className="px-4 py-3">
                            <button onClick={e => { e.stopPropagation(); handleDeleteInquiry(inq.id) }} className="font-body text-[0.6875rem] text-taupe hover:text-red-500 transition-colors">Delete</button>
                          </td>
                        </tr>
                      ))}
                      {filteredLeads.length === 0 && (
                        <tr><td colSpan={7} className="px-4 py-12 text-center font-body text-taupe text-sm">No leads found</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* DEALS TAB */}
        {activeTab === 'deals' && (
          <div>
            <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
              <h2 className="font-cormorant text-[1.75rem] font-light text-charcoal">Deals Pipeline</h2>
              <button
                onClick={() => setShowDealForm(true)}
                className="font-body text-[0.75rem] tracking-[0.1em] uppercase bg-sage text-white px-5 py-2 hover:bg-sage-dark transition-colors"
              >
                + New Deal
              </button>
            </div>

            <div className="flex gap-4 overflow-x-auto pb-4">
              {DEAL_STAGES.map(stage => {
                const col = deals.filter(d => d.stage === stage)
                const stageValue = col.reduce((sum, d) => sum + (d.value ? parseFloat(d.value) : 0), 0)
                return (
                  <div key={stage} className="min-w-[220px] flex-1">
                    <div className="mb-3 px-1">
                      <div className="flex items-center justify-between">
                        <span className="font-body text-[0.625rem] tracking-[0.15em] uppercase text-taupe">{stage}</span>
                        <span className="font-body text-[0.625rem] text-taupe">{col.length}</span>
                      </div>
                      {stageValue > 0 && (
                        <p className="font-body text-[0.6875rem] text-sage mt-0.5">${stageValue.toLocaleString()}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      {col.map(deal => (
                        <div key={deal.id} className="bg-surface border border-border p-3.5 hover:border-sage transition-colors">
                          <div className="flex items-start justify-between gap-2">
                            <p className="font-body text-[0.8125rem] text-charcoal font-medium">{deal.title}</p>
                            <button onClick={() => handleDeleteDeal(deal.id)} className="text-taupe hover:text-red-500 text-xs shrink-0">&times;</button>
                          </div>
                          {deal.contactName && (
                            <p className="font-body text-[0.6875rem] text-taupe mt-1">{deal.contactName}</p>
                          )}
                          {deal.value && (
                            <p className="font-cormorant text-lg text-sage-dark mt-2">${parseFloat(deal.value).toLocaleString()}</p>
                          )}
                          {deal.expectedCloseDate && (
                            <p className="font-body text-[0.625rem] text-taupe mt-1.5">Close: {deal.expectedCloseDate}</p>
                          )}
                          <select
                            value={deal.stage}
                            onChange={e => handleDealStageChange(deal.id, e.target.value)}
                            className="mt-2 w-full font-body text-[0.6875rem] bg-surface-warm border-0 px-2 py-1 text-taupe cursor-pointer focus:outline-none"
                          >
                            {DEAL_STAGES.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
                          </select>
                        </div>
                      ))}
                      {col.length === 0 && (
                        <div className="border border-dashed border-border p-4 text-center">
                          <p className="font-body text-[0.6875rem] text-taupe/60">No deals</p>
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="mt-8 bg-surface border border-border">
              <div className="p-4 border-b border-border flex items-center justify-between flex-wrap gap-4">
                <h3 className="font-cormorant text-lg font-light text-charcoal">All Deals</h3>
                <div className="flex gap-4">
                  {['all', ...DEAL_STAGES].map(s => (
                    <button key={s} onClick={() => setDealFilter(s)} className={`font-body text-[0.625rem] tracking-[0.1em] uppercase ${dealFilter === s ? 'text-charcoal' : 'text-taupe hover:text-charcoal'} transition-colors`}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      {['Deal', 'Contact', 'Value', 'Stage', 'Expected Close', ''].map(h => (
                        <th key={h} className="text-left px-4 py-2.5 font-body text-[0.625rem] tracking-[0.1em] uppercase text-taupe font-normal">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredDeals.map(deal => (
                      <tr key={deal.id} className="border-b border-border last:border-0 hover:bg-surface-warm/50 transition-colors">
                        <td className="px-4 py-3 font-body text-[0.8125rem] text-charcoal">{deal.title}</td>
                        <td className="px-4 py-3 font-body text-[0.8125rem] text-taupe">{deal.contactName || '—'}</td>
                        <td className="px-4 py-3 font-body text-[0.8125rem] text-sage-dark font-medium">{deal.value ? `$${parseFloat(deal.value).toLocaleString()}` : '—'}</td>
                        <td className="px-4 py-3">
                          <span className={`font-body text-[0.625rem] tracking-[0.1em] uppercase px-2.5 py-1 ${dealStageColors[deal.stage]}`}>
                            {deal.stage}
                          </span>
                        </td>
                        <td className="px-4 py-3 font-body text-[0.8125rem] text-taupe">{deal.expectedCloseDate || '—'}</td>
                        <td className="px-4 py-3">
                          <button onClick={() => handleDeleteDeal(deal.id)} className="font-body text-[0.6875rem] text-taupe hover:text-red-500 transition-colors">Delete</button>
                        </td>
                      </tr>
                    ))}
                    {filteredDeals.length === 0 && (
                      <tr><td colSpan={6} className="px-4 py-12 text-center font-body text-taupe text-sm">No deals found</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* LEAD DETAIL DRAWER */}
      <AnimatePresence>
        {selectedLead && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex justify-end"
            onClick={() => setSelectedLead(null)}
          >
            <div className="absolute inset-0 bg-forest/40" />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="relative w-full max-w-md bg-surface h-full overflow-y-auto shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="font-cormorant text-[1.5rem] font-light text-charcoal">{selectedLead.name}</h3>
                    <p className="font-body text-[0.8125rem] text-taupe mt-1">{selectedLead.email}</p>
                    {selectedLead.phone && <p className="font-body text-[0.8125rem] text-taupe">{selectedLead.phone}</p>}
                  </div>
                  <button onClick={() => setSelectedLead(null)} className="text-taupe hover:text-charcoal text-xl leading-none">&times;</button>
                </div>

                <div className="mb-6">
                  <label className="font-body text-[0.625rem] tracking-[0.15em] uppercase text-taupe block mb-2">Status</label>
                  <select
                    value={selectedLead.status}
                    onChange={e => handleStatusChange(selectedLead.id, e.target.value)}
                    className="w-full font-body text-[0.8125rem] bg-surface-warm border border-border px-3 py-2 text-charcoal focus:outline-none focus:border-sage"
                  >
                    {LEAD_STATUSES.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
                  </select>
                </div>

                <div className="space-y-4 mb-6">
                  {[
                    { label: 'Event Type', value: selectedLead.eventType },
                    { label: 'Event Date', value: selectedLead.eventDate },
                    { label: 'Guest Count', value: selectedLead.guestCount?.toString() },
                    { label: 'Budget', value: selectedLead.budgetRange },
                    { label: 'Submitted', value: new Date(selectedLead.createdAt).toLocaleDateString() },
                  ].map(({ label, value }) => value && (
                    <div key={label}>
                      <p className="font-body text-[0.625rem] tracking-[0.15em] uppercase text-taupe">{label}</p>
                      <p className="font-body text-[0.875rem] text-charcoal mt-0.5">{value}</p>
                    </div>
                  ))}
                </div>

                {selectedLead.message && (
                  <div className="mb-6">
                    <p className="font-body text-[0.625rem] tracking-[0.15em] uppercase text-taupe mb-2">Message</p>
                    <div className="bg-surface-warm p-4">
                      <p className="font-body text-[0.875rem] text-charcoal leading-relaxed">{selectedLead.message}</p>
                    </div>
                  </div>
                )}

                <div className="mb-6">
                  <p className="font-body text-[0.625rem] tracking-[0.15em] uppercase text-taupe mb-2">Internal Notes</p>
                  <textarea
                    defaultValue={selectedLead.notes || ''}
                    onBlur={e => handleNotesUpdate(selectedLead.id, e.target.value)}
                    rows={4}
                    placeholder="Add notes about this lead..."
                    className="w-full font-body text-[0.875rem] bg-surface-warm border border-border px-3 py-2 text-charcoal resize-none focus:outline-none focus:border-sage placeholder:text-taupe/50"
                  />
                </div>

                <button
                  onClick={() => {
                    setDealFormData({
                      title: `${selectedLead.name} — ${selectedLead.eventType || 'Event'}`,
                      value: '',
                      inquiryId: selectedLead.id,
                      expectedCloseDate: selectedLead.eventDate || '',
                      notes: '',
                    })
                    setShowDealForm(true)
                    setSelectedLead(null)
                    setActiveTab('deals')
                  }}
                  className="w-full font-body text-[0.75rem] tracking-[0.1em] uppercase bg-sage text-white py-2.5 hover:bg-sage-dark transition-colors mb-3"
                >
                  Convert to Deal
                </button>
                <button
                  onClick={() => { handleDeleteInquiry(selectedLead.id); setSelectedLead(null) }}
                  className="w-full font-body text-[0.75rem] tracking-[0.1em] uppercase text-taupe py-2 hover:text-red-500 transition-colors"
                >
                  Delete Lead
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* NEW DEAL MODAL */}
      <AnimatePresence>
        {showDealForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={() => setShowDealForm(false)}
          >
            <div className="absolute inset-0 bg-forest/40" />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative bg-surface w-full max-w-md p-6 shadow-2xl border border-border"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-cormorant text-xl font-light text-charcoal">New Deal</h3>
                <button onClick={() => setShowDealForm(false)} className="text-taupe hover:text-charcoal text-xl">&times;</button>
              </div>
              <div className="space-y-4">
                <input
                  value={dealFormData.title}
                  onChange={e => setDealFormData(p => ({ ...p, title: e.target.value }))}
                  placeholder="Deal title *"
                  className="w-full font-body text-[0.875rem] bg-surface-warm border border-border px-3 py-2.5 text-charcoal focus:outline-none focus:border-sage placeholder:text-taupe/50"
                />
                <input
                  value={dealFormData.value}
                  onChange={e => setDealFormData(p => ({ ...p, value: e.target.value }))}
                  placeholder="Value (e.g., 25000)"
                  type="number"
                  className="w-full font-body text-[0.875rem] bg-surface-warm border border-border px-3 py-2.5 text-charcoal focus:outline-none focus:border-sage placeholder:text-taupe/50"
                />
                <input
                  value={dealFormData.expectedCloseDate}
                  onChange={e => setDealFormData(p => ({ ...p, expectedCloseDate: e.target.value }))}
                  type="date"
                  className="w-full font-body text-[0.875rem] bg-surface-warm border border-border px-3 py-2.5 text-charcoal focus:outline-none focus:border-sage"
                />
                <select
                  value={dealFormData.inquiryId || ''}
                  onChange={e => setDealFormData(p => ({ ...p, inquiryId: parseInt(e.target.value) || 0 }))}
                  className="w-full font-body text-[0.875rem] bg-surface-warm border border-border px-3 py-2.5 text-charcoal focus:outline-none focus:border-sage"
                >
                  <option value="">Link to lead (optional)</option>
                  {inquiries.map(inq => (
                    <option key={inq.id} value={inq.id}>{inq.name} — {inq.eventType || 'General'}</option>
                  ))}
                </select>
                <textarea
                  value={dealFormData.notes}
                  onChange={e => setDealFormData(p => ({ ...p, notes: e.target.value }))}
                  placeholder="Notes"
                  rows={3}
                  className="w-full font-body text-[0.875rem] bg-surface-warm border border-border px-3 py-2.5 text-charcoal resize-none focus:outline-none focus:border-sage placeholder:text-taupe/50"
                />
              </div>
              <button
                onClick={handleCreateDeal}
                disabled={!dealFormData.title}
                className="w-full mt-6 font-body text-[0.75rem] tracking-[0.1em] uppercase bg-sage text-white py-2.5 hover:bg-sage-dark transition-colors disabled:opacity-30"
              >
                Create Deal
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
