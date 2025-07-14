import { describe, it, expect } from 'vitest';
import type { Habit } from '../type/Habit';

describe('Habbit', () => {
  it('Habitオブジェクトを作成できること', () => {
    // id, createdAt, updatedAtは自動生成される前提で省略
    const habitBase: Omit<Habit, 'id' | 'createdAt' | 'updatedAt'> = {
      name: '読書する',
      type: 'check',
      goal: {
        amount: 1,
        unit: 'times',
      },
      frequency: 'daily',
      startAt: '2025-07-09',
      endAt: '2025-08-09',
      value: false,
    };
    // 仮の生成関数（実際はreducerやユーティリティで生成する想定）
    const now = new Date().toISOString();
    const habit: Habit = {
      ...habitBase,
      id: 'dummy-id',
      createdAt: now,
      updatedAt: now,
    } as Habit;

    expect(typeof habit).toBe('object');
    expect(habit.name).toBe('読書する');
    expect(typeof habit.id).toBe('string');
    expect(typeof habit.createdAt).toBe('string');
    expect(typeof habit.updatedAt).toBe('string');
  });
});