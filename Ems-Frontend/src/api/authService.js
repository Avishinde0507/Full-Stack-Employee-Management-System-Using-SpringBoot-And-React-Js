import axiosClient from './axiosClient'

const AUTH_KEY = 'ems_admin_user'
const TOKEN_KEY = 'ems_admin_token'

export const authService = {
  async initiateLogin(credentials) {
    const response = await axiosClient.post('/auth/login', credentials)
    return response.data
  },

  async verifyOtp({ email, otp }) {
    const response = await axiosClient.post('/auth/verify-otp', { email, otp })
    const data = response.data
    if (data.token) {
      localStorage.setItem(TOKEN_KEY, data.token)
      localStorage.setItem(AUTH_KEY, JSON.stringify(data))
    }
    return data
  },

  async resendOtp(email) {
    const response = await axiosClient.post(`/auth/resend-otp?email=${encodeURIComponent(email)}`)
    return response.data
  },

  async login(credentials) {
    return this.initiateLogin(credentials)
  },

  // ── Change Password Flow ──────────────────────────────────────────────────────

  async initiateChangePassword({ email, currentPassword, newPassword }) {
    const response = await axiosClient.post('/auth/change-password/initiate', {
      email,
      currentPassword,
      newPassword,
    })
    return response.data
  },

  async verifyChangePassword({ email, otp, newPassword }) {
    const response = await axiosClient.post('/auth/change-password/verify', {
      email,
      otp,
      newPassword,
    })
    return response.data
  },

  async resendChangePasswordOtp(email) {
    const response = await axiosClient.post(
      `/auth/change-password/resend-otp?email=${encodeURIComponent(email)}`
    )
    return response.data
  },

  // ── Profile Photo ─────────────────────────────────────────────────────────────

  /**
   * Persists the profile photo (base64) to the backend database.
   * Called whenever the user uploads or removes their profile photo.
   */
  async saveProfilePhotoToBackend({ email, profilePicture }) {
    try {
      const response = await axiosClient.post('/auth/profile-photo', { email, profilePicture })
      return response.data
    } catch (err) {
      console.warn('Failed to save profile photo to backend:', err)
      return null
    }
  },

  // ─────────────────────────────────────────────────────────────────────────────

  getCurrentUser() {
    try {
      const stored = localStorage.getItem(AUTH_KEY)
      return stored ? JSON.parse(stored) : null
    } catch {
      return null
    }
  },

  getToken() {
    return localStorage.getItem(TOKEN_KEY)
  },

  isAuthenticated() {
    return !!localStorage.getItem(TOKEN_KEY)
  },

  updateUser(userData) {
    try {
      const current = this.getCurrentUser() || {
        fullName: 'Avishkar Shinde',
        email: 'avishkarshinde0507@gmail.com',
        role: 'ADMIN',
      }
      const updated = { ...current, ...userData }
      localStorage.setItem(AUTH_KEY, JSON.stringify(updated))
      return updated
    } catch {
      return userData
    }
  },

  logout() {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(AUTH_KEY)
    try {
      axiosClient.post('/auth/logout').catch(() => {})
    } catch {
      // ignore
    }
  },
}
