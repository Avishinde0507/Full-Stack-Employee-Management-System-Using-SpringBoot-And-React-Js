import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { deleteEmployee, getEmployeeById, updateEmployee } from '../api/employeeService'
import Loader from '../components/common/Loader'
import Avatar from '../components/common/Avatar'
import StatusBadge from '../components/common/StatusBadge'
import ConfirmModal from '../components/common/ConfirmModal'
import { Edit3DIcon, Delete3DIcon } from '../components/common/Sidebar3DIcons'
import { formatCurrency, formatDate, titleCase } from '../utils/formatters'

function InfoRow({ icon, label, value }) {
  return (
    <div className="d-flex align-items-start gap-3 py-2">
      <div className="text-muted-soft" style={{ width: 22 }}>
        <i className={`bi ${icon}`}></i>
      </div>
      <div>
        <div className="text-muted-soft" style={{ fontSize: '0.75rem' }}>{label}</div>
        <div style={{ fontSize: '0.92rem' }}>{value || '-'}</div>
      </div>
    </div>
  )
}

export default function EmployeeDetails() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [employee, setEmployee] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showDelete, setShowDelete] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [togglingStatus, setTogglingStatus] = useState(false)

  useEffect(() => {
    setLoading(true)
    getEmployeeById(id)
      .then(setEmployee)
      .catch((err) => {
        toast.error(err.message || 'Employee not found')
        navigate('/employees')
      })
      .finally(() => setLoading(false))
  }, [id, navigate])

  async function handleDelete() {
    setDeleting(true)
    try {
      await deleteEmployee(id)
      toast.success('Employee deleted')
      navigate('/employees')
    } catch (err) {
      toast.error(err.message || 'Could not delete employee')
      setDeleting(false)
    }
  }

  async function handleToggleStatus() {
    if (!employee) return
    const nextStatus = employee.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE'
    setTogglingStatus(true)
    try {
      const payload = {
        ...employee,
        status: nextStatus,
        salary: Number(employee.salary),
        departmentId: Number(employee.departmentId),
        dateOfBirth: employee.dateOfBirth || null,
      }
      await updateEmployee(employee.id, payload)
      setEmployee((prev) => ({ ...prev, status: nextStatus }))
      toast.success(`${employee.firstName} ${employee.lastName} is now ${nextStatus === 'ACTIVE' ? 'Active' : 'Inactive'}`)
    } catch (err) {
      toast.error(err.message || 'Could not update employee status')
    } finally {
      setTogglingStatus(false)
    }
  }

  if (loading) return <Loader label="Loading employee..." />
  if (!employee) return null

  return (
    <div>
      <nav className="small text-muted-soft mb-1">
        <Link to="/employees" className="text-muted-soft">Employees</Link> / {employee.firstName} {employee.lastName}
      </nav>

      <div className="row g-3 mt-1">
        <div className="col-lg-4">
          <div className="card-flat text-center">
            <div className="d-flex justify-content-center mb-3">
              <Avatar firstName={employee.firstName} lastName={employee.lastName} profileImage={employee.profileImage} size={72} />
            </div>
            <h2 style={{ fontSize: '1.2rem' }} className="mb-0">{employee.firstName} {employee.lastName}</h2>
            <div className="text-secondary-ems mb-2">{employee.designation}</div>
            <div className="d-flex justify-content-center gap-2 mb-3">
              {employee.departmentName && <span className="badge-dept">{employee.departmentName}</span>}
              <StatusBadge
                status={employee.status}
                onClick={handleToggleStatus}
                loading={togglingStatus}
                title={`Click to mark as ${employee.status === 'ACTIVE' ? 'Inactive' : 'Active'}`}
              />
            </div>
            <div className="d-flex gap-2 justify-content-center">
              <Link to={`/employees/${id}/edit`} className="btn btn-accent btn-sm d-inline-flex align-items-center">
                <Edit3DIcon size={15} className="me-1" /> Edit
              </Link>
              <button className="btn btn-outline-danger btn-sm d-inline-flex align-items-center" onClick={() => setShowDelete(true)}>
                <Delete3DIcon size={15} className="me-1" /> Delete
              </button>
            </div>
          </div>
        </div>

        <div className="col-lg-8">
          <div className="card-flat mb-3">
            <div className="form-section-title">Contact Information</div>
            <div className="row">
              <div className="col-sm-6">
                <InfoRow icon="bi-envelope" label="Email" value={employee.email} />
              </div>
              <div className="col-sm-6">
                <InfoRow icon="bi-telephone" label="Phone" value={employee.phoneNumber} />
              </div>
              <div className="col-12">
                <InfoRow icon="bi-geo-alt" label="Address" value={employee.address} />
              </div>
            </div>
          </div>

          <div className="card-flat">
            <div className="form-section-title">Employment Details</div>
            <div className="row">
              <div className="col-sm-6">
                <InfoRow icon="bi-diagram-3" label="Department" value={employee.departmentName} />
              </div>
              <div className="col-sm-6">
                <InfoRow icon="bi-briefcase" label="Designation" value={employee.designation} />
              </div>
              <div className="col-sm-6">
                <InfoRow icon="bi-calendar-event" label="Date of Joining" value={formatDate(employee.dateOfJoining)} />
              </div>
              <div className="col-sm-6">
                <InfoRow icon="bi-cash-stack" label="Salary" value={formatCurrency(employee.salary)} />
              </div>
              <div className="col-sm-6">
                <InfoRow icon="bi-person" label="Gender" value={titleCase(employee.gender)} />
              </div>
              <div className="col-sm-6">
                <InfoRow icon="bi-cake2" label="Date of Birth" value={formatDate(employee.dateOfBirth)} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <ConfirmModal
        show={showDelete}
        title="Delete employee?"
        message={`This will permanently remove ${employee.firstName} ${employee.lastName} from the system.`}
        loading={deleting}
        onConfirm={handleDelete}
        onCancel={() => setShowDelete(false)}
      />
    </div>
  )
}
