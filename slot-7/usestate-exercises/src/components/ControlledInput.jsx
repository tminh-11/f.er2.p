import { useState } from 'react'

function ControlledInput() {
  const [text, setText] = useState('')

  return (
    <main className="exercise">
      <h1>Controlled Input</h1>
      <label htmlFor="text-input">Nhập nội dung</label>
      <input
        id="text-input"
        type="text"
        value={text}
        onChange={(event) => setText(event.target.value)}
      />
      <p>Nội dung: {text}</p>
    </main>
  )
}

export default ControlledInput