import { legacy_createStore as createStore, combineReducers } from 'redux';
import counterReducer from './counterReducer';

const rootReducer = combineReducers({
  counter: counterReducer,          // state.counter.value
});

export const store = createStore(
  rootReducer,
  // Bật Redux DevTools Extension (nếu đã cài)
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);