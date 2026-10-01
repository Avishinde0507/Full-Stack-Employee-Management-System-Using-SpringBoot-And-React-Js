export function getInitials(firstName = '', lastName = '') {
  const a = firstName.trim().charAt(0)
  const b = lastName.trim().charAt(0)
  return (a + b).toUpperCase() || '?'
}

export function formatCurrency(value) {
  if (value === null || value === undefined || value === '') return '-'
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value)
}

export function formatDate(value) {
  if (!value) return '-'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return date.toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })
}

export function titleCase(value = '') {
  if (!value) return ''
  return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()
}
