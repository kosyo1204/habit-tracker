import type { Habit } from '../type/Habit';

// HabitItemコンポーネントのProps型定義
interface HabitItemProps {
  habit: Habit;
  onIncrement: (id: string) => void;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onSkip: (id: string) => void;
}

/**
 * 習慣アイテムを表示するコンポーネント
 * - count型: 実績値と＋ボタンを表示
 * - check型: チェックボタンを表示
 * - スキップ済みの場合は「スキップ済み」を表示
 */
export function HabitItem({ habit, onIncrement, onToggle, onDelete, onSkip }: HabitItemProps) {
  return (
    <li>
      <span>{habit.name}</span>

      {/* typeに応じてUI分岐（Discriminated Unionで型安全） */}
      {habit.type === 'count' && (
        <span>
          <span>{habit.value}</span>
          <button onClick={() => onIncrement(habit.id)} aria-label="+">+</button>
        </span>
      )}

      {habit.type === 'check' && (
        <button
          onClick={() => onToggle(habit.id)}
          aria-label="✓"
          aria-pressed={habit.value}
        >
          ✓
        </button>
      )}

      {/* スキップ済みの場合は表示 */}
      {habit.skipped && <span>スキップ済み</span>}

      <button onClick={() => onSkip(habit.id)}>スキップ</button>
      <button onClick={() => onDelete(habit.id)} aria-label="🗑">🗑</button>
    </li>
  );
}
