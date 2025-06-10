import axios from 'axios'
import dotenv from 'dotenv'

dotenv.config()
const API_BASE = `http://${process.env.VITE_API_BASE}`

export const getQuizzes = async () => {
  const response = await axios.get(`${API_BASE}/quizzes`)
  return response.data
}

export const getQuizzesById = async (id) => {
  const response = await axios.get(`${API_BASE}/quizzes/${id}`)
  return response.data
}

export const getSingleQuiz = async (id) => {
  const response = await axios.get(`${API_BASE}/quiz/${id}`)
  return response.data
}

export const addQuiz = async (data) => {
  const response = await axios.post(`${API_BASE}/quiz`, data)
  return response.data
}

export const updateQuiz = async (id, data) => {
  const response = await axios.put(`${API_BASE}/quiz/${id}`, data)
  return response.data
}

export const deleteQuiz = async (id) => {
  const response = await axios.delete(`${API_BASE}/quiz/${id}`)
  return response.data
}

export const submitQuiz = async (id, data) => {
  const response = await axios.post(`${API_BASE}/quiz/${id}/submit`, data)
  return response.data
}
