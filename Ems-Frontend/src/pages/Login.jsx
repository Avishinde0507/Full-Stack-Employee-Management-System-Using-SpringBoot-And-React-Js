import { useState, useRef, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useAuth } from '../context/AuthContext'
import HexagonBackground from '../components/HexagonBackground'

export default function Login() {
  const [step, setStep] = useState('credentials') // 'credentials' | 'otp'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  // OTP state (6 digits)
  const [otpDigits, setOtpDigits] = useState(['', '', '', '', '', ''])
  const [resendTimer, setResendTimer] = useState(30)
  const otpInputRefs = useRef([])

  const { initiateLogin, verifyOtp, resendOtp, loading } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/'

  // Resend OTP countdown timer
  useEffect(() => {
    let interval = null
    if (step === 'otp' && resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1)
      }, 1000)
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [step, resendTimer])

  // Focus first OTP input when switching to OTP step
  useEffect(() => {
    if (step === 'otp' && otpInputRefs.current[0]) {
      setTimeout(() => {
        otpInputRefs.current[0]?.focus()
      }, 100)
    }
  }, [step])

  // Handle credentials submit (Step 1)
  const handleCredentialsSubmit = async (e) => {
    e.preventDefault()

    if (!email.trim()) {
      toast.error('Please enter your email address', { autoClose: 1000 })
      return
    }
    if (!password) {
      toast.error('Please enter your password', { autoClose: 1000 })
      return
    }

    const result = await initiateLogin({ email: email.trim(), password })

    if (result.success) {
      setStep('otp')
      setResendTimer(30)
      setOtpDigits(['', '', '', '', '', ''])
      toast.info('OTP sent to your email address!', { autoClose: 2000 })
    } else {
      toast.error(result.message, { autoClose: 1000 })
    }
  }

  // Handle single OTP digit change
  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return

    const newDigits = [...otpDigits]
    newDigits[index] = value.slice(-1)
    setOtpDigits(newDigits)

    // Auto-focus next input
    if (value && index < 5) {
      otpInputRefs.current[index + 1]?.focus()
    }
  }

  // Handle keydown for Backspace navigation
  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus()
    }
  }

  // Handle paste full 6-digit OTP
  const handleOtpPaste = (e) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData('text').trim()
    if (/^\d{6}$/.test(pastedData)) {
      const digits = pastedData.split('')
      setOtpDigits(digits)
      otpInputRefs.current[5]?.focus()
    }
  }

  // Handle OTP submission (Step 2)
  const handleOtpSubmit = async (e) => {
    e.preventDefault()
    const otpCode = otpDigits.join('')

    if (otpCode.length < 6) {
      toast.error('Please enter complete 6-digit OTP', { autoClose: 1000 })
      return
    }

    const result = await verifyOtp({ email: email.trim(), otp: otpCode })

    if (result.success) {
      toast.success('Welcome Admin', { autoClose: 1000 })
      navigate(from, { replace: true })
    } else {
      toast.error(result.message, { autoClose: 1000 })
      // Clear all boxes and focus first on wrong OTP
      setOtpDigits(['', '', '', '', '', ''])
      setTimeout(() => otpInputRefs.current[0]?.focus(), 50)
    }
  }

  // Handle Resend OTP
  const handleResendOtp = async () => {
    if (resendTimer > 0) return
    const result = await resendOtp(email.trim())
    if (result.success) {
      setResendTimer(30)
      setOtpDigits(['', '', '', '', '', ''])
      toast.info('New OTP sent to your email!', { autoClose: 2000 })
      otpInputRefs.current[0]?.focus()
    } else {
      toast.error(result.message, { autoClose: 1000 })
    }
  }

  return (
    <div className="login-wrapper">
      {/* 3D Animated Hexagonal Honeycomb Background */}
      <HexagonBackground />

      <div className="login-card-container">
        <div className="login-card">
          {step === 'credentials' ? (
            /* STEP 1: Admin Credentials Form */
            <>
              {/* Header & Branding */}
              <div className="text-center mb-4">
                <div className="login-brand-icon-wrapper">
                  <div className="login-brand-icon">
                    <i className="bi bi-shield-lock-fill"></i>
                  </div>
                </div>
                <h2 className="login-title mt-3 mb-1">Admin Login</h2>
                <p className="login-subtitle text-muted">
                  Employee Management System
                </p>
              </div>

              {/* Login Form */}
              <form onSubmit={handleCredentialsSubmit} noValidate>
                <div className="mb-3">
                  <label className="form-label text-dark fw-medium" htmlFor="login-email">
                    Email Address <span className="text-danger">*</span>
                  </label>
                  <div className="input-group">
                    <span className="input-group-text bg-white border-end-0 text-muted">
                      <i className="bi bi-envelope"></i>
                    </span>
                    <input
                      id="login-email"
                      type="email"
                      className="form-control border-start-0 ps-0"
                      placeholder="admin@ems.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={loading}
                      required
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <div className="d-flex justify-content-between align-items-center">
                    <label className="form-label text-dark fw-medium" htmlFor="login-password">
                      Password <span className="text-danger">*</span>
                    </label>
                  </div>
                  <div className="input-group">
                    <span className="input-group-text bg-white border-end-0 text-muted">
                      <i className="bi bi-lock"></i>
                    </span>
                    <input
                      id="login-password"
                      type={showPassword ? 'text' : 'password'}
                      className="form-control border-start-0 border-end-0 ps-0"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={loading}
                      required
                    />
                    <button
                      type="button"
                      className="input-group-text bg-white border-start-0 text-muted cursor-pointer"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                      tabIndex={-1}
                    >
                      <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100 py-2 fw-semibold d-flex align-items-center justify-content-center gap-2 shadow-sm"
                  disabled={loading}
                  style={{
                    background: 'linear-gradient(135deg, #14213d 0%, #1f2f52 100%)',
                    borderColor: '#14213d',
                    fontSize: '0.98rem',
                  }}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                      <span>Verifying...</span>
                    </>
                  ) : (
                    <>
                      <span>Sign In as Administrator</span>
                      <i className="bi bi-arrow-right"></i>
                    </>
                  )}
                </button>
              </form>
            </>
          ) : (
            /* STEP 2: Enter OTP Form */
            <>
              {/* Header & Branding */}
              <div className="text-center mb-3">
                <div className="login-brand-icon-wrapper">
                  <div className="login-brand-icon" style={{ background: '#e8a33d', color: '#14213d' }}>
                    <i className="bi bi-shield-check"></i>
                  </div>
                </div>
                <h2 className="login-title mt-3 mb-1">Enter OTP</h2>
                <p className="login-subtitle text-muted mb-1">
                  Enter the 6-digit verification code sent to
                </p>
                <div className="fw-semibold text-dark small text-truncate px-2" style={{ maxWidth: 300, margin: '0 auto' }}>
                  {email}
                </div>
              </div>

              {/* OTP Form */}
              <form onSubmit={handleOtpSubmit} noValidate>
                <div className="otp-inputs-container" onPaste={handleOtpPaste}>
                  {otpDigits.map((digit, idx) => (
                    <input
                      key={idx}
                      ref={(el) => (otpInputRefs.current[idx] = el)}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      className="otp-digit-input"
                      value={digit}
                      onChange={(e) => handleOtpChange(idx, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(idx, e.key)}
                      disabled={loading}
                      autoFocus={idx === 0}
                    />
                  ))}
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100 py-2 fw-semibold d-flex align-items-center justify-content-center gap-2 shadow-sm mb-3"
                  disabled={loading || otpDigits.join('').length < 6}
                  style={{
                    background: 'linear-gradient(135deg, #14213d 0%, #1f2f52 100%)',
                    borderColor: '#14213d',
                    fontSize: '0.98rem',
                  }}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                      <span>Verifying Code...</span>
                    </>
                  ) : (
                    <>
                      <span>Verify & Sign In</span>
                      <i className="bi bi-check2-circle"></i>
                    </>
                  )}
                </button>

                <div className="d-flex justify-content-between align-items-center text-muted small pt-2 border-top">
                  <button
                    type="button"
                    className="btn btn-link p-0 text-decoration-none small text-secondary-ems"
                    onClick={() => setStep('credentials')}
                  >
                    <i className="bi bi-arrow-left me-1"></i> Back to Login
                  </button>

                  <div>
                    {resendTimer > 0 ? (
                      <span className="text-muted">Resend in {resendTimer}s</span>
                    ) : (
                      <button
                        type="button"
                        className="btn btn-link p-0 text-decoration-none small fw-semibold text-primary"
                        onClick={handleResendOtp}
                      >
                        Resend OTP
                      </button>
                    )}
                  </div>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
