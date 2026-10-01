import axiosClient from './axiosClient'

export function getDashboardStats() {
  return axiosClient.get('/dashboard/stats').then((res) => {
    const data = res.data
    if (data?.recentEmployees) {
      try {
        const map = JSON.parse(localStorage.getItem('ems_employee_photos') || '{}')
        data.recentEmployees = data.recentEmployees.map((emp) => ({
          ...emp,
          profileImage: emp.profileImage || (emp.id && map[emp.id]) || null,
        }))
      } catch (e) {
        // ignore
      }
    }
    return data
  })
}

