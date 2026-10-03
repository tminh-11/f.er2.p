export const COLUMNS = [
  { key: 'todo', title: 'Cần làm' },
  { key: 'doing', title: 'Đang làm' },
  { key: 'done', title: 'Hoàn thành' },
]

const COLUMN_ORDER = COLUMNS.map(({ key }) => key)

export const TASK_ACTIONS = {
  ADD: 'tasks/add',
  MOVE: 'tasks/move',
  RENAME: 'tasks/rename',
  DELETE: 'tasks/delete',
  CLEAR_DONE: 'tasks/clearDone',
}

export const initialTaskState = {
  nextId: 4,
  tasks: [
    { id: 1, title: 'Đọc lý thuyết useReducer', priority: 'high', column: 'done' },
    { id: 2, title: 'Làm bài Kanban', priority: 'high', column: 'doing' },
    { id: 3, title: 'Ôn lại spread operator', priority: 'low', column: 'todo' },
  ],
}

export const addTask = (title, priority) => ({
  type: TASK_ACTIONS.ADD,
  payload: { title, priority },
})

export const moveTask = (id, direction) => ({
  type: TASK_ACTIONS.MOVE,
  payload: { id, direction },
})

export const renameTask = (id, title) => ({
  type: TASK_ACTIONS.RENAME,
  payload: { id, title },
})

export const deleteTask = (id) => ({ type: TASK_ACTIONS.DELETE, payload: id })

export const clearDone = () => ({ type: TASK_ACTIONS.CLEAR_DONE })

export function taskReducer(state, action) {
  switch (action.type) {
    case TASK_ACTIONS.ADD: {
      const title = action.payload.title.trim()
      if (!title) return state

      return {
        nextId: state.nextId + 1,
        tasks: [
          ...state.tasks,
          {
            id: state.nextId,
            title,
            priority: action.payload.priority,
            column: 'todo',
          },
        ],
      }
    }
    case TASK_ACTIONS.MOVE: {
      const { id, direction } = action.payload
      const task = state.tasks.find((item) => item.id === id)
      if (!task) return state

      const currentIndex = COLUMN_ORDER.indexOf(task.column)
      const nextIndex = currentIndex + direction
      if (currentIndex < 0 || nextIndex < 0 || nextIndex >= COLUMN_ORDER.length) return state

      return {
        ...state,
        tasks: state.tasks.map((item) =>
          item.id === id ? { ...item, column: COLUMN_ORDER[nextIndex] } : item,
        ),
      }
    }
    case TASK_ACTIONS.RENAME: {
      const title = action.payload.title.trim()
      if (!title) return state

      const task = state.tasks.find((item) => item.id === action.payload.id)
      if (!task || task.title === title) return state

      return {
        ...state,
        tasks: state.tasks.map((item) =>
          item.id === action.payload.id ? { ...item, title } : item,
        ),
      }
    }
    case TASK_ACTIONS.DELETE: {
      const tasks = state.tasks.filter((item) => item.id !== action.payload)
      return tasks.length === state.tasks.length ? state : { ...state, tasks }
    }
    case TASK_ACTIONS.CLEAR_DONE: {
      const tasks = state.tasks.filter((item) => item.column !== 'done')
      return tasks.length === state.tasks.length ? state : { ...state, tasks }
    }
    default:
      throw new Error(`Action không hợp lệ: ${action.type}`)
  }
}