import { useCallback, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getEmployees, deleteEmployee, updateEmployee } from '../api/employeeService'
import { getDepartments } from '../api/departmentService'
import Loader from '../components/common/Loader'
import EmptyState from '../components/common/EmptyState'
import Avatar from '../components/common/Avatar'
import StatusBadge from '../components/common/StatusBadge'
import ConfirmModal from '../components/common/ConfirmModal'
import Pagination from '../components/common/Pagination'
import { View3DIcon, Edit3DIcon, Delete3DIcon, AddPlus3DIcon } from '../components/common/Sidebar3DIcons'
import { formatCurrency, formatDate } from '../utils/formatters'
import { PAGE_SIZE_OPTIONS, STATUS_OPTIONS } from '../utils/constants'

const COLUMNS = [
  { key: 'firstName', label: 'Employee', sortable: true },
  { key: 'designation', label: 'Designation', sortable: true },
  { key: 'department', label: 'Department', sortable: false },
  { key: 'dateOfJoining', label: 'Joined', sortable: true },
  { key: 'salary', label: 'Salary', sortable: true },
  { key: 'status', label: 'Status', sortable: true },
  { key: 'actions', label: '', sortable: false },
]

export default function EmployeeList() {
  const navigate = useNavigate()

  const [employees, setEmployees] = useState([])
  const [departments, setDepartments] = useState([])
  const [loading, setLoading] = useState(true)

  const [keyword, setKeyword] = useState('')
  const [keywordInput, setKeywordInput] = useState('')
  const [departmentId, setDepartmentId] = useState('')
  const [status, setStatus] = useState('')
  const [pageSize, setPageSize] = useState(10)
  const [pageNo, setPageNo] = useState(0)
  const [sortBy, setSortBy] = useState('id')
  const [sortDir, setSortDir] = useState('desc')

  const [totalPages, setTotalPages] = useState(0)
  const [totalElements, setTotalElements] = useState(0)

  const [deleteTarget, setDeleteTarget] = useState(null)
  const [deleting, setDeleting] = useState(false)
  const [togglingId, setTogglingId] = useState(null)

  useEffect(() => {
    getDepartments()
      .then(setDepartments)
      .catch(() => {
        /* department filter is optional; ignore failure silently here */
      })
  }, [])

  const loadEmployees = useCallback(() => {
    setLoading(true)
    getEmployees({ pageNo, pageSize, sortBy, sortDir, keyword, departmentId: departmentId || undefined, status: status || undefined })
      .then((data) => {
        setEmployees(data.content)
        setTotalPages(data.totalPages)
        setTotalElements(data.totalElements)
      })
      .catch((err) => {
        toast.error(err.message || 'Could not load employees')
      })
      .finally(() => setLoading(false))
  }, [pageNo, pageSize, sortBy, sortDir, keyword, departmentId, status])

  useEffect(() => {
    loadEmployees()
  }, [loadEmployees])

  function handleSearchSubmit(e) {
    e.preventDefault()
    setPageNo(0)
    setKeyword(keywordInput.trim())
  }

  function handleSort(column) {
    if (!column.sortable) return
    if (sortBy === column.key) {
      setSortDir((prev) => (prev === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortBy(column.key)
      setSortDir('asc')
    }
  }

  function sortIcon(column) {
    if (!column.sortable) return null
    if (sortBy !== column.key) return <i className="bi bi-arrow-down-up text-muted-soft ms-1" style={{ fontSize: '0.7rem' }}></i>
    return <i className={`bi ${sortDir === 'asc' ? 'bi-sort-up' : 'bi-sort-down'} ms-1`} style={{ fontSize: '0.75rem' }}></i>
  }

  async function confirmDelete() {
    if (!deleteTarget) return
    setDeleting(true)
    try {
      await deleteEmployee(deleteTarget.id)
      toast.success(`${deleteTarget.firstName} ${deleteTarget.lastName} was removed`)
      setDeleteTarget(null)
      if (employees.length === 1 && pageNo > 0) {
        setPageNo((prev) => prev - 1)
      } else {
        loadEmployees()
      }
    } catch (err) {
      toast.error(err.message || 'Could not delete employee')
    } finally {
      setDeleting(false)
    }
  }

  const handleToggleStatus = async (emp) => {
    const nextStatus = emp.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE'
    setTogglingId(emp.id)
    try {
      const payload = {
        ...emp,
        status: nextStatus,
        salary: Number(emp.salary),
        departmentId: Number(emp.departmentId),
        dateOfBirth: emp.dateOfBirth || null,
      }
      await updateEmployee(emp.id, payload)
      setEmployees((prev) =>
        prev.map((item) => (item.id === emp.id ? { ...item, status: nextStatus } : item))
      )
      toast.success(`${emp.firstName} ${emp.lastName} is now ${nextStatus === 'ACTIVE' ? 'Active' : 'Inactive'}`)
    } catch (err) {
      toast.error(err.message || 'Failed to update employee status')
    } finally {
      setTogglingId(null)
    }
  }

  const hasFilters = keyword || departmentId || status

  return (
    <div>
      <div className="d-flex justify-content-between align-items-start flex-wrap gap-2 mb-4">
        <div>
          <h1 className="page-title">Employees</h1>
          <p className="text-secondary-ems mb-0">
            {totalElements} {totalElements === 1 ? 'employee' : 'employees'} total
          </p>
        </div>
        <Link to="/employees/new" className="btn btn-accent">
          <AddPlus3DIcon size={18} className="me-1" /> Add Employee
        </Link>
      </div>

      <div className="card-flat mb-3">
        <div className="row g-2 align-items-center">
          <div className="col-md-4">
            <form onSubmit={handleSearchSubmit}>
              <div className="input-group">
                <span className="input-group-text bg-white border-end-0" style={{ borderColor: 'var(--color-border-strong)' }}>
                  <i className="bi bi-search text-muted-soft"></i>
                </span>
                <input
                  type="text"
                  className="form-control border-start-0"
                  placeholder="Search name, email, designation..."
                  value={keywordInput}
                  onChange={(e) => setKeywordInput(e.target.value)}
                />
              </div>
            </form>
          </div>
          <div className="col-6 col-md-3">
            <select
              className="form-select"
              value={departmentId}
              onChange={(e) => {
                setPageNo(0)
                setDepartmentId(e.target.value)
              }}
            >
              <option value="">All Departments</option>
              {departments.map((d) => (
                <option key={d.id} value={d.id}>{d.name}</option>
              ))}
            </select>
          </div>
          <div className="col-6 col-md-2">
            <select
              className="form-select"
              value={status}
              onChange={(e) => {
                setPageNo(0)
                setStatus(e.target.value)
              }}
            >
              <option value="">All Status</option>
              {STATUS_OPTIONS.map((s) => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
          </div>
          <div className="col-6 col-md-2">
            <select
              className="form-select"
              value={pageSize}
              onChange={(e) => {
                setPageNo(0)
                setPageSize(Number(e.target.value))
              }}
            >
              {PAGE_SIZE_OPTIONS.map((size) => (
                <option key={size} value={size}>{size} / page</option>
              ))}
            </select>
          </div>
          <div className="col-6 col-md-1 d-grid">
            {hasFilters && (
              <button
                className="btn btn-outline-secondary btn-sm"
                title="Clear filters"
                onClick={() => {
                  setKeyword('')
                  setKeywordInput('')
                  setDepartmentId('')
                  setStatus('')
                  setPageNo(0)
                }}
              >
                <i className="bi bi-x-lg"></i>
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="card-flat p-0">
        {loading ? (
          <Loader label="Loading employees..." />
        ) : employees.length === 0 ? (
          <EmptyState
            icon="bi-people"
            title={hasFilters ? 'No matching employees' : 'No employees yet'}
            message={hasFilters ? 'Try adjusting your search or filters.' : 'Add your first employee to get started.'}
            actionLabel={hasFilters ? undefined : 'Add Employee'}
            onAction={hasFilters ? undefined : () => navigate('/employees/new')}
          />
        ) : (
          <div className="table-responsive">
            <table className="table table-ems mb-0">
              <thead>
                <tr>
                  {COLUMNS.map((col) => (
                    <th
                      key={col.key}
                      className={col.sortable ? 'table-sortable-th' : ''}
                      onClick={() => handleSort(col)}
                    >
                      {col.label} {sortIcon(col)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {employees.map((emp) => (
                  <tr key={emp.id}>
                    <td>
                      <div className="d-flex align-items-center gap-3">
                        <Avatar firstName={emp.firstName} lastName={emp.lastName} profileImage={emp.profileImage} size={38} />
                        <div className="min-w-0">
                          <div className="fw-medium text-truncate" style={{ maxWidth: 220 }}>
                            <Link to={`/employees/${emp.id}`} className="text-reset">{emp.firstName} {emp.lastName}</Link>
                          </div>
                          <div className="text-muted-soft small text-truncate" style={{ maxWidth: 220 }}>{emp.email}</div>
                        </div>
                      </div>
                    </td>
                    <td>{emp.designation || '-'}</td>
                    <td>
                      {emp.departmentName ? <span className="badge-dept">{emp.departmentName}</span> : '-'}
                    </td>
                    <td>{formatDate(emp.dateOfJoining)}</td>
                    <td>{formatCurrency(emp.salary)}</td>
                    <td>
                      <StatusBadge
                        status={emp.status}
                        onClick={() => handleToggleStatus(emp)}
                        loading={togglingId === emp.id}
                        title={`Click to mark as ${emp.status === 'ACTIVE' ? 'Inactive' : 'Active'}`}
                      />
                    </td>
                    <td>
                      <div className="d-flex gap-1 justify-content-end">
                        <Link
                          to={`/employees/${emp.id}`}
                          className="btn btn-sm btn-outline-primary d-inline-flex align-items-center justify-content-center"
                          title="View"
                          style={{ width: 32, height: 32, padding: 0 }}
                        >
                          <View3DIcon size={16} />
                        </Link>
                        <Link
                          to={`/employees/${emp.id}/edit`}
                          className="btn btn-sm btn-outline-secondary d-inline-flex align-items-center justify-content-center"
                          title="Edit"
                          style={{ width: 32, height: 32, padding: 0 }}
                        >
                          <Edit3DIcon size={16} />
                        </Link>
                        <button
                          className="btn btn-sm btn-outline-danger d-inline-flex align-items-center justify-content-center"
                          title="Delete"
                          onClick={() => setDeleteTarget(emp)}
                          style={{ width: 32, height: 32, padding: 0 }}
                        >
                          <Delete3DIcon size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {!loading && employees.length > 0 && (
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mt-3">
          <div className="text-muted-soft small">
            Page {pageNo + 1} of {totalPages}
          </div>
          <Pagination pageNo={pageNo} totalPages={totalPages} onPageChange={setPageNo} />
        </div>
      )}

      <ConfirmModal
        show={!!deleteTarget}
        title="Delete employee?"
        message={deleteTarget ? `This will permanently remove ${deleteTarget.firstName} ${deleteTarget.lastName} from the system.` : ''}
        confirmLabel="Delete"
        loading={deleting}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  )
}
