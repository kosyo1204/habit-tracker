interface HabitGoal {
    amount: number
    unit: 'times' | 'minutes'
}

export interface Habit {
    id: string
    name: string
    type: 'count' | 'check'
    goal: HabitGoal
    frequency: 'daily' | 'weekly' | 'monthly'
    startAt: string
    endAt: string
    createdAt: string
    updatedAt: string

    value: number | boolean
    skipped?: boolean
}