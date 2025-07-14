import { describe, it, expect } from 'vitest';
import { type Habit } from '../type/Habit';
// ReducerとActionをインポート
import { habitReducer, type Action } from '../reducers/habitReducer';

describe('habitReducer: 習慣の状態管理ロジック', () => {
  const initialState: Habit[] = [
    {
      id: '1',
      name: '読書',
      type: 'count',
      goal: { amount: 10, unit: 'minutes' },
      frequency: 'daily',
      startAt: '2025-07-01',
      value: 0,
      endAt: '',
      createdAt: '2025-06-30T08:00:00.000Z',
      updatedAt: '2025-07-01T00:00:00.000Z'
    },
    {
      id: '2',
      name: '運動',
      type: 'check',
      goal: { amount: 1, unit: 'times' },
      frequency: 'daily',
      startAt: '2025-07-01',
      value: false,
      endAt: '',
      createdAt: '2025-06-29T12:00:00.000Z',
      updatedAt: '2025-07-01T00:00:00.000Z'
    },
  ];

  it('ADD アクション: 新しい習慣をリストに追加する', () => {
    // id, createdAt, updatedAtはreducer側で自動生成
    // 'type'が'check'の場合はCheckHabit用、'count'の場合はCountHabit用のpayload型を明示
    const newHabitPayload: Omit<import('../type/Habit').CheckHabit, 'id' | 'createdAt' | 'updatedAt'> = {
      name: '瞑想',
      type: 'check',
      goal: { amount: 1, unit: 'times' },
      frequency: 'daily',
      startAt: '2025-07-09',
      value: false,
      endAt: ''
    };
    // payload型を明示することで型エラーを回避
    const action: Action = { type: 'ADD', payload: newHabitPayload };
    const newState = habitReducer(initialState, action);

    expect(newState).toHaveLength(3);
    // id, createdAt, updatedAt以外のプロパティが一致することを確認
    expect(newState[2]).toMatchObject(newHabitPayload);
    // id, createdAt, updatedAtが自動生成されていることを確認
    expect(typeof newState[2].id).toBe('string');
    expect(newState[2].id).not.toBe('');
    expect(typeof newState[2].createdAt).toBe('string');
    expect(newState[2].createdAt).not.toBe('');
    expect(typeof newState[2].updatedAt).toBe('string');
    expect(newState[2].updatedAt).not.toBe('');
  });

  it('DELETE アクション: 指定したIDの習慣をリストから削除する', () => {
    const action: Action = { type: 'DELETE', payload: { id: '1' } };
    const newState = habitReducer(initialState, action);

    expect(newState).toHaveLength(1);
    expect(newState.find(h => h.id === '1')).toBeUndefined();
  });

  it('INCREMENT アクション: カウント型の習慣の実績値を+1する', () => {
    const action: Action = { type: 'INCREMENT', payload: { id: '1' } };
    const newState = habitReducer(initialState, action);
    const targetHabit = newState.find(h => h.id === '1');

    // Discriminated Unionにより、targetHabitがCountHabit型であることが保証される
    if (targetHabit?.type === 'count') {
      expect(targetHabit.value).toBe(1);
    }
  });

  it('TOGGLE アクション: チェック型の習慣の完了状態をトグルする', () => {
    const action: Action = { type: 'TOGGLE', payload: { id: '2' } };
    
    // 1回目のトグル (false -> true)
    const newState1 = habitReducer(initialState, action);
    const targetHabit1 = newState1.find(h => h.id === '2');
    
    if (targetHabit1?.type === 'check') {
      expect(targetHabit1.value).toBe(true);
    }

    // 2回目のトグル (true -> false)
    const newState2 = habitReducer(newState1, action);
    const targetHabit2 = newState2.find(h => h.id === '2');

    if (targetHabit2?.type === 'check') {
      expect(targetHabit2.value).toBe(false);
    }
  });

  it('SKIP アクション: 指定したIDの習慣をスキップ扱いにし、skippedフラグをtrueにする', () => {
    const action: Action = { type: 'SKIP', payload: { id: '1' } };
    const newState = habitReducer(initialState, action);
    const targetHabit = newState.find(h => h.id === '1');

    expect(targetHabit?.skipped).toBe(true);
  });

  it('UPDATE アクション: 指定したIDの習慣の内容（名前、目標）を更新する', () => {
    const updates = {
      id: '1',
      name: '朝の読書', // 名前を変更
      goal: { amount: 20, unit: 'minutes' as const }, // `as const` を使用して型を推論させる
    };
    const action: Action = { type: 'UPDATE', payload: updates };
    const newState = habitReducer(initialState, action);
    const targetHabit = newState.find(h => h.id === '1');

    expect(targetHabit?.name).toBe('朝の読書');
    expect(targetHabit?.goal.amount).toBe(20);
    expect(targetHabit?.goal.unit).toBe('minutes');
    // 更新されていないプロパティは元のままであることを確認
    expect(targetHabit?.type).toBe('count');
  });
});
