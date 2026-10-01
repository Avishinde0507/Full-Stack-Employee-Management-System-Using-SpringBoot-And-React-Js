import axiosClient from './axiosClient'

const RESOURCE = '/employees'
const PHOTO_STORAGE_KEY = 'ems_employee_photos'

function getPhotoMap() {
  try {
    return JSON.parse(localStorage.getItem(PHOTO_STORAGE_KEY) || '{}')
  } catch {
    return {}
  }
}

function getStoredPhoto(id, email) {
  const map = getPhotoMap()
  return (id && map[id]) || (email && map[email]) || null
}

function setStoredPhoto(id, email, photo) {
  try {
    const map = getPhotoMap()
    if (photo) {
      if (id) map[id] = photo
      if (email) map[email] = photo
    } else {
      if (id) delete map[id]
      if (email) delete map[email]
    }
    localStorage.setItem(PHOTO_STORAGE_KEY, JSON.stringify(map))
  } catch (e) {
    console.warn('Could not save photo to localStorage', e)
  }
}

export function getEmployees({ pageNo = 0, pageSize = 10, sortBy = 'id', sortDir = 'asc', keyword, departmentId, status } = {}) {
  return axiosClient
    .get(RESOURCE, {
      params: { pageNo, pageSize, sortBy, sortDir, keyword, departmentId, status },
    })
    .then((res) => {
      if (res.data?.content) {
        res.data.content = res.data.content.map((emp) => ({
          ...emp,
          profileImage: emp.profileImage || getStoredPhoto(emp.id, emp.email),
        }))
      }
      return res.data
    })
}

export function getEmployeeById(id) {
  return axiosClient.get(`${RESOURCE}/${id}`).then((res) => {
    const emp = res.data
    emp.profileImage = emp.profileImage || getStoredPhoto(emp.id, emp.email)
    return emp
  })
}

export function createEmployee(payload) {
  return axiosClient.post(RESOURCE, payload).then((res) => {
    const saved = res.data
    if (payload.profileImage) {
      setStoredPhoto(saved.id, saved.email, payload.profileImage)
      saved.profileImage = payload.profileImage
    }
    return saved
  })
}

export function updateEmployee(id, payload) {
  return axiosClient.put(`${RESOURCE}/${id}`, payload).then((res) => {
    const saved = res.data
    if (payload.profileImage !== undefined) {
      setStoredPhoto(id, payload.email, payload.profileImage)
      saved.profileImage = payload.profileImage
    }
    return saved
  })
}

export function deleteEmployee(id) {
  return axiosClient.delete(`${RESOURCE}/${id}`).then((res) => {
    setStoredPhoto(id, null, null)
    return res.data
  })
}

