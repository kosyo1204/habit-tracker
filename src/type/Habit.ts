type HabbitGoal = {
    ammount: number
    unit: 'times' | 'minutes'
}

type Habbit = {
    id: string
    name: string
    type: 'count' | 'check'
    goal: HabbitGoal
    frequency: 'daily' | 'weekly' | 'monthly'
    start_at: string
    end_at: string
    created_at: string
    updated_at: string

    value: number | boolean
    skipped?: boolean
}