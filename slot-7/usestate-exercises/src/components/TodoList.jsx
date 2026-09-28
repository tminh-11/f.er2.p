import { useState } from 'react'

function TodoList() {
  const [newTodo, setNewTodo] = useState('')
  const [todos, setTodos] = useState([])

  function handleSubmit(event) {
    event.preventDefault()
    const title = newTodo.trim()

    if (!title) return

    setTodos((currentTodos) => [
      ...currentTodos,
      { id: crypto.randomUUID(), title },
    ])
    setNewTodo('')
  }

  function handleDelete(todoId) {
    setTodos((currentTodos) =>
      currentTodos.filter((todo) => todo.id !== todoId),
    )
  }

  return (
    <section className="exercise">
      <h1>Todo List</h1>
      <form className="todo-form" onSubmit={handleSubmit}>
        <label htmlFor="new-todo">Công việc mới</label>
        <div className="todo-entry">
          <input
            id="new-todo"
            className="text-input"
            type="text"
            value={newTodo}
            onChange={(event) => setNewTodo(event.target.value)}
            placeholder="Nhập công việc"
          />
          <button className="counter" type="submit" disabled={!newTodo.trim()}>
            Thêm
          </button>
        </div>
      </form>
      {todos.length > 0 ? (
        <ul className="todo-list">
          {todos.map((todo) => (
            <li className="todo-item" key={todo.id}>
              <span>{todo.title}</span>
              <button
                className="input-clear"
                type="button"
                onClick={() => handleDelete(todo.id)}
                aria-label={`Xóa ${todo.title}`}
              >
                Xóa
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="todo-empty">Chưa có công việc nào.</p>
      )}
    </section>
  )
}

export default TodoList