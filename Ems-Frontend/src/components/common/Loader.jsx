export default function Loader({ label = 'Loading...' }) {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center py-5 text-secondary-ems">
      <div className="spinner-border" role="status" style={{ color: 'var(--color-accent)' }}>
        <span className="visually-hidden">{label}</span>
      </div>
      <div className="mt-3 small">{label}</div>
    </div>
  )
}
