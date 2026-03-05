import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import type { Habit } from '../type/Habit';
import { HabitList } from '../components/HabitList';

describe('HabitList: 習慣リストの表示', () => {
  const habits: Habit[] = [
    {
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
    },
    {
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
    },
  ];

  it('習慣リストに習慣の名前が全て表示される', () => {
    render(
      <HabitList
        habits={habits}
        onIncrement={() => {}}
        onToggle={() => {}}
        onDelete={() => {}}
        onSkip={() => {}}
      />
    );

    expect(screen.getByText('水を飲む')).toBeInTheDocument();
    expect(screen.getByText('本を読む')).toBeInTheDocument();
  });

  it('習慣リストが空の場合、メッセージが表示される', () => {
    render(
      <HabitList
        habits={[]}
        onIncrement={() => {}}
        onToggle={() => {}}
        onDelete={() => {}}
        onSkip={() => {}}
      />
    );

    expect(screen.getByText('習慣がまだ登録されていません')).toBeInTheDocument();
  });

  it('コールバック関数がHabitItemに正しく渡される', () => {
    const onDelete = vi.fn();
    render(
      <HabitList
        habits={habits}
        onIncrement={() => {}}
        onToggle={() => {}}
        onDelete={onDelete}
        onSkip={() => {}}
      />
    );

    // 削除ボタンが2つ表示されていることを確認（各HabitItemに1つ）
    const deleteButtons = screen.getAllByRole('button', { name: '削除' });
    expect(deleteButtons).toHaveLength(2);

    // 最初の削除ボタンをクリックしてonDeleteが呼ばれることを確認
    fireEvent.click(deleteButtons[0]);
    expect(onDelete).toHaveBeenCalledWith('1');
  });
});
