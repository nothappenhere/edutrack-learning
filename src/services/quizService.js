import axios from 'axios'

const API_BASE = 'http://localhost:8000/api'

export const getQuizzes = async () => {
  const response = await axios.get(`${API_BASE}/quizzes`)
  return response.data
}

export const getSingleQuiz = async (id) => {
  const response = await axios.get(`${API_BASE}/quizzes/${id}`)
  return response.data
}

export const addQuiz = async (data) => {
  const response = await axios.post(`${API_BASE}/quizzes`, data)
  return response.data
}

export const deleteQuiz = async (id) => {
  const response = await axios.delete(`${API_BASE}/quizzes/${id}`)
  return response.data
}
