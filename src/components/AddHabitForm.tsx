import { useState, type FormEvent } from 'react';
import type { CountHabit, CheckHabit } from '../type/Habit';

// AddHabitFormが送信するペイロードの型（idとcreatedAt・updatedAtはReducerで生成）
type AddPayload = Omit<CountHabit, 'id' | 'createdAt' | 'updatedAt'> | Omit<CheckHabit, 'id' | 'createdAt' | 'updatedAt'>;

interface AddHabitFormProps {
  onAdd: (payload: AddPayload) => void;
}

// フォームの初期値を定数として定義（再レンダリングのたびに再計算されないよう外部に置く）
const DEFAULT_TYPE = 'check' as const;
const DEFAULT_GOAL_AMOUNT = 1;
const DEFAULT_GOAL_UNIT = 'times' as const;
const DEFAULT_FREQUENCY = 'daily' as const;

/**
 * ローカルタイムゾーンでの今日の日付を YYYY-MM-DD 形式で取得
 * タイムゾーンによる日付のずれを防ぐため、toISOString ではなくローカル日付を使用
 */
function getLocalDateString(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * 習慣を新規追加するフォームコンポーネント
 * 送信時にonAddコールバックを呼び出し、フォームをリセットする
 */
export function AddHabitForm({ onAdd }: AddHabitFormProps) {
  const [name, setName] = useState('');
  const [type, setType] = useState<'count' | 'check'>(DEFAULT_TYPE);
  const [goalAmount, setGoalAmount] = useState(DEFAULT_GOAL_AMOUNT);
  const [goalUnit, setGoalUnit] = useState<'times' | 'minutes'>(DEFAULT_GOAL_UNIT);
  const [frequency, setFrequency] = useState<'daily' | 'weekly' | 'monthly'>(DEFAULT_FREQUENCY);
  // 開始日のデフォルトは今日（コンポーネントマウント時に一度だけ計算）
  const [startAt, setStartAt] = useState(() => getLocalDateString());

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // 習慣名が空の場合は何もしない
    if (!name.trim()) return;

    const base = {
      name: name.trim(),
      goal: { amount: goalAmount, unit: goalUnit },
      frequency,
      startAt,
      endAt: '',
    };

    // typeに応じてvalueの初期値を設定（Discriminated Union）
    const payload: AddPayload =
      type === 'count'
        ? { ...base, type: 'count', value: 0 }
        : { ...base, type: 'check', value: false };

    onAdd(payload);

    // フォームをリセット（初期値の定数を再利用）
    setName('');
    setType(DEFAULT_TYPE);
    setGoalAmount(DEFAULT_GOAL_AMOUNT);
    setGoalUnit(DEFAULT_GOAL_UNIT);
    setFrequency(DEFAULT_FREQUENCY);
    setStartAt(getLocalDateString());
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="習慣名"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label htmlFor="habit-type">タイプ</label>
      <select
        id="habit-type"
        aria-label="タイプ"
        value={type}
        onChange={(e) => setType(e.target.value as 'count' | 'check')}
      >
        <option value="check">チェック</option>
        <option value="count">カウント</option>
      </select>

      <input
        type="number"
        min={1}
        value={goalAmount}
        onChange={(e) => {
          const value = e.target.value;
          // 空文字の場合はデフォルト値に戻す
          if (value === '') {
            setGoalAmount(DEFAULT_GOAL_AMOUNT);
            return;
          }
          const parsed = Number(value);
          // NaN の場合は何もしない
          if (Number.isNaN(parsed)) {
            return;
          }
          // 最小値1でクランプ
          setGoalAmount(Math.max(1, parsed));
        }}
        aria-label="目標数値"
      />

      <select
        value={goalUnit}
        onChange={(e) => setGoalUnit(e.target.value as 'times' | 'minutes')}
        aria-label="目標単位"
      >
        <option value="times">回</option>
        <option value="minutes">分</option>
      </select>

      <select
        value={frequency}
        onChange={(e) => setFrequency(e.target.value as 'daily' | 'weekly' | 'monthly')}
        aria-label="頻度"
      >
        <option value="daily">毎日</option>
        <option value="weekly">毎週</option>
        <option value="monthly">毎月</option>
      </select>

      <input
        type="date"
        value={startAt}
        onChange={(e) => setStartAt(e.target.value)}
        aria-label="開始日"
      />

      <button type="submit">追加</button>
    </form>
  );
}
