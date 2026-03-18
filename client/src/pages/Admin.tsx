import { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { getInquiries, updateInquiryStatus, deleteInquiry } from '../lib/api'
import { useAuth } from '../hooks/useAuth'
import type { Inquiry } from '../types'

const statusColors: Record<string, string> = {
  new: 'bg-blue-100 text-blue-800',
  contacted: 'bg-yellow-100 text-yellow-800',
  booked: 'bg-green-100 text-green-800',
  declined: 'bg-red-100 text-red-800',
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
      <div className="min-h-screen bg-linen flex items-center justify-center pt-20">
        <p className="font-body text-charcoal/50">Loading...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-linen pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-playfair text-3xl font-semibold text-charcoal">Dashboard</h1>
            <p className="font-body text-charcoal/50">Manage your inquiries and events</p>
          </div>
          <button
            onClick={() => { logout(); navigate('/admin/login') }}
            className="px-4 py-2 rounded-full border border-charcoal/20 font-body text-sm text-charcoal/60 hover:text-charcoal hover:border-charcoal transition-colors"
          >
            Logout
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Inquiries', value: stats.total, color: 'border-navy' },
            { label: 'New', value: stats.new, color: 'border-blue-400' },
            { label: 'Contacted', value: stats.contacted, color: 'border-yellow-400' },
            { label: 'Booked', value: stats.booked, color: 'border-green-400' },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`bg-white rounded-xl p-6 shadow-sm border-l-4 ${stat.color}`}
            >
              <p className="font-body text-sm text-charcoal/50">{stat.label}</p>
              <p className="font-playfair text-3xl font-semibold text-charcoal mt-1">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Chart */}
        {monthlyData.length > 0 && (
          <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
            <h2 className="font-playfair text-xl font-semibold text-charcoal mb-4">Inquiries by Month</h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E8D5B0" />
                <XAxis dataKey="month" tick={{ fontFamily: 'Lato', fontSize: 12 }} />
                <YAxis tick={{ fontFamily: 'Lato', fontSize: 12 }} />
                <Tooltip contentStyle={{ fontFamily: 'Lato' }} />
                <Bar dataKey="count" fill="#C9A96E" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Filter + Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-sand/50 flex items-center justify-between flex-wrap gap-4">
            <h2 className="font-playfair text-xl font-semibold text-charcoal">Inquiries</h2>
            <div className="flex gap-2">
              {['all', 'new', 'contacted', 'booked', 'declined'].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  className={`px-3 py-1.5 rounded-full font-body text-xs uppercase tracking-wider transition-colors ${
                    filter === status ? 'bg-gold text-white' : 'bg-sand/30 text-charcoal/50 hover:text-charcoal'
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
                <tr className="bg-linen/50">
                  <th className="text-left px-6 py-3 font-body text-xs uppercase tracking-wider text-charcoal/50">Name</th>
                  <th className="text-left px-6 py-3 font-body text-xs uppercase tracking-wider text-charcoal/50">Email</th>
                  <th className="text-left px-6 py-3 font-body text-xs uppercase tracking-wider text-charcoal/50">Event</th>
                  <th className="text-left px-6 py-3 font-body text-xs uppercase tracking-wider text-charcoal/50">Date</th>
                  <th className="text-left px-6 py-3 font-body text-xs uppercase tracking-wider text-charcoal/50">Status</th>
                  <th className="text-left px-6 py-3 font-body text-xs uppercase tracking-wider text-charcoal/50">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sand/30">
                {filteredInquiries.map((inquiry) => (
                  <tr key={inquiry.id} className="hover:bg-linen/30 transition-colors">
                    <td className="px-6 py-4 font-body text-sm text-charcoal font-medium">{inquiry.name}</td>
                    <td className="px-6 py-4 font-body text-sm text-charcoal/60">{inquiry.email}</td>
                    <td className="px-6 py-4 font-body text-sm text-charcoal/60">{inquiry.eventType || '—'}</td>
                    <td className="px-6 py-4 font-body text-sm text-charcoal/60">{inquiry.eventDate || '—'}</td>
                    <td className="px-6 py-4">
                      <select
                        value={inquiry.status}
                        onChange={(e) => handleStatusChange(inquiry.id, e.target.value)}
                        className={`px-3 py-1 rounded-full font-body text-xs font-semibold cursor-pointer border-0 ${statusColors[inquiry.status]}`}
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
                        className="font-body text-xs text-red-400 hover:text-red-600 transition-colors"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredInquiries.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center font-body text-charcoal/40">
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
