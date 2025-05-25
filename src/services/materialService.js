import axios from 'axios'

const API_BASE = 'http://localhost:8000/api'

export const addMaterial = async (data) => {
  const response = await axios.post(`${API_BASE}/materials`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

  return response.data
}

export const updateMaterial = async (id, data) => {
  return await axios.put(`${API_BASE}/materials/${id}`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}
