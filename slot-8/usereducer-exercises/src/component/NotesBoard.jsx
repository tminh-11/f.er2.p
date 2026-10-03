import { useReducer, useState } from 'react'
import { Button, Card, Col, Container, Form, InputGroup, Row } from 'react-bootstrap'
import { COLORS, initialNotes, NOTE_ACTIONS, notesReducer } from '../data/notesReducer'
import { createHistory, undoable } from '../data/undoable'

const notesWithHistory = undoable(notesReducer)

function NotesBoard() {
  const [history, dispatch] = useReducer(notesWithHistory, initialNotes, createHistory)
  const [text, setText] = useState('')
  const [color, setColor] = useState(COLORS[0])
  const { past, present, future } = history
  const notes = [...present.items].sort((left, right) => Number(right.pinned) - Number(left.pinned))

  function handleAdd(event) {
    event.preventDefault()
    if (!text.trim()) return

    dispatch({ type: NOTE_ACTIONS.ADD_NOTE, payload: { text, color } })
    setText('')
  }

  function handleKeyDown(event) {
    if (!event.ctrlKey || event.altKey || event.metaKey) return
    if (event.target.matches('input, textarea, select, [contenteditable="true"]')) return

    const key = event.key.toLowerCase()
    if (key === 'z' && past.length > 0) {
      event.preventDefault()
      dispatch({ type: 'UNDO' })
    } else if (key === 'y' && future.length > 0) {
      event.preventDefault()
      dispatch({ type: 'REDO' })
    }
  }

  return (
    <main className="notes-page" onKeyDown={handleKeyDown}>
      <Container className="notes-layout">
        <header className="notes-header">
          <div>
            <p className="notes-eyebrow">Bài tập useReducer · 05</p>
            <h1>Bảng ghi chú</h1>
          </div>
          <span className="notes-total">{present.items.length} ghi chú</span>
        </header>

        <section className="notes-toolbar" aria-label="Thao tác ghi chú">
          <Form className="notes-add-form" onSubmit={handleAdd}>
            <InputGroup>
              <Form.Control
                aria-label="Nội dung ghi chú"
                onChange={(event) => setText(event.target.value)}
                placeholder="Viết ghi chú mới"
                value={text}
              />
              <Button disabled={!text.trim()} type="submit" variant="success">
                Thêm ghi chú
              </Button>
            </InputGroup>
            <div className="notes-color-picker" role="group" aria-label="Màu ghi chú mới">
              <span>Màu giấy</span>
              {COLORS.map((swatch, index) => (
                <button
                  aria-label={`Chọn màu ${index + 1}`}
                  aria-pressed={color === swatch}
                  className={`notes-swatch${color === swatch ? ' is-selected' : ''}`}
                  key={swatch}
                  onClick={() => setColor(swatch)}
                  style={{ '--swatch-color': swatch }}
                  type="button"
                />
              ))}
            </div>
          </Form>

          <div className="notes-history-actions" aria-label="Lịch sử thao tác">
            <Button
              disabled={past.length === 0}
              onClick={() => dispatch({ type: 'UNDO' })}
              type="button"
              variant="outline-dark"
            >
              ↶ Hoàn tác ({past.length})
            </Button>
            <Button
              disabled={future.length === 0}
              onClick={() => dispatch({ type: 'REDO' })}
              type="button"
              variant="outline-dark"
            >
              ↷ Làm lại ({future.length})
            </Button>
            <Button
              disabled={present.items.length === 0}
              onClick={() => dispatch({ type: NOTE_ACTIONS.CLEAR_ALL })}
              type="button"
              variant="outline-danger"
            >
              Xóa hết
            </Button>
          </div>
        </section>

        {notes.length > 0 ? (
          <Row className="notes-grid" xs={1} sm={2} lg={3}>
            {notes.map((note) => (
              <Col key={note.id}>
                <Card className="sticky-note" style={{ '--note-color': note.color }}>
                  <Card.Body>
                    <div className="sticky-note-topline">
                      <span className="sticky-note-label">Ghi chú {String(note.id).padStart(2, '0')}</span>
                      {note.pinned && <span className="sticky-note-pin" aria-label="Đã ghim">📌</span>}
                    </div>
                    <Card.Text className="sticky-note-text">{note.text}</Card.Text>
                    <div className="sticky-note-footer">
                      <div className="sticky-note-colors" role="group" aria-label={`Đổi màu ghi chú ${note.id}`}>
                        {COLORS.map((swatch, index) => (
                          <button
                            aria-label={`Đổi sang màu ${index + 1}`}
                            aria-pressed={note.color === swatch}
                            className={`notes-swatch note-swatch${note.color === swatch ? ' is-selected' : ''}`}
                            key={swatch}
                            onClick={() =>
                              dispatch({
                                type: NOTE_ACTIONS.CHANGE_COLOR,
                                payload: { id: note.id, color: swatch },
                              })
                            }
                            style={{ '--swatch-color': swatch }}
                            type="button"
                          />
                        ))}
                      </div>
                      <div className="sticky-note-actions">
                        <Button
                          onClick={() => dispatch({ type: NOTE_ACTIONS.TOGGLE_PIN, payload: note.id })}
                          type="button"
                          variant="link"
                        >
                          {note.pinned ? 'Bỏ ghim' : 'Ghim'}
                        </Button>
                        <Button
                          onClick={() => dispatch({ type: NOTE_ACTIONS.DELETE, payload: note.id })}
                          type="button"
                          variant="link"
                        >
                          Xóa
                        </Button>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        ) : (
          <div className="notes-empty" role="status">
            <span className="notes-empty-mark" aria-hidden="true">+</span>
            <h2>Chưa có ghi chú</h2>
            <p>Thêm ghi chú mới hoặc hoàn tác thao tác vừa rồi.</p>
          </div>
        )}
      </Container>
    </main>
  )
}

export default NotesBoard