import { useReducer } from 'react'
import { Badge, Button, Card, Col, Container, Form, ListGroup, Row } from 'react-bootstrap'

const MIN = 0
const MAX = 100

const clamp = (value) => Math.min(MAX, Math.max(MIN, value))

const ACTIONS = {
  INCREMENT: 'counter/increment',
  DECREMENT: 'counter/decrement',
  SET_STEP: 'counter/set-step',
  RESET: 'counter/reset',
}

const initialState = { count: 0, step: 1, history: [] }

function counterReducer(state, action) {
  switch (action.type) {
    case ACTIONS.INCREMENT:
    case ACTIONS.DECREMENT: {
      const delta = action.type === ACTIONS.INCREMENT ? state.step : -state.step
      const next = clamp(state.count + delta)

      if (next === state.count) return state

      return {
        ...state,
        count: next,
        history: [`${state.count} → ${next}`, ...state.history].slice(0, 5),
      }
    }
    case ACTIONS.SET_STEP:
      if (state.step === action.payload) return state
      return { ...state, step: action.payload }
    case ACTIONS.RESET:
      return initialState
    default:
      throw new Error(`Unknown counter action: ${action.type}`)
  }
}

function StepCounter() {
  const [state, dispatch] = useReducer(counterReducer, initialState)
  const { count, step, history } = state

  return (
    <main className="counter-page">
      <Container className="counter-layout d-flex flex-column align-items-center justify-content-center">
        <Card className="counter-panel w-100">
          <Card.Body>
            <header className="counter-heading">
              <p className="counter-eyebrow">Bài tập useReducer · 01</p>
              <h1 id="counter-title">Bộ đếm bước nhảy</h1>
            </header>

            <div className="counter-display" aria-live="polite" aria-atomic="true">
              {count}
            </div>

            <Row className="g-2 counter-controls">
              <Col>
                <Button
                  className="counter-button counter-button-secondary w-100"
                  variant="outline-success"
                  type="button"
                  disabled={count === MIN}
                  onClick={() => dispatch({ type: ACTIONS.DECREMENT })}
                >
                  − {step}
                </Button>
              </Col>
              <Col>
                <Button
                  className="counter-button counter-button-primary w-100"
                  variant="success"
                  type="button"
                  disabled={count === MAX}
                  onClick={() => dispatch({ type: ACTIONS.INCREMENT })}
                >
                  + {step}
                </Button>
              </Col>
            </Row>

            <div className="counter-options">
              <Form.Label htmlFor="counter-step">Bước nhảy</Form.Label>
              <Form.Select
                id="counter-step"
                className="counter-select"
                value={step}
                onChange={(event) =>
                  dispatch({
                    type: ACTIONS.SET_STEP,
                    payload: Number(event.target.value),
                  })
                }
              >
                {[1, 5, 10, 25].map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </Form.Select>
              <Button
                className="counter-reset"
                variant="outline-secondary"
                type="button"
                onClick={() => dispatch({ type: ACTIONS.RESET })}
              >
                Đặt lại
              </Button>
            </div>

            <section className="counter-history" aria-labelledby="history-title">
              <div className="history-heading">
                <h2 id="history-title">Lịch sử thay đổi</h2>
                <span>{history.length}/5</span>
              </div>
              {history.length > 0 ? (
                <ListGroup as="ol" variant="flush" className="counter-history-list">
                  {history.map((change, index) => (
                    <ListGroup.Item as="li" key={`${change}-${index}`}>
                      <span>{change}</span>
                      <Badge bg="light" text="secondary">
                        {String(index + 1).padStart(2, '0')}
                      </Badge>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              ) : (
                <p className="history-empty">Chưa có thay đổi nào</p>
              )}
            </section>
          </Card.Body>
        </Card>
        <p className="counter-range">Giá trị luôn nằm trong khoảng {MIN}–{MAX}</p>
      </Container>
    </main>
  )
}

export default StepCounter