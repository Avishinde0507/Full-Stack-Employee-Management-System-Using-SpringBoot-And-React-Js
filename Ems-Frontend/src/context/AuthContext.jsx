import { createContext, useContext, useState, useEffect } from 'react'
import { authService } from '../api/authService'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => authService.getCurrentUser())
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const currentUser = authService.getCurrentUser()
    setUser(currentUser)
  }, [])

  const initiateLogin = async (credentials) => {
    setLoading(true)
    try {
      const data = await authService.initiateLogin(credentials)
      return { success: true, data }
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Invalid credentials. Please try again.',
      }
    } finally {
      setLoading(false)
    }
  }

  const verifyOtp = async ({ email, otp }) => {
    setLoading(true)
    try {
      const data = await authService.verifyOtp({ email, otp })
      setUser(data)
      return { success: true, data }
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Invalid OTP code. Please try again.',
      }
    } finally {
      setLoading(false)
    }
  }

  const resendOtp = async (email) => {
    try {
      const data = await authService.resendOtp(email)
      return { success: true, data }
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Failed to resend OTP code.',
      }
    }
  }

  // ── Change Password Flow ────────────────────────────────────────────────────

  const initiateChangePassword = async ({ email, currentPassword, newPassword }) => {
    setLoading(true)
    try {
      const data = await authService.initiateChangePassword({ email, currentPassword, newPassword })
      return { success: true, data }
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Failed to initiate password change.',
      }
    } finally {
      setLoading(false)
    }
  }

  const verifyChangePassword = async ({ email, otp, newPassword }) => {
    setLoading(true)
    try {
      const data = await authService.verifyChangePassword({ email, otp, newPassword })
      return { success: true, data }
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Invalid OTP code. Please try again.',
      }
    } finally {
      setLoading(false)
    }
  }

  const resendChangePasswordOtp = async (email) => {
    try {
      const data = await authService.resendChangePasswordOtp(email)
      return { success: true, data }
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Failed to resend OTP.',
      }
    }
  }

  // ─────────────────────────────────────────────────────────────────────────────

  const updateUser = async (userData) => {
    const updated = authService.updateUser(userData)
    setUser(updated)
    // If photo changed, persist it to the backend DB so it survives logout/login
    if ('profilePicture' in userData) {
      const email = updated.email
      if (email) {
        await authService.saveProfilePhotoToBackend({
          email,
          profilePicture: userData.profilePicture ?? null,
        })
      }
    }
    return updated
  }

  const logout = () => {
    authService.logout()
    setUser(null)
  }

  const value = {
    user,
    isAuthenticated: !!user,
    loading,
    initiateLogin,
    verifyOtp,
    resendOtp,
    login: initiateLogin,
    logout,
    updateUser,
    initiateChangePassword,
    verifyChangePassword,
    resendChangePasswordOtp,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
