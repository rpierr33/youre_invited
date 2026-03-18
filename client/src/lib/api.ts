import type { Inquiry, InquiryFormData, AuthResponse } from '../types'

const API_BASE = '/api'

function getAuthHeaders(): HeadersInit {
  const token = localStorage.getItem('token')
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  }
}

export async function submitInquiry(data: InquiryFormData): Promise<{ message: string; inquiry: Inquiry }> {
  const res = await fetch(`${API_BASE}/inquiries`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) {
    const err = await res.json()
    throw new Error(err.error || 'Failed to submit inquiry')
  }
  return res.json()
}

export async function login(username: string, password: string): Promise<AuthResponse> {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  })
  if (!res.ok) {
    const err = await res.json()
    throw new Error(err.error || 'Login failed')
  }
  return res.json()
}

export async function getInquiries(): Promise<Inquiry[]> {
  const res = await fetch(`${API_BASE}/inquiries`, {
    headers: getAuthHeaders(),
  })
  if (!res.ok) throw new Error('Failed to fetch inquiries')
  return res.json()
}

export async function updateInquiryStatus(id: number, status: string): Promise<Inquiry> {
  const res = await fetch(`${API_BASE}/inquiries/${id}`, {
    method: 'PATCH',
    headers: getAuthHeaders(),
    body: JSON.stringify({ status }),
  })
  if (!res.ok) throw new Error('Failed to update inquiry')
  return res.json()
}

export async function deleteInquiry(id: number): Promise<void> {
  const res = await fetch(`${API_BASE}/inquiries/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  })
  if (!res.ok) throw new Error('Failed to delete inquiry')
}
