import { createAction } from '@reduxjs/toolkit';
import type { Theme } from './features/ui/uiSlice';

export type PersistedState = {
  theme?: Theme;
};

export const hydrate = createAction<PersistedState>('app/hydrate');
