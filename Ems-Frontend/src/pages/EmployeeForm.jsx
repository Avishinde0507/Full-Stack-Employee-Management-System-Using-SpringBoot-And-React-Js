import { useEffect, useState, useRef } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { createEmployee, getEmployeeById, updateEmployee } from '../api/employeeService'
import { getDepartments } from '../api/departmentService'
import Loader from '../components/common/Loader'
import { EMPTY_EMPLOYEE_FORM, GENDER_OPTIONS, STATUS_OPTIONS } from '../utils/constants'

export default function EmployeeForm() {
  const { id } = useParams()
  const isEdit = Boolean(id)
  const navigate = useNavigate()
  const fileInputRef = useRef(null)

  const [form, setForm] = useState(EMPTY_EMPLOYEE_FORM)
  const [departments, setDepartments] = useState([])
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(isEdit)
  const [saving, setSaving] = useState(false)
  const [uploadingPhoto, setUploadingPhoto] = useState(false)

  useEffect(() => {
    getDepartments()
      .then(setDepartments)
      .catch(() => toast.error('Could not load departments'))
  }, [])

  useEffect(() => {
    if (!isEdit) return
    getEmployeeById(id)
      .then((data) => {
        setForm({
          firstName: data.firstName || '',
          lastName: data.lastName || '',
          email: data.email || '',
          phoneNumber: data.phoneNumber || '',
          gender: data.gender || '',
          dateOfBirth: data.dateOfBirth || '',
          dateOfJoining: data.dateOfJoining || '',
          designation: data.designation || '',
          salary: data.salary ?? '',
          address: data.address || '',
          status: data.status || 'ACTIVE',
          departmentId: data.departmentId || '',
          profileImage: data.profileImage || '',
        })
      })
      .catch((err) => {
        toast.error(err.message || 'Could not load employee')
        navigate('/employees')
      })
      .finally(() => setLoading(false))
  }, [id, isEdit, navigate])

  function handleChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  function handlePhotoUpload(e) {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      toast.error('Please select a valid image file (PNG, JPG, WEBP, GIF)')
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size must be less than 5MB')
      return
    }

    setUploadingPhoto(true)
    const reader = new FileReader()
    reader.onload = (event) => {
      const base64Data = event.target.result
      handleChange('profileImage', base64Data)
      setUploadingPhoto(false)
      toast.success('Photo uploaded successfully!')
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
    reader.onerror = () => {
      setUploadingPhoto(false)
      toast.error('Failed to process image. Please try again.')
    }
    reader.readAsDataURL(file)
  }

  function handleRemovePhoto() {
    handleChange('profileImage', '')
    if (fileInputRef.current) fileInputRef.current.value = ''
    toast.info('Photo removed')
  }

  function validateClientSide() {
    const next = {}
    if (!form.firstName.trim()) next.firstName = 'First name is required'
    if (!form.lastName.trim()) next.lastName = 'Last name is required'
    if (!form.email.trim()) next.email = 'Email is required'
    if (!form.dateOfJoining) next.dateOfJoining = 'Date of joining is required'
    if (!form.designation.trim()) next.designation = 'Designation is required'
    if (form.salary === '' || Number(form.salary) <= 0) next.salary = 'Enter a valid salary'
    if (!form.departmentId) next.departmentId = 'Please select a department'
    if (form.phoneNumber && !/^[0-9]{10}$/.test(form.phoneNumber)) next.phoneNumber = 'Must be exactly 10 digits'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!validateClientSide()) {
      toast.error('Please fix the highlighted fields')
      return
    }

    const payload = {
      ...form,
      salary: Number(form.salary),
      departmentId: Number(form.departmentId),
      dateOfBirth: form.dateOfBirth || null,
    }

    setSaving(true)
    try {
      if (isEdit) {
        await updateEmployee(id, payload)
        toast.success('Employee updated successfully')
      } else {
        await createEmployee(payload)
        toast.success('Employee added successfully')
      }
      navigate('/employees')
    } catch (err) {
      if (err.fieldErrors) {
        setErrors(err.fieldErrors)
      }
      toast.error(err.message || 'Could not save employee')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <Loader label="Loading employee..." />

  return (
    <div>
      <div className="mb-4">
        <nav className="small text-muted-soft mb-1">
          <Link to="/employees" className="text-muted-soft">Employees</Link> / {isEdit ? 'Edit' : 'New'}
        </nav>
        <h1 className="page-title">{isEdit ? 'Edit Employee' : 'Add Employee'}</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="card-flat mb-3">
          <div className="form-section-title">Personal Information</div>

          {/* Photo Upload Section */}
          <div className="d-flex align-items-center gap-4 mb-4 pb-3 border-bottom flex-wrap">
            <div
              className="position-relative flex-shrink-0"
              style={{ width: '92px', height: '92px', cursor: 'pointer' }}
              onClick={() => fileInputRef.current?.click()}
              title={form.profileImage ? 'Click to change photo' : 'Click to upload photo'}
            >
              {form.profileImage ? (
                <img
                  src={form.profileImage}
                  alt="Employee photo preview"
                  style={{
                    width: '92px',
                    height: '92px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '3px solid #ffffff',
                    boxShadow: '0 4px 14px rgba(20, 33, 61, 0.12)',
                    display: 'block',
                  }}
                />
              ) : (
                <div
                  style={{
                    width: '92px',
                    height: '92px',
                    borderRadius: '50%',
                    backgroundColor: '#f1f4f9',
                    border: '2px dashed #cbd5e1',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#64748b',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <i className="bi bi-camera fs-3"></i>
                  <span style={{ fontSize: '0.68rem', fontWeight: 600, marginTop: '2px' }}>Photo</span>
                </div>
              )}
              <div
                className="position-absolute bottom-0 end-0 text-white rounded-circle d-flex align-items-center justify-content-center shadow-sm"
                style={{
                  width: '28px',
                  height: '28px',
                  border: '2px solid #ffffff',
                  fontSize: '0.75rem',
                  background: 'linear-gradient(135deg, #ea580c 0%, #f97316 100%)',
                }}
              >
                <i className={`bi ${form.profileImage ? 'bi-pencil-fill' : 'bi-plus-lg'}`}></i>
              </div>
            </div>

            <div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png, image/jpeg, image/jpg, image/webp, image/gif"
                className="d-none"
                onChange={handlePhotoUpload}
              />
              <div className="d-flex align-items-center gap-2 mb-1 flex-wrap">
                <button
                  type="button"
                  className="btn btn-outline-secondary btn-sm d-inline-flex align-items-center gap-1"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploadingPhoto}
                >
                  {uploadingPhoto ? (
                    <>
                      <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                      Uploading...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-camera me-1"></i>
                      {form.profileImage ? 'Change Photo' : 'Upload Photo'}
                    </>
                  )}
                </button>
                {form.profileImage && (
                  <button
                    type="button"
                    className="btn btn-outline-danger btn-sm d-inline-flex align-items-center gap-1"
                    onClick={handleRemovePhoto}
                  >
                    <i className="bi bi-trash me-1"></i>
                    Remove
                  </button>
                )}
              </div>
              <p className="text-muted-soft small mb-0">
                JPG, PNG, WEBP, or GIF. Maximum file size: 5MB.
              </p>
            </div>
          </div>

          <div className="row g-3">
            <div className="col-md-4">
              <label className="form-label">First Name *</label>
              <input
                className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                value={form.firstName}
                onChange={(e) => handleChange('firstName', e.target.value)}
              />
              {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
            </div>
            <div className="col-md-4">
              <label className="form-label">Last Name *</label>
              <input
                className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                value={form.lastName}
                onChange={(e) => handleChange('lastName', e.target.value)}
              />
              {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
            </div>
            <div className="col-md-4">
              <label className="form-label">Gender</label>
              <select
                className="form-select"
                value={form.gender}
                onChange={(e) => handleChange('gender', e.target.value)}
              >
                <option value="">Select</option>
                {GENDER_OPTIONS.map((g) => (
                  <option key={g.value} value={g.value}>{g.label}</option>
                ))}
              </select>
            </div>
            <div className="col-md-4">
              <label className="form-label">Date of Birth</label>
              <input
                type="date"
                className={`form-control ${errors.dateOfBirth ? 'is-invalid' : ''}`}
                value={form.dateOfBirth}
                onChange={(e) => handleChange('dateOfBirth', e.target.value)}
                max={new Date().toISOString().split('T')[0]}
              />
              {errors.dateOfBirth && <div className="invalid-feedback">{errors.dateOfBirth}</div>}
            </div>
          </div>
        </div>

        <div className="card-flat mb-3">
          <div className="form-section-title">Job Information</div>
          <div className="row g-3">
            <div className="col-md-4">
              <label className="form-label">Department *</label>
              <select
                className={`form-select ${errors.departmentId ? 'is-invalid' : ''}`}
                value={form.departmentId}
                onChange={(e) => handleChange('departmentId', e.target.value)}
              >
                <option value="">Select department</option>
                {departments.map((d) => (
                  <option key={d.id} value={d.id}>{d.name}</option>
                ))}
              </select>
              {errors.departmentId && <div className="invalid-feedback">{errors.departmentId}</div>}
            </div>
            <div className="col-md-4">
              <label className="form-label">Designation *</label>
              <input
                className={`form-control ${errors.designation ? 'is-invalid' : ''}`}
                placeholder="e.g. Software Engineer"
                value={form.designation}
                onChange={(e) => handleChange('designation', e.target.value)}
              />
              {errors.designation && <div className="invalid-feedback">{errors.designation}</div>}
            </div>
            <div className="col-md-4">
              <label className="form-label">Status</label>
              <select
                className="form-select"
                value={form.status}
                onChange={(e) => handleChange('status', e.target.value)}
              >
                {STATUS_OPTIONS.map((s) => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
            </div>
            <div className="col-md-4">
              <label className="form-label">Date of Joining *</label>
              <input
                type="date"
                className={`form-control ${errors.dateOfJoining ? 'is-invalid' : ''}`}
                value={form.dateOfJoining}
                onChange={(e) => handleChange('dateOfJoining', e.target.value)}
              />
              {errors.dateOfJoining && <div className="invalid-feedback">{errors.dateOfJoining}</div>}
            </div>
            <div className="col-md-4">
              <label className="form-label">Salary (INR) *</label>
              <input
                type="number"
                min="0"
                step="1000"
                className={`form-control ${errors.salary ? 'is-invalid' : ''}`}
                value={form.salary}
                onChange={(e) => handleChange('salary', e.target.value)}
              />
              {errors.salary && <div className="invalid-feedback">{errors.salary}</div>}
            </div>
          </div>
        </div>

        <div className="card-flat mb-4">
          <div className="form-section-title">Contact Information</div>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Email *</label>
              <input
                type="email"
                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                value={form.email}
                onChange={(e) => handleChange('email', e.target.value)}
              />
              {errors.email && <div className="invalid-feedback">{errors.email}</div>}
            </div>
            <div className="col-md-6">
              <label className="form-label">Phone Number</label>
              <input
                className={`form-control ${errors.phoneNumber ? 'is-invalid' : ''}`}
                placeholder="10 digit mobile number"
                value={form.phoneNumber}
                onChange={(e) => handleChange('phoneNumber', e.target.value)}
              />
              {errors.phoneNumber && <div className="invalid-feedback">{errors.phoneNumber}</div>}
            </div>
            <div className="col-12">
              <label className="form-label">Address</label>
              <textarea
                className="form-control"
                rows={2}
                value={form.address}
                onChange={(e) => handleChange('address', e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="d-flex gap-2">
          <button type="submit" className="btn btn-accent" disabled={saving}>
            {saving ? 'Saving...' : isEdit ? 'Save Changes' : 'Add Employee'}
          </button>
          <Link to="/employees" className="btn btn-outline-secondary">Cancel</Link>
        </div>
      </form>
    </div>
  )
}
