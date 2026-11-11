import type { RootState } from './store';
import type { PersistedState } from './actions';
import type { Todo, TodoFilter } from '@/types';

const KEY = 'slot20-state';

export function selectPersisted(state: RootState): PersistedState {
  return { theme: state.ui.theme, todos: state.todos };
}

function isTodo(value: unknown): value is Todo {
  if (typeof value !== 'object' || value === null) return false;
  const todo = value as Record<string, unknown>;
  return (
    typeof todo.id === 'string' &&
    typeof todo.text === 'string' &&
    typeof todo.done === 'boolean' &&
    typeof todo.createdAt === 'string'
  );
}

function isTodoFilter(value: unknown): value is TodoFilter {
  return value === 'all' || value === 'active' || value === 'done';
}

export function loadState(): PersistedState | undefined {
  let raw: string | null;
  try {
    raw = localStorage.getItem(KEY);
  } catch (error) {
    console.warn('Could not read the saved app state from localStorage.', error);
    return undefined;
  }

  if (!raw) return undefined;

  try {
    const parsed: unknown = JSON.parse(raw);
    if (typeof parsed !== 'object' || parsed === null) return {};

    const state = parsed as Record<string, unknown>;
    const persisted: PersistedState = {};
    if (state.theme === 'light' || state.theme === 'dark') {
      persisted.theme = state.theme;
    }
    if (typeof state.todos === 'object' && state.todos !== null) {
      const todos = state.todos as Record<string, unknown>;
      if (
        Array.isArray(todos.items) &&
        todos.items.every(isTodo) &&
        isTodoFilter(todos.filter)
      ) {
        persisted.todos = {
          items: todos.items,
          filter: todos.filter,
        };
      }
    }
    return persisted;
  } catch (error) {
    console.warn('Could not parse the saved app state from localStorage.', error);
    return undefined;
  }
}

export function saveState(state: PersistedState): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch (error) {
    console.warn('Could not save the app state to localStorage.', error);
  }
}
