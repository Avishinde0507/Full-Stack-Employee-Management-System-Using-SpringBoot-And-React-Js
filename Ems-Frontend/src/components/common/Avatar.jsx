import { getInitials } from '../../utils/formatters'

export default function Avatar({ firstName, lastName, profileImage, size = 40 }) {
  if (profileImage) {
    return (
      <img
        src={profileImage}
        alt={`${firstName || ''} ${lastName || ''}`.trim() || 'Avatar'}
        className="avatar-circle"
        style={{
          width: size,
          height: size,
          objectFit: 'cover',
          display: 'inline-block',
          borderRadius: '50%',
          flexShrink: 0,
        }}
      />
    )
  }

  return (
    <div
      className="avatar-circle"
      style={{ width: size, height: size, fontSize: size * 0.38, flexShrink: 0 }}
    >
      {getInitials(firstName, lastName)}
    </div>
  )
}

