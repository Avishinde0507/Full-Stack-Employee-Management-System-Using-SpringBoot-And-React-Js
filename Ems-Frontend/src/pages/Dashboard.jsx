import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { toast } from 'react-toastify'
import { getDashboardStats } from '../api/dashboardService'
import StatCard from '../components/common/StatCard'
import {
  StatEmployees3DIcon,
  StatDepartments3DIcon,
  StatActive3DIcon,
  StatInactive3DIcon,
  ViewAll3DIcon,
} from '../components/common/Sidebar3DIcons'
import Loader from '../components/common/Loader'
import EmptyState from '../components/common/EmptyState'
import Avatar from '../components/common/Avatar'
import StatusBadge from '../components/common/StatusBadge'
import { formatDate } from '../utils/formatters'
import { CHART_COLORS } from '../utils/constants'

export default function Dashboard() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isMounted = true
    getDashboardStats()
      .then((data) => {
        if (isMounted) setStats(data)
      })
      .catch((err) => {
        toast.error(err.message || 'Could not load dashboard stats')
      })
      .finally(() => {
        if (isMounted) setLoading(false)
      })
    return () => {
      isMounted = false
    }
  }, [])

  if (loading) return <Loader label="Loading dashboard..." />

  if (!stats) {
    return (
      <EmptyState
        icon="bi-bar-chart"
        title="Dashboard unavailable"
        message="We couldn't reach the backend. Make sure the Spring Boot API is running on port 8080."
      />
    )
  }

  const chartData = (stats.departmentWiseCount || []).map((d) => ({
    name: d.departmentName,
    count: d.employeeCount,
  }))

  return (
    <div>
      <div className="mb-4">
        <h1 className="page-title">Dashboard</h1>
        <p className="text-secondary-ems mb-0">A quick overview of your workforce.</p>
      </div>

      <div className="row g-3 mb-4">
        <div className="col-sm-6 col-xl-3">
          <StatCard
            icon={<StatEmployees3DIcon size={28} />}
            label="Total Employees"
            value={stats.totalEmployees}
            accentColor="#2563eb"
            iconBg="#eff6ff"
            iconColor="#2563eb"
          />
        </div>
        <div className="col-sm-6 col-xl-3">
          <StatCard
            icon={<StatDepartments3DIcon size={28} />}
            label="Departments"
            value={stats.totalDepartments}
            accentColor="#f97316"
            iconBg="#fff7ed"
            iconColor="#ea580c"
          />
        </div>
        <div className="col-sm-6 col-xl-3">
          <StatCard
            icon={<StatActive3DIcon size={28} />}
            label="Active"
            value={stats.activeEmployees}
            accentColor="#10b981"
            iconBg="#ecfdf5"
            iconColor="#059669"
          />
        </div>
        <div className="col-sm-6 col-xl-3">
          <StatCard
            icon={<StatInactive3DIcon size={28} />}
            label="Inactive"
            value={stats.inactiveEmployees}
            accentColor="#ef4444"
            iconBg="#fef2f2"
            iconColor="#ef4444"
          />
        </div>
      </div>

      <div className="row g-3">
        <div className="col-lg-7">
          <div className="card-flat h-100">
            <h2 style={{ fontSize: '1rem' }} className="mb-3">Employees by Department</h2>
            {chartData.length === 0 ? (
              <EmptyState icon="bi-diagram-3" title="No departments yet" message="Add a department to see the breakdown here." />
            ) : (
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={chartData} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#64748b' }} axisLine={{ stroke: '#e2e8f0' }} tickLine={false} />
                  <YAxis allowDecimals={false} tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} />
                  <Tooltip
                    cursor={{ fill: 'rgba(37, 99, 235, 0.05)' }}
                    contentStyle={{ borderRadius: 8, border: '1px solid #bfdbfe', boxShadow: '0 4px 12px rgba(37, 99, 235, 0.1)', fontSize: 13 }}
                  />
                  <Bar dataKey="count" name="Employees" radius={[6, 6, 0, 0]} maxBarSize={48}>
                    {chartData.map((_, index) => (
                      <Cell key={index} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        <div className="col-lg-5">
          <div className="card-flat h-100">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h2 style={{ fontSize: '1rem' }} className="mb-0">Recently Joined</h2>
              <Link to="/employees" className="small" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}><ViewAll3DIcon size={16} /> View all</Link>
            </div>
            {(!stats.recentEmployees || stats.recentEmployees.length === 0) ? (
              <EmptyState icon="bi-person-plus" title="No employees yet" message="New hires will show up here." />
            ) : (
              <div className="d-flex flex-column gap-3">
                {stats.recentEmployees.map((emp) => (
                  <div key={emp.id} className="d-flex align-items-center gap-3">
                    <Avatar firstName={emp.firstName} lastName={emp.lastName} profileImage={emp.profileImage} size={38} />
                    <div className="flex-grow-1 min-w-0">
                      <div className="fw-medium text-truncate" style={{ fontSize: '0.9rem' }}>
                        <Link to={`/employees/${emp.id}`} className="text-reset">{emp.firstName} {emp.lastName}</Link>
                      </div>
                      <div className="text-muted-soft small text-truncate">{emp.designation} &middot; {emp.departmentName}</div>
                    </div>
                    <div className="text-end flex-shrink-0">
                      <div className="text-muted-soft small mb-1">{formatDate(emp.dateOfJoining)}</div>
                      <StatusBadge status={emp.status} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
