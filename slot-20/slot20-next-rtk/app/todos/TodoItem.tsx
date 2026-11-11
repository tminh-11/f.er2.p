'use client';

import { useRef, useState, type KeyboardEvent } from 'react';
import { useAppDispatch } from '@/lib/hooks';
import {
  todoEdited,
  todoRemoved,
  todoToggled,
} from '@/lib/features/todos/todosSlice';
import type { Todo } from '@/types';

export default function TodoItem({ todo }: { todo: Todo }) {
  const dispatch = useAppDispatch();
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(todo.text);
  const cancelEditRef = useRef(false);

  function save() {
    const text = draft.trim();
    if (text) dispatch(todoEdited({ id: todo.id, text }));
    else setDraft(todo.text);
    setEditing(false);
  }

  function handleKey(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      event.preventDefault();
      event.currentTarget.blur();
    }
    if (event.key === 'Escape') {
      cancelEditRef.current = true;
      setDraft(todo.text);
      setEditing(false);
    }
  }

  return (
    <li className="group flex items-center gap-3 py-3">
      <input
        id={`todo-${todo.id}`}
        type="checkbox"
        checked={todo.done}
        onChange={() => dispatch(todoToggled(todo.id))}
        className="peer size-5 cursor-pointer accent-blue-600"
      />

      {editing ? (
        <input
          autoFocus
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onBlur={() => {
            if (cancelEditRef.current) {
              cancelEditRef.current = false;
              return;
            }
            save();
          }}
          onKeyDown={handleKey}
          aria-label={`Sửa công việc: ${todo.text}`}
          className="flex-1 rounded border border-blue-400 px-2 py-1 focus:outline-none dark:bg-gray-800"
        />
      ) : (
        <label
          htmlFor={`todo-${todo.id}`}
          onDoubleClick={() => {
            cancelEditRef.current = false;
            setDraft(todo.text);
            setEditing(true);
          }}
          className="flex-1 cursor-pointer select-none transition peer-checked:text-gray-400 peer-checked:line-through"
          title="Double-click để sửa"
        >
          {todo.text}
        </label>
      )}

      <button
        type="button"
        onClick={() => dispatch(todoRemoved(todo.id))}
        className="rounded px-2 text-red-500 opacity-0 transition hover:bg-red-50 group-hover:opacity-100 focus:opacity-100 dark:hover:bg-red-950"
        aria-label={`Xóa công việc: ${todo.text}`}
      >
        ✕
      </button>
    </li>
  );
}
