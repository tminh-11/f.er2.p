import { useState } from 'react'
import { Button, Card, Form } from 'react-bootstrap'
import faqs from '../data/faqs.js'

function FaqItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => setIsOpen((open) => !open)
  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      toggle()
    }
  }

  return (
    <Card className="faq-card">
      <Card.Header
        className="faq-question"
        role="button"
        tabIndex={0}
        aria-expanded={isOpen}
        onClick={toggle}
        onKeyDown={handleKeyDown}
      >
        <span>{question}</span>
        <span className="faq-icon" aria-hidden="true">
          {isOpen ? '−' : '+'}
        </span>
      </Card.Header>
      {isOpen && <Card.Body className="faq-answer">{answer}</Card.Body>}
    </Card>
  )
}

function FaqAccordion() {
  const [singleMode, setSingleMode] = useState(false)
  const [openId, setOpenId] = useState(null)

  const handleToggle = (id) => {
    setOpenId((current) => (current === id ? null : id))
  }

  const handleModeChange = (event) => {
    setSingleMode(event.target.checked)
    setOpenId(null)
  }

  return (
    <main className="faq-page">
      <section className="faq-shell" aria-labelledby="faq-title">
        <div className="faq-eyebrow">REACT · USESTATE</div>
        <div className="faq-heading-row">
          <div>
            <h1 id="faq-title">Câu hỏi thường gặp</h1>
            <p className="faq-intro">Một vài khái niệm nền tảng về React.</p>
          </div>
          <span className="faq-count">{faqs.length} câu hỏi</span>
        </div>

        <div className="faq-controls">
          <Form.Check
            type="switch"
            id="single-mode"
            label="Chỉ mở một câu tại một thời điểm"
            checked={singleMode}
            onChange={handleModeChange}
          />
          <Button
            variant="outline-secondary"
            disabled={!singleMode || openId === null}
            onClick={() => setOpenId(null)}
          >
            Đóng tất cả
          </Button>
        </div>

        <div className="faq-list">
          {singleMode
            ? faqs.map(({ id, question, answer }) => {
                const isOpen = openId === id

                return (
                  <Card className="faq-card" key={id}>
                    <Card.Header
                      className="faq-question"
                      role="button"
                      tabIndex={0}
                      aria-expanded={isOpen}
                      onClick={() => handleToggle(id)}
                      onKeyDown={(event) => {
                        if (event.key === 'Enter' || event.key === ' ') {
                          event.preventDefault()
                          handleToggle(id)
                        }
                      }}
                    >
                      <span>{question}</span>
                      <span className="faq-icon" aria-hidden="true">
                        {isOpen ? '−' : '+'}
                      </span>
                    </Card.Header>
                    {isOpen && (
                      <Card.Body className="faq-answer">{answer}</Card.Body>
                    )}
                  </Card>
                )
              })
            : faqs.map(({ id, question, answer }) => (
                <FaqItem key={id} question={question} answer={answer} />
              ))}
        </div>

        <p className="faq-state-note">
          Khi đổi chế độ, các <code>FaqItem</code> bị gỡ khỏi cây giao diện nên
          state mở riêng của chúng được khởi tạo lại.
        </p>
      </section>
    </main>
  )
}

export default FaqAccordion
