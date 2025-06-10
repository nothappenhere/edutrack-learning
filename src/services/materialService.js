import axios from 'axios'

const API_BASE = `http://${import.meta.env.API_BASE}`

export const getMaterials = async () => {
  const response = await axios.get(`${API_BASE}/materials`)
  return response.data
}

export const getMaterialsById = async (id) => {
  const response = await axios.get(`${API_BASE}/materials/${id}`)
  return response.data
}

export const getSingleMaterial = async (id) => {
  const response = await axios.get(`${API_BASE}/material/${id}`)
  return response.data
}

export const addMaterial = async (data) => {
  const response = await axios.post(`${API_BASE}/material`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

  return response.data
}

export const updateMaterial = async (id, data) => {
  const response = await axios.put(`${API_BASE}/material/${id}`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

  return response.data
}

export const deleteMaterial = async (id) => {
  const response = await axios.delete(`${API_BASE}/material/${id}`)
  return response.data
}
