import { createAction } from '@reduxjs/toolkit';
import type { Theme } from './features/ui/uiSlice';
import type { TodosState } from './features/todos/todosSlice';

export type PersistedState = {
  theme?: Theme;
  todos?: TodosState;
};

export const hydrate = createAction<PersistedState>('app/hydrate');
