export default function EmptyState({ icon = 'bi-inbox', title = 'Nothing here yet', message, actionLabel, onAction }) {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center text-center py-5">
      <div
        className="d-flex align-items-center justify-content-center mb-3"
        style={{ width: 56, height: 56, borderRadius: '50%', background: 'var(--color-accent-soft)', color: 'var(--color-accent-ink)', fontSize: '1.5rem' }}
      >
        <i className={`bi ${icon}`}></i>
      </div>
      <h3 style={{ fontSize: '1.05rem' }}>{title}</h3>
      {message && <p className="text-secondary-ems" style={{ maxWidth: 360 }}>{message}</p>}
      {actionLabel && onAction && (
        <button className="btn btn-accent mt-2" onClick={onAction}>
          {actionLabel}
        </button>
      )}
    </div>
  )
}
