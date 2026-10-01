export default function StatCard({
  icon,
  label,
  value,
  accentColor = 'var(--color-primary)',
  iconBg,
  iconColor,
  suffix,
}) {
  return (
    <div className="card-flat d-flex flex-row align-items-center gap-3" style={{ minHeight: 92 }}>
      <div className="stat-accent-bar" style={{ backgroundColor: accentColor }}></div>
      <div className="flex-grow-1">
        <div className="section-eyebrow mb-1">{label}</div>
        <div className="d-flex align-items-baseline gap-2">
          <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.7rem', fontWeight: 600, color: 'var(--color-ink)' }}>
            {value}
          </span>
          {suffix && <span className="text-muted-soft small">{suffix}</span>}
        </div>
      </div>
      {icon && (
        <div
          className="d-none d-sm-flex align-items-center justify-content-center flex-shrink-0"
          style={{
            width: 46,
            height: 46,
            borderRadius: 12,
            background: iconBg || 'var(--color-primary-soft)',
            color: iconColor || accentColor,
            fontSize: '1.25rem',
            transition: 'transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)',
          }}
        >
          {typeof icon === 'string' ? <i className={`bi ${icon}`}></i> : icon}
        </div>
      )}
    </div>
  )
}
