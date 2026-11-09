import { combineReducers } from 'redux';
import cartReducer from '../features/cart/cartSlice';
import productsReducer from '../features/products/productsSlice';
import studentsReducer from '../features/students/studentsSlice';
import counterReducer from './counterReducer';
import filterReducer from './reducers/filterReducer';
import todosReducer from './reducers/todosReducer';
import userReducer from './users/userReducer';

export default combineReducers({
  counter: counterReducer,
  todos: todosReducer,
  filter: filterReducer,
  users: userReducer,
  cart: cartReducer,
  products: productsReducer,
  students: studentsReducer,
});
