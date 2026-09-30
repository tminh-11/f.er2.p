import { useState } from 'react'
import ExerciseNavbar from '../component/ExerciseNavbar'
import OrderTracker from '../component/OrderTracker'
import StepCounter from '../component/StepCounter'

function ExerciseApp() {
  const [activeExercise, setActiveExercise] = useState('orders')

  return (
    <div className="exercise-shell">
      <ExerciseNavbar
        activeExercise={activeExercise}
        onSelect={setActiveExercise}
      />
      <div hidden={activeExercise !== 'counter'}>
        <StepCounter />
      </div>
      <div hidden={activeExercise !== 'orders'}>
        <OrderTracker />
      </div>
    </div>
  )
}

export default ExerciseApp