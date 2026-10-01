import { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Topbar from './Topbar'
import '../../App.css'

export default function AppLayout() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleToggle = () => {
    if (window.innerWidth <= 991) {
      setMobileOpen((prev) => !prev)
    } else {
      setIsCollapsed((prev) => !prev)
    }
  }

  const handleClose = () => {
    if (window.innerWidth <= 991) {
      setMobileOpen(false)
    } else {
      setIsCollapsed(true)
    }
  }

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 991) {
        setMobileOpen(false)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div
      className={`app-shell ${
        isCollapsed ? 'sidebar-collapsed' : 'sidebar-expanded'
      } ${mobileOpen ? 'mobile-sidebar-open' : ''}`}
    >
      <Sidebar
        collapsed={isCollapsed}
        mobileOpen={mobileOpen}
        onToggleCollapse={() => setIsCollapsed((prev) => !prev)}
        onClose={handleClose}
        onNavigate={() => {
          if (window.innerWidth <= 991) {
            setMobileOpen(false)
          }
        }}
      />
      <div
        className={`ems-sidebar-backdrop ${mobileOpen ? 'open' : ''}`}
        onClick={() => setMobileOpen(false)}
      ></div>

      <div className="ems-main">
        <Topbar
          isCollapsed={isCollapsed}
          mobileOpen={mobileOpen}
          onToggleSidebar={handleToggle}
        />
        <main className="ems-content">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
