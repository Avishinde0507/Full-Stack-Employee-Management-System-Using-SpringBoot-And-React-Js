export const GENDER_OPTIONS = [
  { value: 'MALE', label: 'Male' },
  { value: 'FEMALE', label: 'Female' },
  { value: 'OTHER', label: 'Other' },
]

export const STATUS_OPTIONS = [
  { value: 'ACTIVE', label: 'Active' },
  { value: 'INACTIVE', label: 'Inactive' },
]

export const PAGE_SIZE_OPTIONS = [5, 10, 20, 50]

export const CHART_COLORS = ['#2563eb', '#f97316', '#0284c7', '#fb923c', '#1d4ed8', '#ea580c']

export const EMPTY_EMPLOYEE_FORM = {
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  gender: '',
  dateOfBirth: '',
  dateOfJoining: '',
  designation: '',
  salary: '',
  address: '',
  status: 'ACTIVE',
  departmentId: '',
  profileImage: '',
}
