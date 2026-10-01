import { useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useAuth } from '../context/AuthContext'
import {
  BackArrow3DIcon,
  Logout3DIcon,
  ShieldCheck3DIcon,
  BadgeCheck3DIcon,
  Info3DIcon,
  ShieldLock3DIcon,
  PersonBadge3DIcon,
  UserCard3DIcon,
  Mail3DIcon,
  Role3DIcon,
  StatusPulse3DIcon,
  ShieldStar3DIcon,
  StatEmployees3DIcon,
  StatDepartments3DIcon,
  Analytics3DIcon,
  Key3DIcon,
} from '../components/common/Sidebar3DIcons'

export default function Profile() {
  const { user, logout, updateUser, initiateChangePassword, verifyChangePassword, resendChangePasswordOtp } = useAuth()
  const navigate = useNavigate()
  const fileInputRef = useRef(null)

  const [activeTab, setActiveTab] = useState('info') // 'info' | 'security'
  const [uploadingPhoto, setUploadingPhoto] = useState(false)
  const [showPhotoModal, setShowPhotoModal] = useState(false)

  // Change Password – Step 1 form state
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showCurrentPass, setShowCurrentPass] = useState(false)
  const [showNewPass, setShowNewPass] = useState(false)
  const [showConfirmPass, setShowConfirmPass] = useState(false)
  const [updating, setUpdating] = useState(false)

  // Change Password – Step 2 OTP state
  const [pwChangeStep, setPwChangeStep] = useState('form') // 'form' | 'otp'
  const [pwChangeEmail, setPwChangeEmail] = useState('')
  const [pwChangePendingNew, setPwChangePendingNew] = useState('')
  const [otpDigits, setOtpDigits] = useState(['', '', '', '', '', ''])
  const [resendTimer, setResendTimer] = useState(0)
  const otpRefs = useRef([])

  const displayName = user?.fullName || 'Avishkar Shinde'
  const displayEmail = user?.email || 'avishkarshinde0507@gmail.com'
  const displayRole = user?.role || 'ADMIN'
  const profilePicture = user?.profilePicture || null

  const getInitials = (name) => {
    if (!name) return 'AS'
    const parts = name.trim().split(' ')
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
    }
    return name.slice(0, 2).toUpperCase()
  }

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate type
    if (!file.type.startsWith('image/')) {
      toast.error('Please select a valid image file (PNG, JPG, WEBP, GIF)')
      return
    }

    // Validate size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size must be less than 5MB')
      return
    }

    setUploadingPhoto(true)
    const reader = new FileReader()
    reader.onload = async (event) => {
      const base64Data = event.target.result
      await updateUser({ profilePicture: base64Data })
      setUploadingPhoto(false)
      toast.success('Profile photo updated successfully!')
      // reset file input
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
    reader.onerror = () => {
      setUploadingPhoto(false)
      toast.error('Failed to process the image. Please try again.')
    }
    reader.readAsDataURL(file)
  }

  const handleAvatarClick = () => {
    if (profilePicture) {
      setShowPhotoModal(true)
    } else {
      fileInputRef.current?.click()
    }
  }

  const handleCameraBadgeClick = (e) => {
    e.stopPropagation()
    fileInputRef.current?.click()
  }

  const handleRemovePhoto = async (e) => {
    if (e) e.stopPropagation()
    await updateUser({ profilePicture: null })
    if (fileInputRef.current) fileInputRef.current.value = ''
    setShowPhotoModal(false)
    toast.info('Profile photo removed')
  }

  const handleLogout = () => {
    logout()
    toast.info('Logged out successfully', { autoClose: 1000 })
    navigate('/login', { replace: true })
  }

  // Step 1: Validate & send OTP to email
  const handlePasswordSubmit = async (e) => {
    e.preventDefault()
    if (!currentPassword) { toast.error('Please enter your current password'); return }
    if (!newPassword || newPassword.length < 6) { toast.error('New password must be at least 6 characters'); return }
    if (newPassword !== confirmPassword) { toast.error('Passwords do not match'); return }

    setUpdating(true)
    const result = await initiateChangePassword({
      email: displayEmail,
      currentPassword,
      newPassword,
    })
    setUpdating(false)

    if (result.success) {
      setPwChangeEmail(displayEmail)
      setPwChangePendingNew(newPassword)
      setOtpDigits(['', '', '', '', '', ''])
      setPwChangeStep('otp')
      setResendTimer(60)
      const timer = setInterval(() => {
        setResendTimer(prev => { if (prev <= 1) { clearInterval(timer); return 0 } return prev - 1 })
      }, 1000)
      toast.info('OTP sent to your email. Enter it to confirm the password change.')
    } else {
      toast.error(result.message || 'Failed to send OTP')
    }
  }

  // Step 2: Handle OTP input
  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return
    const digits = [...otpDigits]
    digits[index] = value.slice(-1)
    setOtpDigits(digits)
    if (value && index < 5) otpRefs.current[index + 1]?.focus()
  }

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
      otpRefs.current[index - 1]?.focus()
    }
  }

  const handleOtpPaste = (e) => {
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)
    if (pasted.length === 6) {
      const digits = pasted.split('')
      setOtpDigits(digits)
      otpRefs.current[5]?.focus()
    }
  }

  // Step 2: Verify OTP & change password
  const handleOtpSubmit = async (e) => {
    e.preventDefault()
    const otp = otpDigits.join('')
    if (otp.length < 6) { toast.error('Please enter the complete 6-digit OTP'); return }

    setUpdating(true)
    const result = await verifyChangePassword({ email: pwChangeEmail, otp, newPassword: pwChangePendingNew })
    setUpdating(false)

    if (result.success) {
      toast.success('Password changed successfully!')
      setPwChangeStep('form')
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
      setOtpDigits(['', '', '', '', '', ''])
      setPwChangePendingNew('')
    } else {
      toast.error(result.message || 'Invalid OTP. Please try again.')
      setOtpDigits(['', '', '', '', '', ''])
      setTimeout(() => otpRefs.current[0]?.focus(), 50)
    }
  }

  const handleResendOtp = async () => {
    if (resendTimer > 0) return
    const result = await resendChangePasswordOtp(pwChangeEmail)
    if (result.success) {
      setOtpDigits(['', '', '', '', '', ''])
      setResendTimer(60)
      const timer = setInterval(() => {
        setResendTimer(prev => { if (prev <= 1) { clearInterval(timer); return 0 } return prev - 1 })
      }, 1000)
      toast.info('New OTP sent to your email!')
      otpRefs.current[0]?.focus()
    } else {
      toast.error(result.message || 'Failed to resend OTP')
    }
  }

  const handleCancelOtp = () => {
    setPwChangeStep('form')
    setOtpDigits(['', '', '', '', '', ''])
    setResendTimer(0)
  }

  return (
    <div className="container-fluid px-0">
      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handlePhotoUpload}
        accept="image/png, image/jpeg, image/jpg, image/webp, image/gif"
        style={{ display: 'none' }}
      />

      {/* Page Header */}
      <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
        <div>
          <h1 className="page-title mb-0">Admin Profile</h1>
        </div>

        <div className="d-flex gap-2">
          <Link to="/" className="btn btn-outline-secondary d-flex align-items-center gap-1">
            <BackArrow3DIcon size={16} />
            <span>Dashboard</span>
          </Link>
          <button
            onClick={handleLogout}
            className="btn btn-outline-danger d-flex align-items-center gap-1"
          >
            <Logout3DIcon size={16} />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      <div className="row g-4">
        {/* Left Column - Profile Card */}
        <div className="col-12 col-lg-4">
          <div className="card shadow-sm border-0 text-center p-4">
            {/* Interactive Avatar Container */}
            <div className="position-relative d-inline-block mx-auto mb-3">
              <div
                className="profile-avatar-wrapper"
                onClick={handleAvatarClick}
                title={profilePicture ? 'Click to view photo' : 'Click to upload photo'}
              >
                <div className="profile-avatar-circle">
                  {profilePicture ? (
                    <img
                      src={profilePicture}
                      alt={displayName}
                      className="profile-avatar-img"
                    />
                  ) : (
                    <span>{getInitials(displayName)}</span>
                  )}

                  {/* Hover Overlay */}
                  <div className="profile-avatar-overlay">
                    <i className={`bi ${profilePicture ? 'bi-eye-fill' : 'bi-camera-fill'} fs-5 mb-1`}></i>
                    <span>{profilePicture ? 'View' : 'Upload'}</span>
                  </div>
                </div>

                {/* Camera Button Badge */}
                <div
                  className="profile-camera-badge"
                  onClick={handleCameraBadgeClick}
                  title={profilePicture ? 'Change photo' : 'Upload photo'}
                >
                  <i className="bi bi-camera-fill"></i>
                </div>
              </div>
            </div>

            <h4 className="fw-bold text-dark mb-3">{displayName}</h4>

            <div className="d-flex justify-content-center gap-2 mb-4">
              <span className="badge px-3 py-2 rounded-pill fw-semibold d-inline-flex align-items-center gap-1" style={{ background: '#fff7ed', color: '#ea580c', border: '1px solid #fed7aa' }}>
                <ShieldCheck3DIcon size={15} /> {displayRole}
              </span>
              <span className="badge px-3 py-2 rounded-pill fw-semibold d-inline-flex align-items-center gap-1" style={{ background: '#eff6ff', color: '#1d4ed8', border: '1px solid #bfdbfe' }}>
                <BadgeCheck3DIcon size={15} /> Active
              </span>
            </div>

            <div className="border-top pt-3 text-start">
              <div className="d-flex justify-content-between py-2 border-bottom">
                <span className="text-secondary-ems small">Account Type</span>
                <span className="fw-semibold text-dark small">Super Administrator</span>
              </div>
              <div className="d-flex justify-content-between pt-2">
                <span className="text-secondary-ems small">Access Level</span>
                <span className="fw-semibold text-dark small">Full Access (Read/Write)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Tabs & Content */}
        <div className="col-12 col-lg-8">
          {/* Two Buttons: 1. Information, 2. Security */}
          <div className="d-flex gap-2 mb-3">
            <button
              type="button"
              className={`btn d-flex align-items-center gap-2 px-4 py-2 rounded-3 fw-semibold ${
                activeTab === 'info'
                  ? 'btn-primary shadow-sm'
                  : 'btn-light border text-secondary-ems'
              }`}
              onClick={() => setActiveTab('info')}
            >
              <Info3DIcon size={16} />
              <span>Information</span>
            </button>
            <button
              type="button"
              className={`btn d-flex align-items-center gap-2 px-4 py-2 rounded-3 fw-semibold ${
                activeTab === 'security'
                  ? 'btn-primary shadow-sm'
                  : 'btn-light border text-secondary-ems'
              }`}
              onClick={() => setActiveTab('security')}
            >
              <ShieldLock3DIcon size={16} />
              <span>Security</span>
            </button>
          </div>

          {activeTab === 'info' ? (
            /* TAB 1: INFORMATION */
            <>
              {/* Account Information Card */}
              <div className="card shadow-sm border-0 mb-4">
                <div className="card-body p-4">
                  <h5 className="form-section-title d-flex align-items-center gap-2 mb-3">
                    <PersonBadge3DIcon size={20} />
                    <span>Account Information</span>
                  </h5>

                  <div className="row g-3">
                    <div className="col-md-6">
                      <div className="p-3 rounded-3 bg-light border">
                        <div className="text-muted small mb-1 d-flex align-items-center gap-1">
                          <UserCard3DIcon size={16} />
                          <span>Full Name</span>
                        </div>
                        <div className="fw-semibold text-dark fs-6">{displayName}</div>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="p-3 rounded-3 bg-light border">
                        <div className="text-muted small mb-1 d-flex align-items-center gap-1">
                          <Mail3DIcon size={16} />
                          <span>Email Address</span>
                        </div>
                        <div className="fw-semibold text-dark fs-6">{displayEmail}</div>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="p-3 rounded-3 bg-light border">
                        <div className="text-muted small mb-1 d-flex align-items-center gap-1">
                          <Role3DIcon size={16} />
                          <span>Role</span>
                        </div>
                        <div className="fw-semibold text-dark fs-6">{displayRole}</div>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="p-3 rounded-3 bg-light border">
                        <div className="text-muted small mb-1 d-flex align-items-center gap-1">
                          <StatusPulse3DIcon size={16} />
                          <span>Status</span>
                        </div>
                        <div className="fw-semibold text-success fs-6 d-flex align-items-center gap-1">
                          <span>Logged In & Active</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Permissions & System Privileges Card */}
              <div className="card shadow-sm border-0">
                <div className="card-body p-4">
                  <h5 className="form-section-title d-flex align-items-center gap-2 mb-3">
                    <ShieldStar3DIcon size={20} />
                    <span>Permissions & System Privileges</span>
                  </h5>

                  <div className="row g-3">
                    <div className="col-md-6">
                      <div className="d-flex align-items-start gap-3 p-3 rounded-3 border bg-white">
                        <div className="badge p-2 rounded-3 d-flex align-items-center justify-content-center" style={{ background: 'var(--color-primary-soft)', width: 42, height: 42 }}>
                          <StatEmployees3DIcon size={24} />
                        </div>
                        <div>
                          <div className="fw-semibold text-dark">Employee Management</div>
                          <div className="text-muted small">Create, update, view and remove employees</div>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="d-flex align-items-start gap-3 p-3 rounded-3 border bg-white">
                        <div className="badge p-2 rounded-3 d-flex align-items-center justify-content-center" style={{ background: 'var(--color-accent-soft)', width: 42, height: 42 }}>
                          <StatDepartments3DIcon size={24} />
                        </div>
                        <div>
                          <div className="fw-semibold text-dark">Department Control</div>
                          <div className="text-muted small">Manage company departments and allocations</div>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="d-flex align-items-start gap-3 p-3 rounded-3 border bg-white">
                        <div className="badge p-2 rounded-3 d-flex align-items-center justify-content-center" style={{ background: 'var(--color-primary-soft)', width: 42, height: 42 }}>
                          <Analytics3DIcon size={24} />
                        </div>
                        <div>
                          <div className="fw-semibold text-dark">Dashboard & Analytics</div>
                          <div className="text-muted small">View headcount stats, department charts and trends</div>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="d-flex align-items-start gap-3 p-3 rounded-3 border bg-white">
                        <div className="badge p-2 rounded-3 d-flex align-items-center justify-content-center" style={{ background: 'var(--color-accent-soft)', width: 42, height: 42 }}>
                          <Key3DIcon size={24} />
                        </div>
                        <div>
                          <div className="fw-semibold text-dark">Security Access</div>
                          <div className="text-muted small">Full administrative authentication & access token</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            /* TAB 2: SECURITY (CHANGE PASSWORD) */
            <div className="card shadow-sm border-0">
              <div className="card-body p-4">
                <h5 className="form-section-title d-flex align-items-center gap-2 mb-2">
                  <i className="bi bi-shield-lock-fill text-primary"></i>
                  <span>Change Password</span>
                </h5>
                <p className="text-muted small mb-4">
                  Update your administrator password. An OTP will be sent to your email for verification.
                </p>

                <div className="row g-4 align-items-start">
                  {/* Left Column: Form or OTP step */}
                  <div className="col-12 col-lg-7">

                    {pwChangeStep === 'form' ? (
                      /* STEP 1: Enter current & new password */
                      <form onSubmit={handlePasswordSubmit}>
                        <div className="mb-3">
                          <label className="form-label fw-semibold small text-dark">Current Password</label>
                          <div className="input-group">
                            <input
                              type={showCurrentPass ? 'text' : 'password'}
                              className="form-control"
                              placeholder="Enter current password"
                              value={currentPassword}
                              onChange={(e) => setCurrentPassword(e.target.value)}
                              required
                            />
                            <button type="button" className="btn btn-outline-secondary"
                              onClick={() => setShowCurrentPass(!showCurrentPass)}>
                              <i className={`bi ${showCurrentPass ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                            </button>
                          </div>
                        </div>

                        <div className="mb-3">
                          <label className="form-label fw-semibold small text-dark">New Password</label>
                          <div className="input-group">
                            <input
                              type={showNewPass ? 'text' : 'password'}
                              className="form-control"
                              placeholder="Enter new password (min. 6 characters)"
                              value={newPassword}
                              onChange={(e) => setNewPassword(e.target.value)}
                              required
                            />
                            <button type="button" className="btn btn-outline-secondary"
                              onClick={() => setShowNewPass(!showNewPass)}>
                              <i className={`bi ${showNewPass ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                            </button>
                          </div>
                        </div>

                        <div className="mb-4">
                          <label className="form-label fw-semibold small text-dark">Confirm New Password</label>
                          <div className="input-group">
                            <input
                              type={showConfirmPass ? 'text' : 'password'}
                              className="form-control"
                              placeholder="Re-enter new password"
                              value={confirmPassword}
                              onChange={(e) => setConfirmPassword(e.target.value)}
                              required
                            />
                            <button type="button" className="btn btn-outline-secondary"
                              onClick={() => setShowConfirmPass(!showConfirmPass)}>
                              <i className={`bi ${showConfirmPass ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                            </button>
                          </div>
                        </div>

                        <button
                          type="submit"
                          className="btn btn-primary px-4 py-2 fw-semibold d-flex align-items-center gap-2 shadow-sm"
                          disabled={updating}
                        >
                          {updating ? (
                            <><span className="spinner-border spinner-border-sm" role="status"></span><span>Sending OTP...</span></>
                          ) : (
                            <><i className="bi bi-send-fill"></i><span>Send OTP & Continue</span></>
                          )}
                        </button>
                      </form>
                    ) : (
                      /* STEP 2: Enter OTP from email */
                      <form onSubmit={handleOtpSubmit}>
                        <div className="mb-3 p-3 rounded-3 bg-light border border-info-subtle">
                          <p className="text-muted small mb-0">
                            <i className="bi bi-envelope-fill text-info me-1"></i>
                            OTP sent to <strong>{pwChangeEmail}</strong>. Enter the 6-digit code below.
                          </p>
                        </div>

                        <div className="mb-4">
                          <label className="form-label fw-semibold small text-dark">Enter OTP Code</label>
                          <div className="d-flex gap-2 justify-content-start" onPaste={handleOtpPaste}>
                            {otpDigits.map((digit, idx) => (
                              <input
                                key={idx}
                                ref={(el) => (otpRefs.current[idx] = el)}
                                type="text"
                                inputMode="numeric"
                                maxLength={1}
                                value={digit}
                                onChange={(e) => handleOtpChange(idx, e.target.value)}
                                onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                                className="form-control text-center fw-bold fs-5"
                                style={{ width: '48px', height: '52px' }}
                                autoFocus={idx === 0}
                              />
                            ))}
                          </div>
                        </div>

                        <div className="d-flex align-items-center gap-3 mb-3">
                          <button
                            type="submit"
                            className="btn btn-primary px-4 py-2 fw-semibold d-flex align-items-center gap-2 shadow-sm"
                            disabled={updating}
                          >
                            {updating ? (
                              <><span className="spinner-border spinner-border-sm" role="status"></span><span>Verifying...</span></>
                            ) : (
                              <><i className="bi bi-check2-circle"></i><span>Verify & Change Password</span></>
                            )}
                          </button>
                          <button
                            type="button"
                            className="btn btn-outline-secondary px-3 py-2"
                            onClick={handleCancelOtp}
                          >
                            Cancel
                          </button>
                        </div>

                        <div className="small text-muted">
                          Didn&apos;t receive it?{' '}
                          <button
                            type="button"
                            className="btn btn-link btn-sm p-0 text-decoration-none"
                            onClick={handleResendOtp}
                            disabled={resendTimer > 0}
                          >
                            {resendTimer > 0 ? `Resend in ${resendTimer}s` : 'Resend OTP'}
                          </button>
                        </div>
                      </form>
                    )}
                  </div>

                  {/* Right Column: Security Guidelines */}
                  <div className="col-12 col-lg-5">
                    <div className="p-3 rounded-3 bg-light border">
                      <h6 className="fw-semibold text-dark d-flex align-items-center gap-2 mb-3">
                        <i className="bi bi-shield-check text-success"></i>
                        <span>Security Guidelines</span>
                      </h6>
                      <ul className="list-unstyled d-flex flex-column gap-2 small text-secondary-ems mb-3">
                        <li className="d-flex align-items-start gap-2">
                          <i className="bi bi-check-circle-fill text-success mt-1"></i>
                          <span>At least <strong>6 characters</strong> in length</span>
                        </li>
                        <li className="d-flex align-items-start gap-2">
                          <i className="bi bi-check-circle-fill text-success mt-1"></i>
                          <span>Include a combination of letters &amp; numbers</span>
                        </li>
                        <li className="d-flex align-items-start gap-2">
                          <i className="bi bi-check-circle-fill text-success mt-1"></i>
                          <span>Avoid sharing your administrator password</span>
                        </li>
                        <li className="d-flex align-items-start gap-2">
                          <i className="bi bi-check-circle-fill text-success mt-1"></i>
                          <span>OTP verification is required to confirm all password changes</span>
                        </li>
                      </ul>
                      <div className="p-2 rounded-2 bg-white border border-info-subtle small text-muted">
                        <i className="bi bi-info-circle text-info me-1"></i>
                        After changing your password, use the new password on your next sign-in.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Photo Viewer Lightbox Modal */}
      {showPhotoModal && profilePicture && (
        <div
          className="modal d-block fade show"
          tabIndex="-1"
          role="dialog"
          style={{ background: 'rgba(15, 23, 42, 0.75)', zIndex: 1055 }}
          onClick={() => setShowPhotoModal(false)}
        >
          <div
            className="modal-dialog modal-dialog-centered"
            role="document"
            style={{ maxWidth: '440px' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content shadow-lg border-0" style={{ borderRadius: '16px', overflow: 'hidden' }}>
              <div className="modal-header border-0 pb-0 pt-3 px-4 d-flex justify-content-between align-items-center">
                <div>
                  <h5 className="modal-title fw-bold text-dark mb-0">Profile Photo</h5>
                  <small className="text-muted">{displayName}</small>
                </div>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={() => setShowPhotoModal(false)}
                ></button>
              </div>

              <div className="modal-body text-center p-4">
                <div
                  className="d-flex align-items-center justify-content-center mx-auto bg-light rounded-4 p-2"
                  style={{
                    maxHeight: '380px',
                    border: '1px solid #e2e8f0',
                    boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.03)'
                  }}
                >
                  <img
                    src={profilePicture}
                    alt={displayName}
                    className="img-fluid rounded-3"
                    style={{
                      maxHeight: '340px',
                      width: 'auto',
                      maxWidth: '100%',
                      objectFit: 'contain'
                    }}
                  />
                </div>
              </div>

              <div className="modal-footer border-0 pt-0 pb-3 px-4 d-flex justify-content-between">
                <div className="d-flex gap-2">
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-primary d-flex align-items-center gap-1 rounded-pill px-3 py-1.5"
                    onClick={() => {
                      fileInputRef.current?.click()
                    }}
                    title="Change Photo"
                  >
                    <i className="bi bi-camera-fill"></i>
                    <span>Change Photo</span>
                  </button>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-danger d-flex align-items-center gap-1 rounded-pill px-3 py-1.5"
                    onClick={(e) => {
                      handleRemovePhoto(e)
                    }}
                    title="Remove Photo"
                  >
                    <i className="bi bi-trash3"></i>
                    <span>Remove</span>
                  </button>
                </div>
                <button
                  type="button"
                  className="btn btn-sm btn-secondary rounded-pill px-3 py-1.5"
                  onClick={() => setShowPhotoModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
