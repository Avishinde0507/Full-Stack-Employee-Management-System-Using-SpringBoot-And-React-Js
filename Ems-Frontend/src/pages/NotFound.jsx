import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center text-center py-5">
      <div style={{ fontFamily: 'var(--font-display)', fontSize: '3rem', fontWeight: 700, color: 'var(--color-ink)' }}>
        404
      </div>
      <h2 style={{ fontSize: '1.1rem' }}>Page not found</h2>
      <p className="text-secondary-ems" style={{ maxWidth: 360 }}>
        The page you're looking for doesn't exist or may have been moved.
      </p>
      <Link to="/" className="btn btn-accent mt-2">
        Back to Dashboard
      </Link>
    </div>
  )
}
