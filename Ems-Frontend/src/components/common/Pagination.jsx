export default function Pagination({ pageNo, totalPages, onPageChange }) {
  if (totalPages <= 1) return null

  const pages = []
  const maxButtons = 5
  let start = Math.max(0, pageNo - Math.floor(maxButtons / 2))
  let end = Math.min(totalPages, start + maxButtons)
  if (end - start < maxButtons) {
    start = Math.max(0, end - maxButtons)
  }
  for (let i = start; i < end; i++) pages.push(i)

  return (
    <nav aria-label="Employee list pagination">
      <ul className="pagination pagination-sm mb-0">
        <li className={`page-item ${pageNo === 0 ? 'disabled' : ''}`}>
          <button className="page-link" onClick={() => onPageChange(pageNo - 1)} aria-label="Previous page">
            <i className="bi bi-chevron-left"></i>
          </button>
        </li>
        {start > 0 && (
          <li className="page-item disabled d-none d-sm-block">
            <span className="page-link border-0">...</span>
          </li>
        )}
        {pages.map((p) => (
          <li key={p} className={`page-item ${p === pageNo ? 'active' : ''}`}>
            <button
              className="page-link"
              onClick={() => onPageChange(p)}
              style={p === pageNo ? { background: 'linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%)', borderColor: '#1d4ed8', color: '#ffffff', boxShadow: '0 2px 6px rgba(37, 99, 235, 0.3)' } : {}}
            >
              {p + 1}
            </button>
          </li>
        ))}
        {end < totalPages && (
          <li className="page-item disabled d-none d-sm-block">
            <span className="page-link border-0">...</span>
          </li>
        )}
        <li className={`page-item ${pageNo >= totalPages - 1 ? 'disabled' : ''}`}>
          <button className="page-link" onClick={() => onPageChange(pageNo + 1)} aria-label="Next page">
            <i className="bi bi-chevron-right"></i>
          </button>
        </li>
      </ul>
    </nav>
  )
}
