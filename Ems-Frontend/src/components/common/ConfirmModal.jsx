export default function ConfirmModal({
  show,
  title = 'Are you sure?',
  message,
  confirmLabel = 'Delete',
  cancelLabel = 'Cancel',
  danger = true,
  onConfirm,
  onCancel,
  loading = false,
}) {
  if (!show) return null

  return (
    <>
      <div className="modal d-block" tabIndex="-1" role="dialog" style={{ background: 'rgba(15, 20, 35, 0.45)' }}>
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content" style={{ borderRadius: 'var(--radius-md)', border: 'none' }}>
            <div className="modal-header border-0 pb-0">
              <h5 className="modal-title" style={{ fontSize: '1.1rem' }}>{title}</h5>
              <button type="button" className="btn-close" onClick={onCancel} aria-label="Close" disabled={loading}></button>
            </div>
            <div className="modal-body pt-2">
              <p className="text-secondary-ems mb-0">{message}</p>
            </div>
            <div className="modal-footer border-0">
              <button type="button" className="btn btn-outline-secondary" onClick={onCancel} disabled={loading}>
                {cancelLabel}
              </button>
              <button
                type="button"
                className={danger ? 'btn btn-danger' : 'btn btn-accent'}
                onClick={onConfirm}
                disabled={loading}
              >
                {loading ? 'Please wait...' : confirmLabel}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
