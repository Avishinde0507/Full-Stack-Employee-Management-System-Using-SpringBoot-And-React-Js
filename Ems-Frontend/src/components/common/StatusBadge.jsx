import { StatActive3DIcon, StatInactive3DIcon } from './Sidebar3DIcons'

export default function StatusBadge({ status, onClick, loading = false, title }) {
  const isActive = String(status).toUpperCase() === 'ACTIVE'
  const isClickable = typeof onClick === 'function'

  const content = (
    <>
      {loading ? (
        <span
          className="spinner-border spinner-border-sm"
          style={{ width: '0.75rem', height: '0.75rem', borderWidth: '2px' }}
          role="status"
          aria-hidden="true"
        />
      ) : (
        isActive
          ? <StatActive3DIcon size={14} />
          : <StatInactive3DIcon size={14} />
      )}
      <span>{isActive ? 'Active' : 'Inactive'}</span>
    </>
  )

  if (isClickable) {
    return (
      <button
        type="button"
        className={`badge-status badge-status-btn ${isActive ? 'badge-active' : 'badge-inactive'}`}
        onClick={(e) => {
          e.stopPropagation()
          onClick(e)
        }}
        disabled={loading}
        title={title || `Click to mark as ${isActive ? 'Inactive' : 'Active'}`}
        style={{
          border: 'none',
          cursor: loading ? 'not-allowed' : 'pointer',
          outline: 'none',
        }}
      >
        {content}
      </button>
    )
  }

  return (
    <span className={`badge-status ${isActive ? 'badge-active' : 'badge-inactive'}`} title={title}>
      {content}
    </span>
  )
}

