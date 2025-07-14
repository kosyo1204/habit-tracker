interface HabitGoal {
  amount: number;
  unit: 'times' | 'minutes';
}

// 共通のプロパティを持つ基本のHabitインターフェース
interface HabitBase {
  id: string;
  name: string;
  goal: HabitGoal;
  frequency: 'daily' | 'weekly' | 'monthly';
  startAt: string;
  endAt: string;
  createdAt: string;
  updatedAt: string;
  skipped?: boolean;
}

// typeが'count'の場合のHabit
export interface CountHabit extends HabitBase {
  type: 'count';
  value: number;
}

// typeが'check'の場合のHabit
export interface CheckHabit extends HabitBase {
  type: 'check';
  value: boolean;
}

// Discriminated UnionとしてHabit型を定義
export type Habit = CountHabit | CheckHabit;
