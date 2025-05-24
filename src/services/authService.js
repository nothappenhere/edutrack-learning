import axios from 'axios'

const API_BASE = 'http://localhost:8000/api/auth'

export const loginUser = async (data) => {
  const response = await axios.post(`${API_BASE}/login`, data)
  return response.data
}

export const registerUser = async (role, data) => {
  const response = await axios.post(`${API_BASE}/register/${role}`, data)
  return response.data
}

export const checkEmailExist = async (data) => {
  const response = await axios.post(`${API_BASE}/check-email-exist`, data)
  return response.data
}

export const resetPassword = async (data) => {
  const response = await axios.put(`${API_BASE}/reset-password`, data)
  return response.data
}
