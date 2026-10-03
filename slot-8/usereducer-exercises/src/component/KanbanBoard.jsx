import { useReducer, useState } from 'react'
import { Badge, Button, Card, Col, Container, Form, InputGroup, Row } from 'react-bootstrap'
import {  addTask,  COLUMNS,  clearDone,  deleteTask,  initialTaskState,  moveTask,  renameTask,  taskReducer,} from '../data/taskReducer'

const PRIORITIES = {
  high: { label: 'Cao', variant: 'danger' },
  low: { label: 'Thấp', variant: 'secondary' },
}

function TaskCard({ task, isFirst, isLast, dispatch }) {
  const priority = PRIORITIES[task.priority]

  function handleRename() {
    const title = window.prompt('Tên công việc mới', task.title)
    if (title !== null) dispatch(renameTask(task.id, title))
  }

  return (
    <Card className="kanban-task">
      <Card.Body>
        <div className="kanban-task-heading">
          <button className="kanban-task-title" type="button" onDoubleClick={handleRename}>
            {task.title}
          </button>
          <Badge bg={priority.variant} className={`kanban-priority kanban-priority-${task.priority}`}>
            {priority.label}
          </Badge>
        </div>
        <div className="kanban-task-actions">
          <Button
            aria-label={`Chuyển ${task.title} sang cột trước`}
            disabled={isFirst}
            onClick={() => dispatch(moveTask(task.id, -1))}
            size="sm"
            type="button"
            variant="outline-secondary"
          >
            ←
          </Button>
          <Button
            aria-label={`Chuyển ${task.title} sang cột sau`}
            disabled={isLast}
            onClick={() => dispatch(moveTask(task.id, 1))}
            size="sm"
            type="button"
            variant="outline-secondary"
          >
            →
          </Button>
          <Button
            className="kanban-delete"
            onClick={() => dispatch(deleteTask(task.id))}
            size="sm"
            type="button"
            variant="outline-danger"
          >
            Xóa
          </Button>
        </div>
      </Card.Body>
    </Card>
  )
}

function KanbanBoard() {
  const [state, dispatch] = useReducer(taskReducer, initialTaskState)
  const [title, setTitle] = useState('')
  const [priority, setPriority] = useState('low')
  const [filter, setFilter] = useState('all')

  const visible = state.tasks.filter((task) => filter === 'all' || task.priority === filter)
  const doneCount = state.tasks.filter((task) => task.column === 'done').length

  function handleAdd(event) {
    event.preventDefault()
    if (!title.trim()) return

    dispatch(addTask(title, priority))
    setTitle('')
  }

  return (
    <main className="kanban-page">
      <Container className="kanban-layout">
        <header className="kanban-header">
          <div>
            <p className="kanban-eyebrow">Bài 3 · Reducer tách file</p>
            <h1 className="kanban-title">Bảng công việc</h1>
          </div>
          <Badge bg="light" text="dark" className="kanban-total">
            {state.tasks.length} công việc
          </Badge>
        </header>

        <section className="kanban-toolbar" aria-label="Công cụ bảng công việc">
          <Form className="kanban-add-form" onSubmit={handleAdd}>
            <InputGroup>
              <Form.Control
                aria-label="Tên công việc"
                onChange={(event) => setTitle(event.target.value)}
                placeholder="Tên công việc mới"
                value={title}
              />
              <Form.Select
                aria-label="Ưu tiên công việc mới"
                onChange={(event) => setPriority(event.target.value)}
                value={priority}
              >
                <option value="high">Ưu tiên cao</option>
                <option value="low">Ưu tiên thấp</option>
              </Form.Select>
              <Button disabled={!title.trim()} type="submit" variant="success">
                Thêm
              </Button>
            </InputGroup>
          </Form>

          <Form.Select
            aria-label="Lọc theo mức ưu tiên"
            className="kanban-filter"
            onChange={(event) => setFilter(event.target.value)}
            value={filter}
          >
            <option value="all">Mọi mức ưu tiên</option>
            <option value="high">Chỉ ưu tiên cao</option>
            <option value="low">Chỉ ưu tiên thấp</option>
          </Form.Select>

          <Button
            className="kanban-clear"
            disabled={doneCount === 0}
            onClick={() => dispatch(clearDone())}
            type="button"
            variant="outline-success"
          >
            Dọn cột xong
          </Button>
        </section>

        <Row className="kanban-columns" xs={1} md={3}>
          {COLUMNS.map(({ key, title: columnTitle }, index) => {
            const tasks = visible.filter((task) => task.column === key)

            return (
              <Col key={key}>
                <section className={`kanban-column kanban-column-${key}`} aria-label={columnTitle}>
                  <header className="kanban-column-header">
                    <h2>{columnTitle}</h2>
                    <Badge bg="dark" className="kanban-count">
                      {tasks.length}
                    </Badge>
                  </header>
                  <div className="kanban-column-body">
                    {tasks.map((task) => (
                      <TaskCard
                        dispatch={dispatch}
                        isFirst={index === 0}
                        isLast={index === COLUMNS.length - 1}
                        key={task.id}
                        task={task}
                      />
                    ))}
                    {tasks.length === 0 && <p className="kanban-empty">Chưa có công việc</p>}
                  </div>
                </section>
              </Col>
            )
          })}
        </Row>
      </Container>
    </main>
  )
}

export default KanbanBoard