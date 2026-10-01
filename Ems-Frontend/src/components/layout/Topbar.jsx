import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useAuth } from '../../context/AuthContext'
import { Profile3DIcon, Logout3DIcon } from '../common/Sidebar3DIcons'

export default function Topbar({ isCollapsed, mobileOpen, onToggleSidebar }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  const displayName = user?.fullName || 'Avishkar Shinde'
  const profilePicture = user?.profilePicture || null

  const getInitials = (name) => {
    if (!name) return 'AS'
    const parts = name.trim().split(' ')
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
    }
    return name.slice(0, 2).toUpperCase()
  }

  const today = new Date().toLocaleDateString('en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleProfileClick = () => {
    setDropdownOpen(false)
    navigate('/profile')
  }

  const handleLogout = () => {
    setDropdownOpen(false)
    logout()
    toast.info('Logged out successfully', { autoClose: 1000 })
    navigate('/login', { replace: true })
  }

  return (
    <header className="ems-topbar">
      <div className="d-flex align-items-center gap-2">
        <button
          type="button"
          className="btn btn-sm btn-outline-secondary d-lg-none p-1 border-0"
          onClick={onToggleSidebar}
          aria-label="Toggle navigation"
          title="Toggle Navigation"
        >
          <i className="bi bi-list fs-4"></i>
        </button>
        <div className="text-secondary-ems small">{today}</div>
      </div>

      <div className="d-flex align-items-center gap-3">
        {/* Avatar with Dropdown */}
        <div className="user-avatar-wrapper" ref={dropdownRef}>
          <div
            className={`user-avatar-btn ${dropdownOpen ? 'active' : ''}`}
            onClick={() => setDropdownOpen((prev) => !prev)}
            title="Admin Menu"
            aria-expanded={dropdownOpen}
            style={{ padding: 0, overflow: 'hidden' }}
          >
            {profilePicture ? (
              <img
                src={profilePicture}
                alt={displayName}
                className="user-avatar-btn-img"
              />
            ) : (
              getInitials(displayName)
            )}
          </div>

          {dropdownOpen && (
            <div className="avatar-dropdown-menu">
              <button
                type="button"
                className="dropdown-item-custom"
                onClick={handleProfileClick}
              >
                <Profile3DIcon size={18} className="me-2" />
                <span>Profile</span>
              </button>
              <button
                type="button"
                className="dropdown-item-custom text-danger"
                onClick={handleLogout}
              >
                <Logout3DIcon size={18} className="me-2" />
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
