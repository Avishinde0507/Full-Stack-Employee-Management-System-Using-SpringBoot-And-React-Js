import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api'

const axiosClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Attach auth token if available
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('ems_admin_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Normalize errors so every caller can rely on `error.message` and
// `error.fieldErrors` regardless of what the backend sent back.
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.data) {
      const { message, fieldErrors } = error.response.data
      error.message = message || error.message
      error.fieldErrors = fieldErrors || null
    } else if (error.request) {
      error.message = 'Could not reach the server. Is the backend running on ' + BASE_URL + '?'
    }
    return Promise.reject(error)
  }
)

export default axiosClient
