import { useState } from 'react'
import { Button, ProgressBar } from 'react-bootstrap'
import QUESTIONS from '../data/questions.js'

function shuffle(array) {
  const shuffled = [...array]

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1))
    ;[shuffled[index], shuffled[randomIndex]] = [
      shuffled[randomIndex],
      shuffled[index],
    ]
  }

  return shuffled
}

function Quiz({ attempt, onRestart }) {
  const [questions] = useState(() => shuffle(QUESTIONS))
  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [finished, setFinished] = useState(false)

  const current = questions[index]
  const selected = answers[current.id]
  const answeredCount = Object.keys(answers).length
  const score = questions.filter(
    (question) => answers[question.id] === question.answer,
  ).length
  const progress = (answeredCount / questions.length) * 100

  if (finished) {
    return (
      <main className="quiz-page">
        <section className="quiz-shell" aria-labelledby="quiz-results-title">
          <QuizHeader attempt={attempt} />
          <div className="quiz-results-heading">
            <p className="quiz-eyebrow">KẾT QUẢ</p>
            <h2 id="quiz-results-title">
              Bạn đúng {score}/{questions.length} câu
            </h2>
          </div>
          <div className="quiz-review-list">
            {questions.map((question, questionIndex) => {
              const isCorrect = answers[question.id] === question.answer
              const selectedAnswer = question.options[answers[question.id]]
              const correctAnswer = question.options[question.answer]

              return (
                <article
                  className={`quiz-review-item ${isCorrect ? 'is-correct' : 'is-wrong'}`}
                  key={question.id}
                >
                  <h3>
                    Câu {questionIndex + 1}: {question.text}
                  </h3>
                  <p className="quiz-review-selected">
                    Bạn chọn: {selectedAnswer}
                  </p>
                  {!isCorrect && (
                    <p className="quiz-review-correct">
                      Đáp án đúng: {correctAnswer}
                    </p>
                  )}
                </article>
              )
            })}
          </div>
          <Button className="quiz-restart" onClick={onRestart}>
            Làm lại
          </Button>
        </section>
      </main>
    )
  }

  return (
    <main className="quiz-page">
      <section className="quiz-shell" aria-labelledby="quiz-title">
        <QuizHeader attempt={attempt} />
        <div className="quiz-progress-row">
          <span>
            Đã trả lời {answeredCount}/{questions.length}
          </span>
          <span>
            Câu {index + 1}/{questions.length}
          </span>
        </div>
        <ProgressBar
          className="quiz-progress"
          now={progress}
          aria-label="Tiến độ trả lời"
        />

        <div className="quiz-question-block">
          <p className="quiz-eyebrow">CÂU HỎI {index + 1}</p>
          <h2 id="quiz-title">{current.text}</h2>
        </div>

        <div className="quiz-options" role="group" aria-label="Các lựa chọn">
          {current.options.map((option, optionIndex) => (
            <button
              className={`quiz-option${selected === optionIndex ? ' is-selected' : ''}`}
              key={option}
              type="button"
              aria-pressed={selected === optionIndex}
              onClick={() =>
                setAnswers((previous) => ({
                  ...previous,
                  [current.id]: optionIndex,
                }))
              }
            >
              <span className="quiz-option-letter">
                {String.fromCharCode(65 + optionIndex)}
              </span>
              <span>{option}</span>
            </button>
          ))}
        </div>

        <div className="quiz-navigation">
          <Button
            variant="outline-secondary"
            disabled={index === 0}
            onClick={() => setIndex((previous) => previous - 1)}
          >
            ← Trước
          </Button>
          {index < questions.length - 1 ? (
            <Button
              className="quiz-next"
              disabled={selected === undefined}
              onClick={() => setIndex((previous) => previous + 1)}
            >
              Tiếp →
            </Button>
          ) : (
            <Button
              className="quiz-next"
              disabled={answeredCount !== questions.length}
              onClick={() => setFinished(true)}
            >
              Nộp bài
            </Button>
          )}
        </div>
      </section>
    </main>
  )
}

function QuizHeader({ attempt }) {
  return (
    <header className="quiz-header">
      <div>
        <p className="quiz-eyebrow">REACT · LAZY INITIALIZER</p>
        <h1>Quiz useState</h1>
      </div>
      <span className="quiz-attempt">Lượt làm bài thứ {attempt}</span>
    </header>
  )
}

function QuizApp() {
  const [attempt, setAttempt] = useState(1)

  return (
    <Quiz
      key={attempt}
      attempt={attempt}
      onRestart={() => setAttempt((previous) => previous + 1)}
    />
  )
}

export default QuizApp
