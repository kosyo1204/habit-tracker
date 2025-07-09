import { describe, it, expect } from 'vitest';
import type { Habbit } from '../type/Habit';

describe('Habbit', () => {
  it('Habitオブジェクトを作成できること', () => {
    const habit: Habbit = {
      id: '1',
      name: '読書する',
      type: 'check',
      goal: {
        ammount: 1,
        unit: 'times',
      },
      frequency: 'daily',
      start_at: '2025-07-09',
      end_at: '2025-08-09',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      value: false,
    };

    expect(typeof habit).toBe('object');
    expect(habit.name).toBe('読書する');
  });
});