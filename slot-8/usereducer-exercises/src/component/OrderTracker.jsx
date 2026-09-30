import { useReducer } from 'react'
import { Alert, Badge, Button, Card, Col, Container, Form, ListGroup, Row } from 'react-bootstrap'
import { EVENT_LABELS, initialState, STATUS_INFO, TRANSITIONS } from '../data/orderData'

function orderReducer(state, action) {
  switch (action.type) {
    case 'SET_REASON':
      return { ...state, cancelReason: action.payload, error: '' }
    case 'RESET':
      return initialState
    default: {
      const next = TRANSITIONS[state.status][action.type]

      if (!next) {
        return {
          ...state,
          error: `Không thể "${action.type}" khi đơn đang "${STATUS_INFO[state.status].label}"`,
        }
      }

      if (action.type === 'CANCEL' && state.cancelReason.trim().length < 5) {
        return { ...state, error: 'Nhập lý do hủy (ít nhất 5 ký tự)' }
      }

      return {
        ...state,
        status: next,
        error: '',
        timeline: [...state.timeline, { status: next, at: action.at }],
      }
    }
  }
}

const now = () =>
  new Intl.DateTimeFormat('vi-VN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(new Date())

function OrderTracker() {
  const [state, dispatch] = useReducer(orderReducer, initialState)
  const { status, cancelReason, error, timeline } = state
  const allowedEvents = Object.keys(TRANSITIONS[status])
  const isFinal = allowedEvents.length === 0

  return (
    <main className="order-page">
      <Container className="order-layout d-flex align-items-center justify-content-center">
        <Card className="order-card w-100">
          <Card.Body>
            <header className="order-header">
              <div>
                <p className="order-eyebrow">Theo dõi trạng thái</p>
                <h1 className="order-title">Đơn hàng #DH1024</h1>
              </div>
              <Badge
                bg={STATUS_INFO[status].variant}
                className={`order-status order-status-${status}`}
              >
                {STATUS_INFO[status].label}
              </Badge>
            </header>

            {error && (
              <Alert className="order-alert" variant="danger" role="alert">
                {error}
              </Alert>
            )}

            <section className="order-events" aria-label="Sự kiện đơn hàng">
              <Row xs={2} className="g-2">
                {Object.keys(EVENT_LABELS).map((event) => (
                  <Col key={event}>
                    <Button
                      className="order-event-button w-100"
                      variant={event === 'CANCEL' ? 'outline-danger' : 'outline-success'}
                      type="button"
                      disabled={!allowedEvents.includes(event)}
                      onClick={() => dispatch({ type: event, at: now() })}
                    >
                      {EVENT_LABELS[event]}
                    </Button>
                  </Col>
                ))}
              </Row>
            </section>

            {allowedEvents.includes('CANCEL') && (
              <Form.Group className="order-reason" controlId="cancel-reason">
                <Form.Label>Lý do hủy</Form.Label>
                <Form.Control
                  type="text"
                  value={cancelReason}
                  placeholder="Nhập lý do, tối thiểu 5 ký tự"
                  onChange={(event) =>
                    dispatch({ type: 'SET_REASON', payload: event.target.value })
                  }
                />
              </Form.Group>
            )}

            <div className="order-test-action">
              <Button
                variant="danger"
                type="button"
                onClick={() => dispatch({ type: 'SHIP', at: now() })}
              >
                Thử gửi SHIP
              </Button>
              <span>Thử sự kiện không hợp lệ để xem reducer từ chối</span>
            </div>

            <section className="order-timeline" aria-labelledby="timeline-title">
              <div className="order-section-heading">
                <h2 id="timeline-title">Dòng thời gian</h2>
                <span>{timeline.length} trạng thái</span>
              </div>
              <ListGroup as="ol" variant="flush" className="order-timeline-list">
                {timeline.map((entry, index) => (
                  <ListGroup.Item as="li" className="order-timeline-item" key={`${entry.status}-${index}`}>
                    <span className="timeline-marker" aria-hidden="true" />
                    <span className="timeline-status">{STATUS_INFO[entry.status].label}</span>
                    <time className="timeline-time">{entry.at}</time>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </section>

            {isFinal && (
              <Button
                className="order-new-button"
                variant="success"
                type="button"
                onClick={() => dispatch({ type: 'RESET' })}
              >
                Tạo đơn mới
              </Button>
            )}
          </Card.Body>
        </Card>
      </Container>
    </main>
  )
}

export default OrderTracker