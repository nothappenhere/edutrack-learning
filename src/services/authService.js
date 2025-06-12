import axios from 'axios'
import { useUserStore } from '@/stores/user'

const API_BASE = import.meta.env.VITE_API_BASE
  ? `${import.meta.env.VITE_API_BASE}/auth`
  : 'http://localhost:8000/api/auth'

export const loginUser = async (payload) => {
  const response = await axios.post(`${API_BASE}/login`, payload)
  return response.data
}

export const registerUser = async (role, payload) => {
  const response = await axios.post(`${API_BASE}/register/${role}`, payload)
  return response.data
}

export const checkEmailExist = async (payload) => {
  const response = await axios.post(`${API_BASE}/check-email-exist`, payload)
  return response.data
}

export const resetPasswordUser = async (payload) => {
  const response = await axios.put(`${API_BASE}/reset-password`, payload)
  return response.data
}

export const getCurrentUser = async () => {
  const userStore = useUserStore()
  userStore.loadUser()
  const token = userStore.user?.token

  const response = await axios.get(`${API_BASE}/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data
}
