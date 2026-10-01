import { NavLink, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useAuth } from '../../context/AuthContext'
import emsLogo from '../../assets/ems-logo.png'
import { Dashboard3DIcon, Employees3DIcon, Departments3DIcon, Logout3DIcon, EmsLogo3DIcon, Chevron3DIcon } from '../common/Sidebar3DIcons'

const NAV_ITEMS = [
  { to: '/', label: 'Dashboard', IconComponent: Dashboard3DIcon, end: true },
  { to: '/employees', label: 'Employees', IconComponent: Employees3DIcon },
  { to: '/departments', label: 'Departments', IconComponent: Departments3DIcon },
]

export default function Sidebar({ collapsed, mobileOpen, onToggleCollapse, onClose, onNavigate }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    toast.info('Logged out successfully')
    navigate('/login', { replace: true })
    if (onNavigate) onNavigate()
  }

  return (
    <aside
      className={`ems-sidebar ${collapsed ? 'collapsed' : 'expanded'} ${
        mobileOpen ? 'mobile-open' : ''
      }`}
    >
      {/* Top Header - Logo & Brand only */}
      <div className="ems-sidebar-brand">
        <div className="ems-sidebar-brand-content">
          <div className="ems-sidebar-brand-mark" title="EMS - Employee Management">
            <EmsLogo3DIcon size={36} />
          </div>
          {!collapsed && (
            <div className="ems-sidebar-brand-text-wrap">
              <div className="ems-sidebar-brand-text">EMS</div>
              <div className="ems-sidebar-brand-sub">Employee Management</div>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="ems-sidebar-nav">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) => `ems-nav-link ${isActive ? 'active' : ''}`}
            onClick={onNavigate}
            title={collapsed ? item.label : undefined}
          >
            <span className="ems-nav-icon-wrap">
              <item.IconComponent size={collapsed ? 24 : 22} />
            </span>
            {!collapsed && <span className="ems-nav-text">{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Bottom Container: Arrow Toggle Button + User Footer */}
      <div className="ems-sidebar-footer-container">
        {/* Bottom Arrow Toggle Button */}
        <div className="ems-sidebar-bottom-toggle">
          <button
            type="button"
            className="ems-bottom-collapse-btn"
            onClick={onToggleCollapse}
            title={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
            aria-label={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            <Chevron3DIcon direction={collapsed ? 'right' : 'left'} size={15} />
          </button>
        </div>

        {/* User Info & Sign Out */}
        <div className="ems-sidebar-footer">
          <div className="d-flex align-items-center justify-content-between footer-user-row">
            <div className="d-flex align-items-center gap-2 overflow-hidden">
              <div
                className="avatar-circle"
                style={{ width: 28, height: 28, fontSize: 11, background: 'linear-gradient(135deg, #2563eb, #f97316)', color: '#ffffff', overflow: 'hidden', padding: 0 }}
                title={user?.fullName || 'Avishkar Shinde'}
              >
                {user?.profilePicture ? (
                  <img
                    src={user.profilePicture}
                    alt={user?.fullName || 'Admin'}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  (user?.fullName || 'Avishkar Shinde').charAt(0).toUpperCase()
                )}
              </div>
              {!collapsed && (
                <div className="text-truncate ems-footer-username" style={{ fontSize: '0.78rem', color: '#e0fafa' }}>
                  {user?.fullName || 'Avishkar Shinde'}
                </div>
              )}
            </div>
            <button
              onClick={handleLogout}
              className="btn btn-link p-0 text-decoration-none ems-logout-btn"
              title="Sign out"
              style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <Logout3DIcon size={20} />
            </button>
          </div>
        </div>
      </div>
    </aside>
  )
}
