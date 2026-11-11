import type { RootState } from './store';
import type { PersistedState } from './actions';

const KEY = 'slot20-state';

export function selectPersisted(state: RootState): PersistedState {
  return { theme: state.ui.theme };
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
    if (
      typeof parsed === 'object' &&
      parsed !== null &&
      'theme' in parsed &&
      (parsed.theme === 'light' || parsed.theme === 'dark')
    ) {
      return { theme: parsed.theme };
    }
    return {};
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
