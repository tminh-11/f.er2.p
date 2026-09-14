import './App.css'
import About from './About'

function App() {
  const user1 = {
    name: 'dwqdqwdq',
    email: 'ddwb@fe.edu.vn',
  }

  const user2 = {
    name: 'Nhu',
    email: 'ngoc@gmail.com',
  }

  return (
    <>
      <About user={user1} />
      <About user={user2} />
    </>
  )
}

export default App
