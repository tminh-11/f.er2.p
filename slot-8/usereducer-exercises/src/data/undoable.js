const HISTORY_LIMIT = 20

export function createHistory(present) {
  return { past: [], present, future: [] }
}

export function undoable(reducer) {
  return function historyReducer(state, action) {
    const { past, present, future } = state

    switch (action.type) {
      case 'UNDO':
        if (past.length === 0) return state
        return {
          past: past.slice(0, -1),
          present: past[past.length - 1],
          future: [present, ...future],
        }
      case 'REDO':
        if (future.length === 0) return state
        return {
          past: [...past, present].slice(-HISTORY_LIMIT),
          present: future[0],
          future: future.slice(1),
        }
      default: {
        const nextPresent = reducer(present, action)
        if (nextPresent === present) return state

        return {
          past: [...past, present].slice(-HISTORY_LIMIT),
          present: nextPresent,
          future: [],
        }
      }
    }
  }
}