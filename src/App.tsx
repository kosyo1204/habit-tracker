import { useReducer } from 'react'
import { habitReducer } from './reducers/habitReducer'
import type { Action } from './reducers/habitReducer'
import { HabitList } from './components/HabitList'
import { AddHabitForm } from './components/AddHabitForm'
import type { CountHabit, CheckHabit } from './type/Habit'
import './App.css'

// AddHabitFormが送信するペイロードの型
type AddPayload = Omit<CountHabit, 'id' | 'createdAt' | 'updatedAt'> | Omit<CheckHabit, 'id' | 'createdAt' | 'updatedAt'>

function App() {
  // useReducerで習慣リストの状態を管理
  const [habits, dispatch] = useReducer(habitReducer, [])

  const handleAdd = (payload: AddPayload) => {
    const action: Action = { type: 'ADD', payload }
    dispatch(action)
  }

  const handleIncrement = (id: string) => {
    dispatch({ type: 'INCREMENT', payload: { id } })
  }

  const handleToggle = (id: string) => {
    dispatch({ type: 'TOGGLE', payload: { id } })
  }

  const handleDelete = (id: string) => {
    dispatch({ type: 'DELETE', payload: { id } })
  }

  const handleSkip = (id: string) => {
    dispatch({ type: 'SKIP', payload: { id } })
  }

  return (
    <div>
      <h1>習慣トラッカー</h1>
      <HabitList
        habits={habits}
        onIncrement={handleIncrement}
        onToggle={handleToggle}
        onDelete={handleDelete}
        onSkip={handleSkip}
      />
      <AddHabitForm onAdd={handleAdd} />
    </div>
  )
}

export default App
