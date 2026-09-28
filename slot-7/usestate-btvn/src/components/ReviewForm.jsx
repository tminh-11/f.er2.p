import { useState } from 'react'
import { Button, Card, Form } from 'react-bootstrap'
import StarRating from './StarRating.jsx'

function ReviewForm() {
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [reviews, setReviews] = useState([])

  const canSubmit = rating > 0 && comment.trim().length >= 5
  const average = reviews.length
    ? (
        reviews.reduce((sum, review) => sum + review.rating, 0) /
        reviews.length
      ).toFixed(1)
    : '0.0'

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!canSubmit) return

    setReviews((previous) => [
      {
        id: Date.now(),
        rating,
        comment: comment.trim(),
      },
      ...previous,
    ])
    setRating(0)
    setComment('')
  }

  return (
    <main className="review-page">
      <section className="review-shell" aria-labelledby="review-title">
        <div className="review-eyebrow">REACT · CONTROLLED COMPONENT</div>
        <div className="review-heading-row">
          <div>
            <h2 id="review-title">Đánh giá trải nghiệm</h2>
            <p className="review-intro">Chia sẻ cảm nhận của bạn.</p>
          </div>
          <p className="review-average" aria-live="polite">
            Trung bình <strong>{average}/5</strong>
            <span>({reviews.length} lượt)</span>
          </p>
        </div>

        <Card className="review-form-card">
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Điểm đánh giá</Form.Label>
                <StarRating value={rating} onChange={setRating} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="review-comment">
                <Form.Label>Nhận xét</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={comment}
                  onChange={(event) => setComment(event.target.value)}
                  placeholder="Viết ít nhất 5 ký tự..."
                  aria-describedby="review-comment-hint"
                />
                <Form.Text id="review-comment-hint">
                  {comment.trim().length}/5 ký tự tối thiểu
                </Form.Text>
              </Form.Group>
              <Button type="submit" disabled={!canSubmit}>
                Gửi đánh giá
              </Button>
            </Form>
          </Card.Body>
        </Card>

        {reviews.length > 0 && (
          <div className="review-list" aria-label="Danh sách đánh giá">
            {reviews.map((review) => (
              <article className="review-item" key={review.id}>
                <div
                  className="review-item-stars"
                  aria-label={`${review.rating} trên 5 sao`}
                >
                  <span>{'★'.repeat(review.rating)}</span>
                  <span className="review-stars-empty">
                    {'★'.repeat(5 - review.rating)}
                  </span>
                </div>
                <p>{review.comment}</p>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}

export default ReviewForm