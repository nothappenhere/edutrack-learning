import axios from 'axios'

const API_BASE = 'http://localhost:8000/api/auth'

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
