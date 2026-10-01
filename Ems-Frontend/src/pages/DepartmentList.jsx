import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { createDepartment, deleteDepartment, getDepartments, updateDepartment } from '../api/departmentService'
import Loader from '../components/common/Loader'
import EmptyState from '../components/common/EmptyState'
import ConfirmModal from '../components/common/ConfirmModal'
import { Edit3DIcon, Delete3DIcon, StatDepartments3DIcon, AddPlus3DIcon } from '../components/common/Sidebar3DIcons'

const EMPTY_FORM = { name: '', description: '' }

function DepartmentModal({ show, initial, onClose, onSaved }) {
  const [form, setForm] = useState(EMPTY_FORM)
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)
  const isEdit = Boolean(initial)

  useEffect(() => {
    setForm(initial ? { name: initial.name, description: initial.description || '' } : EMPTY_FORM)
    setError('')
  }, [initial, show])

  if (!show) return null

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.name.trim()) {
      setError('Department name is required')
      return
    }
    setSaving(true)
    try {
      if (isEdit) {
        await updateDepartment(initial.id, form)
        toast.success('Department updated')
      } else {
        await createDepartment(form)
        toast.success('Department created')
      }
      onSaved()
    } catch (err) {
      setError(err.message || 'Could not save department')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="modal d-block" tabIndex="-1" style={{ background: 'rgba(15, 20, 35, 0.45)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content" style={{ borderRadius: 'var(--radius-md)', border: 'none' }}>
          <form onSubmit={handleSubmit}>
            <div className="modal-header border-0 pb-0">
              <h5 className="modal-title" style={{ fontSize: '1.1rem' }}>{isEdit ? 'Edit Department' : 'New Department'}</h5>
              <button type="button" className="btn-close" onClick={onClose} disabled={saving}></button>
            </div>
            <div className="modal-body">
              {error && <div className="alert alert-danger py-2 small">{error}</div>}
              <div className="mb-3">
                <label className="form-label">Department Name *</label>
                <input
                  className="form-control"
                  value={form.name}
                  onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                  autoFocus
                />
              </div>
              <div>
                <label className="form-label">Description</label>
                <textarea
                  className="form-control"
                  rows={3}
                  value={form.description}
                  onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
                />
              </div>
            </div>
            <div className="modal-footer border-0">
              <button type="button" className="btn btn-outline-secondary" onClick={onClose} disabled={saving}>Cancel</button>
              <button type="submit" className="btn btn-accent" disabled={saving}>
                {saving ? 'Saving...' : isEdit ? 'Save Changes' : 'Create Department'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default function DepartmentList() {
  const [departments, setDepartments] = useState([])
  const [loading, setLoading] = useState(true)
  const [modalState, setModalState] = useState({ show: false, department: null })
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [deleting, setDeleting] = useState(false)

  function loadDepartments() {
    setLoading(true)
    getDepartments()
      .then(setDepartments)
      .catch((err) => toast.error(err.message || 'Could not load departments'))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    loadDepartments()
  }, [])

  function handleSaved() {
    setModalState({ show: false, department: null })
    loadDepartments()
  }

  async function confirmDelete() {
    if (!deleteTarget) return
    setDeleting(true)
    try {
      await deleteDepartment(deleteTarget.id)
      toast.success(`${deleteTarget.name} deleted`)
      setDeleteTarget(null)
      loadDepartments()
    } catch (err) {
      toast.error(err.message || 'Could not delete department')
    } finally {
      setDeleting(false)
    }
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-start flex-wrap gap-2 mb-4">
        <div>
          <h1 className="page-title">Departments</h1>
          <p className="text-secondary-ems mb-0">Organize your workforce into teams.</p>
        </div>
        <button className="btn btn-accent" onClick={() => setModalState({ show: true, department: null })}>
          <AddPlus3DIcon size={18} className="me-1" /> Add Department
        </button>
      </div>

      {loading ? (
        <Loader label="Loading departments..." />
      ) : departments.length === 0 ? (
        <EmptyState
          icon="bi-diagram-3"
          title="No departments yet"
          message="Create your first department to start organizing employees."
          actionLabel="Add Department"
          onAction={() => setModalState({ show: true, department: null })}
        />
      ) : (
        <div className="row g-3">
          {departments.map((dept) => (
            <div className="col-sm-6 col-lg-4" key={dept.id}>
              <div className="card-flat h-100 d-flex flex-column">
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <div
                    className="d-flex align-items-center justify-content-center"
                    style={{ width: 40, height: 40, borderRadius: 10, background: 'var(--color-accent-soft)', color: 'var(--color-accent-dark)' }}
                  >
                    <StatDepartments3DIcon size={24} />
                  </div>
                  <div className="d-flex gap-1">
                    <button
                      className="btn btn-sm btn-outline-secondary d-inline-flex align-items-center justify-content-center"
                      onClick={() => setModalState({ show: true, department: dept })}
                      title="Edit"
                      style={{ width: 32, height: 32, padding: 0 }}
                    >
                      <Edit3DIcon size={16} />
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger d-inline-flex align-items-center justify-content-center"
                      onClick={() => setDeleteTarget(dept)}
                      title="Delete"
                      style={{ width: 32, height: 32, padding: 0 }}
                    >
                      <Delete3DIcon size={16} />
                    </button>
                  </div>
                </div>
                <h3 style={{ fontSize: '1.02rem' }} className="mb-1">{dept.name}</h3>
                <p className="text-secondary-ems small flex-grow-1">{dept.description || 'No description provided.'}</p>
                <div className="d-flex align-items-center gap-2 pt-2" style={{ borderTop: '1px solid var(--color-border)' }}>
                  <i className="bi bi-people text-muted-soft"></i>
                  <span className="small text-muted-soft">
                    {dept.employeeCount} {Number(dept.employeeCount) === 1 ? 'employee' : 'employees'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <DepartmentModal
        show={modalState.show}
        initial={modalState.department}
        onClose={() => setModalState({ show: false, department: null })}
        onSaved={handleSaved}
      />

      <ConfirmModal
        show={!!deleteTarget}
        title="Delete department?"
        message={deleteTarget ? `This will permanently delete "${deleteTarget.name}". Departments with employees still assigned cannot be deleted.` : ''}
        loading={deleting}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  )
}
