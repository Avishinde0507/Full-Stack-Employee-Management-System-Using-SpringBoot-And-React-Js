import axiosClient from './axiosClient'

const RESOURCE = '/departments'

export function getDepartments() {
  return axiosClient.get(RESOURCE).then((res) => res.data)
}

export function getDepartmentById(id) {
  return axiosClient.get(`${RESOURCE}/${id}`).then((res) => res.data)
}

export function createDepartment(payload) {
  return axiosClient.post(RESOURCE, payload).then((res) => res.data)
}

export function updateDepartment(id, payload) {
  return axiosClient.put(`${RESOURCE}/${id}`, payload).then((res) => res.data)
}

export function deleteDepartment(id) {
  return axiosClient.delete(`${RESOURCE}/${id}`).then((res) => res.data)
}
