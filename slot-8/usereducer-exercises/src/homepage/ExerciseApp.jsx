import { useState } from 'react'
import ExerciseNavbar from '../component/ExerciseNavbar'
import KanbanBoard from '../component/KanbanBoard'
import CourseWizard from '../component/CourseWizard'
import NotesBoard from '../component/NotesBoard'
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
      <div hidden={activeExercise !== 'kanban'}>
        <KanbanBoard />
      </div>
      <div hidden={activeExercise !== 'wizard'}>
        <CourseWizard />
      </div>
      <div hidden={activeExercise !== 'notes'}>
        <NotesBoard />
      </div>
    </div>
  )
}

export default ExerciseApp