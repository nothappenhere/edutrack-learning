import axios from 'axios'

const API_BASE = 'http://localhost:8000/api'

export const addNewMaterials = async (data) => {
  const response = await axios.post(`${API_BASE}/materials`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

  return response.data
}
