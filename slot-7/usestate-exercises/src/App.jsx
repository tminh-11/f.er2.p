import './App.css'
import Counter from './components/Counter'
import ControlledInput from './components/ControlledInput'
import TodoList from './components/TodoList'
import ToggleVisibility from './components/ToggleVisibility'

function App() {
  return (
    <>
      <Counter />
      <ControlledInput />
      <ToggleVisibility />
      <TodoList />
    </>
  )
}

export default App
