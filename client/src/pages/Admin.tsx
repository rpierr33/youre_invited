import { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { getInquiries, updateInquiryStatus, deleteInquiry } from '../lib/api'
import { useAuth } from '../hooks/useAuth'
import type { Inquiry } from '../types'

const statusStyles: Record<string, string> = {
  new: 'text-blue-600',
  contacted: 'text-amber-600',
  booked: 'text-green-600',
  declined: 'text-red-500',
}

export function Admin() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<string>('all')
  const { isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin/login')
      return
    }
    loadInquiries()
  }, [isAuthenticated, navigate])

  async function loadInquiries() {
    try {
      const data = await getInquiries()
      setInquiries(data)
    } catch {
      logout()
      navigate('/admin/login')
    } finally {
      setLoading(false)
    }
  }

  async function handleStatusChange(id: number, status: string) {
    try {
      const updated = await updateInquiryStatus(id, status)
      setInquiries((prev) => prev.map((inq) => (inq.id === id ? updated : inq)))
    } catch (err) {
      console.error('Failed to update status:', err)
    }
  }

  async function handleDelete(id: number) {
    if (!confirm('Delete this inquiry?')) return
    try {
      await deleteInquiry(id)
      setInquiries((prev) => prev.filter((inq) => inq.id !== id))
    } catch (err) {
      console.error('Failed to delete:', err)
    }
  }

  const filteredInquiries = filter === 'all' ? inquiries : inquiries.filter((inq) => inq.status === filter)

  const monthlyData = useMemo(() => {
    const months: Record<string, number> = {}
    inquiries.forEach((inq) => {
      const month = new Date(inq.createdAt).toLocaleString('default', { month: 'short', year: '2-digit' })
      months[month] = (months[month] || 0) + 1
    })
    return Object.entries(months).map(([month, count]) => ({ month, count }))
  }, [inquiries])

  const stats = useMemo(() => ({
    total: inquiries.length,
    new: inquiries.filter((i) => i.status === 'new').length,
    booked: inquiries.filter((i) => i.status === 'booked').length,
    contacted: inquiries.filter((i) => i.status === 'contacted').length,
  }), [inquiries])

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="font-body text-warm-gray text-sm">Loading...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white pt-[76px]">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12 py-12">
        {/* Header */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <h1 className="font-cormorant text-[2.5rem] font-light text-charcoal">Dashboard</h1>
          </div>
          <button
            onClick={() => { logout(); navigate('/admin/login') }}
            className="font-body text-[0.75rem] tracking-[0.12em] uppercase text-warm-gray hover:text-charcoal transition-colors"
          >
            Logout
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border mb-12">
          {[
            { label: 'Total', value: stats.total },
            { label: 'New', value: stats.new },
            { label: 'Contacted', value: stats.contacted },
            { label: 'Booked', value: stats.booked },
          ].map((stat) => (
            <div key={stat.label} className="bg-white p-6 md:p-8 text-center">
              <p className="font-cormorant text-[2.5rem] font-light text-charcoal">{stat.value}</p>
              <p className="font-body text-[0.6875rem] tracking-[0.15em] uppercase text-warm-gray mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Chart */}
        {monthlyData.length > 0 && (
          <div className="border border-border p-8 mb-12">
            <h2 className="font-cormorant text-xl font-light text-charcoal mb-6">Inquiries by Month</h2>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E8E6E3" />
                <XAxis dataKey="month" tick={{ fontFamily: 'Lato', fontSize: 11, fill: '#8A8580' }} />
                <YAxis tick={{ fontFamily: 'Lato', fontSize: 11, fill: '#8A8580' }} />
                <Tooltip contentStyle={{ fontFamily: 'Lato', fontSize: 13 }} />
                <Bar dataKey="count" fill="#2C2C2C" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Filter + Table */}
        <div className="border border-border">
          <div className="p-6 border-b border-border flex items-center justify-between flex-wrap gap-4">
            <h2 className="font-cormorant text-xl font-light text-charcoal">Inquiries</h2>
            <div className="flex gap-4">
              {['all', 'new', 'contacted', 'booked', 'declined'].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  className={`font-body text-[0.6875rem] tracking-[0.1em] uppercase transition-colors ${
                    filter === status ? 'text-charcoal' : 'text-warm-gray hover:text-charcoal'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left px-6 py-3 font-body text-[0.6875rem] tracking-[0.1em] uppercase text-warm-gray font-normal">Name</th>
                  <th className="text-left px-6 py-3 font-body text-[0.6875rem] tracking-[0.1em] uppercase text-warm-gray font-normal">Email</th>
                  <th className="text-left px-6 py-3 font-body text-[0.6875rem] tracking-[0.1em] uppercase text-warm-gray font-normal">Event</th>
                  <th className="text-left px-6 py-3 font-body text-[0.6875rem] tracking-[0.1em] uppercase text-warm-gray font-normal">Date</th>
                  <th className="text-left px-6 py-3 font-body text-[0.6875rem] tracking-[0.1em] uppercase text-warm-gray font-normal">Status</th>
                  <th className="text-left px-6 py-3 font-body text-[0.6875rem] tracking-[0.1em] uppercase text-warm-gray font-normal"></th>
                </tr>
              </thead>
              <tbody>
                {filteredInquiries.map((inquiry) => (
                  <tr key={inquiry.id} className="border-b border-border last:border-b-0 hover:bg-light-gray/50 transition-colors">
                    <td className="px-6 py-4 font-body text-[0.875rem] text-charcoal">{inquiry.name}</td>
                    <td className="px-6 py-4 font-body text-[0.875rem] text-warm-gray">{inquiry.email}</td>
                    <td className="px-6 py-4 font-body text-[0.875rem] text-warm-gray">{inquiry.eventType || '—'}</td>
                    <td className="px-6 py-4 font-body text-[0.875rem] text-warm-gray">{inquiry.eventDate || '—'}</td>
                    <td className="px-6 py-4">
                      <select
                        value={inquiry.status}
                        onChange={(e) => handleStatusChange(inquiry.id, e.target.value)}
                        className={`font-body text-[0.8125rem] bg-transparent border-0 cursor-pointer ${statusStyles[inquiry.status]} focus:outline-none`}
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="booked">Booked</option>
                        <option value="declined">Declined</option>
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleDelete(inquiry.id)}
                        className="font-body text-[0.75rem] text-warm-gray hover:text-red-500 transition-colors"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredInquiries.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-6 py-16 text-center font-body text-warm-gray text-sm">
                      No inquiries found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
