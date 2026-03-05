import type { Habit } from '../type/Habit';
import { HabitItem } from './HabitItem';

// HabitListコンポーネントのProps型定義
interface HabitListProps {
  habits: Habit[];
  onIncrement: (id: string) => void;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onSkip: (id: string) => void;
}

/**
 * 習慣リストを表示するコンポーネント
 * 習慣が空の場合は案内メッセージを表示する
 */
export function HabitList({ habits, onIncrement, onToggle, onDelete, onSkip }: HabitListProps) {
  if (habits.length === 0) {
    return <p>習慣がまだ登録されていません</p>;
  }

  return (
    <ul>
      {habits.map((habit) => (
        <HabitItem
          key={habit.id}
          habit={habit}
          onIncrement={onIncrement}
          onToggle={onToggle}
          onDelete={onDelete}
          onSkip={onSkip}
        />
      ))}
    </ul>
  );
}
