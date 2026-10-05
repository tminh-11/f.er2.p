import { useRef, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'

const initialTodos = [
  { id: 1, title: 'Ôn lại ES6', done: true },
  { id: 2, title: 'Làm bài tập useState', done: false },
]

const FILTERS = {
  all: 'Tất cả',
  active: 'Chưa xong',
  completed: 'Đã xong',
}

function TodoList() {
  const [todos, setTodos] = useState(initialTodos)
  const [title, setTitle] = useState('')
  const [error, setError] = useState('')
  const [filter, setFilter] = useState('all')
  const [editingId, setEditingId] = useState(null)
  const [editText, setEditText] = useState('')
  const editActionRef = useRef(null)

  function validateTitle(text, ignoreId) {
    const trimmedTitle = text.trim()

    if (!trimmedTitle) {
      return 'Nội dung không được để trống'
    }

    if (trimmedTitle.length > 60) {
      return 'Nội dung không được dài quá 60 ký tự'
    }

    const duplicate = todos.some(
      (todo) =>
        todo.id !== ignoreId &&
        todo.title.trim().toLowerCase() === trimmedTitle.toLowerCase(),
    )

    if (duplicate) {
      return 'Công việc này đã tồn tại'
    }

    return ''
  }

  function handleAdd(event) {
    event.preventDefault()
    const validationError = validateTitle(title)

    if (validationError) {
      setError(validationError)
      return
    }

    setTodos((previousTodos) => [
      ...previousTodos,
      {
        id: Date.now(),
        title: title.trim(),
        done: false,
      },
    ])
    setTitle('')
    setError('')
  }

  function handleTitleKeyDown(event) {
    if (event.key === 'Enter' && !event.nativeEvent.isComposing) {
      event.preventDefault()
      event.currentTarget.form?.requestSubmit()
    }
  }

  function toggleTodo(id) {
    setTodos((previousTodos) =>
      previousTodos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo,
      ),
    )
  }

  function deleteTodo(id) {
    setTodos((previousTodos) =>
      previousTodos.filter((todo) => todo.id !== id),
    )

    if (editingId === id) {
      setEditingId(null)
      setEditText('')
      setError('')
    }
  }

  function startEdit(todo) {
    setEditingId(todo.id)
    setEditText(todo.title)
    setError('')
  }

  function saveEdit(id) {
    const validationError = validateTitle(editText, id)

    if (validationError) {
      setError(validationError)
      return
    }

    setTodos((previousTodos) =>
      previousTodos.map((todo) =>
        todo.id === id ? { ...todo, title: editText.trim() } : todo,
      ),
    )
    setEditingId(null)
    setEditText('')
    setError('')
  }

  function handleEditKeyDown(event) {
    if (event.key === 'Enter') {
      event.preventDefault()
      editActionRef.current = 'save'
      event.currentTarget.blur()
    } else if (event.key === 'Escape') {
      event.preventDefault()
      editActionRef.current = 'cancel'
      event.currentTarget.blur()
    }
  }

  function handleEditBlur(id) {
    const action = editActionRef.current
    editActionRef.current = null

    if (action === 'cancel') {
      setEditingId(null)
      setEditText('')
      setError('')
      return
    }

    saveEdit(id)
  }

  function clearCompleted() {
    setTodos((previousTodos) =>
      previousTodos.filter((todo) => !todo.done),
    )

    if (todos.some((todo) => todo.id === editingId && todo.done)) {
      setEditingId(null)
      setEditText('')
      setError('')
    }
  }

  const visibleTodos = todos.filter((todo) => {
    if (filter === 'active') {
      return !todo.done
    }

    if (filter === 'completed') {
      return todo.done
    }

    return true
  })
  const remaining = todos.filter((todo) => !todo.done).length
  const hasCompletedTodos = todos.some((todo) => todo.done)

  return (
    <Card className="todo-card">
      <Card.Body>
        <Card.Title className="todo-title">Danh sách công việc</Card.Title>

        <Form className="todo-add-form" noValidate onSubmit={handleAdd}>
          <div className="todo-add-input-group">
            <Form.Control
              className={`todo-control${error && editingId === null ? ' is-invalid' : ''}`}
              type="text"
              value={title}
              maxLength={60}
              aria-label="Nội dung công việc mới"
              aria-invalid={Boolean(error && editingId === null)}
              aria-describedby={
                error && editingId === null ? 'todo-add-error' : undefined
              }
              placeholder="Nhập công việc..."
              onChange={(event) => {
                setTitle(event.target.value)
                setError('')
              }}
              onKeyDown={handleTitleKeyDown}
            />
            <Button className="todo-add-button" type="submit">
              Thêm
            </Button>
          </div>
          {error && editingId === null && (
            <div className="todo-error" id="todo-add-error" role="alert">
              {error}
            </div>
          )}
        </Form>

        <div className="todo-toolbar">
          <div className="todo-filters" aria-label="Lọc công việc">
            {Object.entries(FILTERS).map(([key, label]) => (
              <Button
                key={key}
                className={
                  filter === key
                    ? 'todo-filter-button todo-filter-button--active'
                    : 'todo-filter-button'
                }
                type="button"
                variant={filter === key ? 'primary' : 'outline-secondary'}
                aria-pressed={filter === key}
                onClick={() => setFilter(key)}
              >
                {label}
              </Button>
            ))}
          </div>
          {hasCompletedTodos && (
            <Button
              className="todo-clear-button"
              type="button"
              variant="outline-danger"
              onClick={clearCompleted}
            >
              Xóa việc đã xong
            </Button>
          )}
        </div>

        <ul className="todo-items">
          {visibleTodos.map((todo) => (
            <li className="todo-item" key={todo.id}>
              <Form.Check
                className="todo-checkbox"
                type="checkbox"
                id={`todo-done-${todo.id}`}
                label=""
                checked={todo.done}
                aria-label={`Đánh dấu "${todo.title}" đã ${todo.done ? 'chưa xong' : 'xong'}`}
                onChange={() => toggleTodo(todo.id)}
              />
              {editingId === todo.id ? (
                <div className="todo-edit-field">
                  <Form.Control
                    className={`todo-control todo-edit-control${error ? ' is-invalid' : ''}`}
                    type="text"
                    value={editText}
                    maxLength={61}
                    autoFocus
                    aria-label={`Sửa công việc ${todo.title}`}
                    aria-invalid={Boolean(error)}
                    onChange={(event) => {
                      setEditText(event.target.value)
                      setError('')
                    }}
                    onKeyDown={handleEditKeyDown}
                    onBlur={() => handleEditBlur(todo.id)}
                  />
                  {error && (
                    <div className="todo-error" role="alert">
                      {error}
                    </div>
                  )}
                </div>
              ) : (
                <span
                  className={`todo-item-title${todo.done ? ' todo-item-title--done' : ''}`}
                  onDoubleClick={() => startEdit(todo)}
                  title="Nhấp đúp để sửa"
                >
                  {todo.title}
                </span>
              )}
              <Button
                className="todo-delete-button"
                type="button"
                variant="outline-danger"
                aria-label={`Xóa ${todo.title}`}
                onClick={() => deleteTodo(todo.id)}
              >
                Xóa
              </Button>
            </li>
          ))}
          {visibleTodos.length === 0 && (
            <li className="todo-empty">Không có công việc trong danh sách này.</li>
          )}
        </ul>

        <div className="todo-footer">
          <span>Còn {remaining} việc chưa xong</span>
        </div>
      </Card.Body>
    </Card>
  )
}

export default TodoList
