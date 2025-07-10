import { describe, it, expect } from 'vitest';
import type { Habit } from '../type/Habit';

describe('Habbit', () => {
  it('Habitオブジェクトを作成できること', () => {
    const habit: Habit = {
      id: '1',
      name: '読書する',
      type: 'check',
      goal: {
        amount: 1,
        unit: 'times',
      },
      frequency: 'daily',
      startAt: '2025-07-09',
      endAt: '2025-08-09',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      value: false,
    };

    expect(typeof habit).toBe('object');
    expect(habit.name).toBe('読書する');
  });
});