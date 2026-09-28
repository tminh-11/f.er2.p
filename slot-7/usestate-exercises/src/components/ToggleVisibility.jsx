import { useState } from 'react'

function ToggleVisibility() {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <section className="exercise">
      <h1>Toggle Visibility</h1>
      <button
        type="button"
        className="counter"
        onClick={() => setIsVisible((visible) => !visible)}
      >
        {isVisible ? 'Hide' : 'Show'}
      </button>
      {isVisible && <p>This is the text that can be shown or hidden.</p>}
    </section>
  )
}

export default ToggleVisibility