import { useState } from 'react'

function Counter() {
  const [count, setCount] = useState(0)

  return (
    <main className="exercise">
      <h1>Simple Counter</h1>
      <p>Current count: {count}</p>
      <button
        type="button"
        className="counter"
        onClick={() => setCount((currentCount) => currentCount + 1)}
      >
        Tăng
      </button>
      <button
        type="button"
        className="counter"
        onClick={() => setCount((currentCount) => currentCount - 1)}
      >
        Giảm
      </button>
      <button
        type="button"
        className="counter"
        onClick={() => setCount(0)}
      >
        Reset
      </button>
    </main>
  )
}

export default Counter