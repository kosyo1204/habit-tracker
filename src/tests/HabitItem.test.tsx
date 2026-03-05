import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import type { CountHabit, CheckHabit } from '../type/Habit';
import { HabitItem } from '../components/HabitItem';

describe('HabitItem: 習慣アイテムの表示と操作', () => {
  // カウント型の習慣サンプル
  const countHabit: CountHabit = {
    id: '1',
    name: '水を飲む',
    type: 'count',
    goal: { amount: 3, unit: 'times' },
    frequency: 'daily',
    startAt: '2025-07-01',
    endAt: '',
    value: 1,
    createdAt: '2025-07-01T00:00:00.000Z',
    updatedAt: '2025-07-01T00:00:00.000Z',
  };

  // チェック型の習慣サンプル
  const checkHabit: CheckHabit = {
    id: '2',
    name: '本を読む',
    type: 'check',
    goal: { amount: 15, unit: 'minutes' },
    frequency: 'daily',
    startAt: '2025-07-01',
    endAt: '',
    value: false,
    createdAt: '2025-07-01T00:00:00.000Z',
    updatedAt: '2025-07-01T00:00:00.000Z',
  };

  it('カウント型: 習慣名と現在の実績値が表示される', () => {
    render(<HabitItem habit={countHabit} onIncrement={() => {}} onToggle={() => {}} onDelete={() => {}} onSkip={() => {}} />);

    expect(screen.getByText('水を飲む')).toBeInTheDocument();
    // 現在値と目標値が表示されている
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('カウント型: ＋ボタンをクリックするとonIncrementが呼ばれる', () => {
    const onIncrement = vi.fn();
    render(<HabitItem habit={countHabit} onIncrement={onIncrement} onToggle={() => {}} onDelete={() => {}} onSkip={() => {}} />);

    const incrementButton = screen.getByRole('button', { name: /\+/ });
    fireEvent.click(incrementButton);

    expect(onIncrement).toHaveBeenCalledWith('1');
  });

  it('チェック型: 習慣名と完了状態ボタンが表示される', () => {
    render(<HabitItem habit={checkHabit} onIncrement={() => {}} onToggle={() => {}} onDelete={() => {}} onSkip={() => {}} />);

    expect(screen.getByText('本を読む')).toBeInTheDocument();
  });

  it('チェック型: チェックボタンをクリックするとonToggleが呼ばれる', () => {
    const onToggle = vi.fn();
    render(<HabitItem habit={checkHabit} onIncrement={() => {}} onToggle={onToggle} onDelete={() => {}} onSkip={() => {}} />);

    const toggleButton = screen.getByRole('button', { name: /✓/ });
    fireEvent.click(toggleButton);

    expect(onToggle).toHaveBeenCalledWith('2');
  });

  it('削除ボタンをクリックするとonDeleteが呼ばれる', () => {
    const onDelete = vi.fn();
    render(<HabitItem habit={countHabit} onIncrement={() => {}} onToggle={() => {}} onDelete={onDelete} onSkip={() => {}} />);

    const deleteButton = screen.getByRole('button', { name: /🗑/ });
    fireEvent.click(deleteButton);

    expect(onDelete).toHaveBeenCalledWith('1');
  });

  it('スキップボタンをクリックするとonSkipが呼ばれる', () => {
    const onSkip = vi.fn();
    render(<HabitItem habit={countHabit} onIncrement={() => {}} onToggle={() => {}} onDelete={() => {}} onSkip={onSkip} />);

    const skipButton = screen.getByRole('button', { name: /スキップ/ });
    fireEvent.click(skipButton);

    expect(onSkip).toHaveBeenCalledWith('1');
  });

  it('スキップ済みの習慣はスキップ済みと表示される', () => {
    const skippedHabit: CountHabit = { ...countHabit, skipped: true };
    render(<HabitItem habit={skippedHabit} onIncrement={() => {}} onToggle={() => {}} onDelete={() => {}} onSkip={() => {}} />);

    expect(screen.getByText('スキップ済み')).toBeInTheDocument();
  });
});
