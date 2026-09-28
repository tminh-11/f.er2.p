import { useState } from 'react'

const LABELS = ['', 'Rất tệ', 'Tệ', 'Bình thường', 'Tốt', 'Tuyệt vời']

function StarRating({ value, onChange, max = 5 }) {
  const [hovered, setHovered] = useState(0)
  const display = hovered || value
  const stars = Array.from({ length: max }, (_, index) => index + 1)

  return (
    <div
      className="star-rating"
      onMouseLeave={() => setHovered(0)}
      aria-label="Chọn số sao"
    >
      <div className="star-rating-buttons" role="group" aria-label="Đánh giá sao">
        {stars.map((star) => (
          <button
            className={`star-button${star <= display ? ' is-active' : ''}`}
            key={star}
            type="button"
            aria-label={`${star} sao`}
            aria-pressed={value === star}
            onMouseEnter={() => setHovered(star)}
            onFocus={() => setHovered(star)}
            onBlur={() => setHovered(0)}
            onClick={() => onChange(star === value ? 0 : star)}
          >
            ★
          </button>
        ))}
      </div>
      <span className="star-rating-label">
        {LABELS[display] || 'Chưa đánh giá'}
      </span>
    </div>
  )
}

export default StarRating