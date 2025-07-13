import { describe, it, expect } from 'vitest';
import { type Habit } from '../type/Habit';
// ReducerとActionをインポート（TDDのため、実装はまだない）
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
    // id, createdAt, updatedAtはreducer側で自動生成されることを確認
    const newHabit: Omit<Habit, 'id' | 'createdAt' | 'updatedAt'> = {
      name: '瞑想',
      type: 'check',
      goal: { amount: 1, unit: 'times' },
      frequency: 'daily',
      startAt: '2025-07-09',
      value: false,
      endAt: ''
    };
    const action: Action = { type: 'ADD', payload: newHabit as Habit };
    const newState = habitReducer(initialState, action);

    expect(newState).toHaveLength(3);
    // id, createdAt, updatedAt以外のプロパティが一致することを確認
    expect(newState[2]).toMatchObject(newHabit);
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

    // TODO: Reducer実装後、このテストが通るようにする
    expect(newState).toHaveLength(1);
    expect(newState.find(h => h.id === '1')).toBeUndefined();
  });

  it('INCREMENT アクション: カウント型の習慣の実績値を+1する', () => {
    const action: Action = { type: 'INCREMENT', payload: { id: '1' } };
    const newState = habitReducer(initialState, action);
    const targetHabit = newState.find(h => h.id === '1');

    // TODO: Reducer実装後、このテストが通るようにする
    // valueはnumber型であると想定
    expect(typeof targetHabit?.value).toBe('number');
    if (typeof targetHabit?.value === 'number') {
      expect(targetHabit.value).toBe(1);
    }
  });

  it('TOGGLE アクション: チェック型の習慣の完了状態をトグルする', () => {
    const action: Action = { type: 'TOGGLE', payload: { id: '2' } };
    
    // 1回目のトグル (false -> true)
    const newState1 = habitReducer(initialState, action);
    const targetHabit1 = newState1.find(h => h.id === '2');
    
    // TODO: Reducer実装後、このテストが通るようにする
    expect(targetHabit1?.value).toBe(true);

    // 2回目のトグル (true -> false)
    const newState2 = habitReducer(newState1, action);
    const targetHabit2 = newState2.find(h => h.id === '2');

    // TODO: Reducer実装後、このテストが通るようにする
    expect(targetHabit2?.value).toBe(false);
  });

  it('SKIP アクション: 指定したIDの習慣をスキップ扱いにし、skippedフラグをtrueにする', () => {
    const action: Action = { type: 'SKIP', payload: { id: '1' } };
    const newState = habitReducer(initialState, action);
    const targetHabit = newState.find(h => h.id === '1');

    // TODO: Reducer実装後、このテストが通るようにする
    expect(targetHabit?.skipped).toBe(true);
  });

  it('UPDATE アクション: 指定したIDの習慣の内容（名前、目標）を更新する', () => {
    // goalプロパティのキーを 'amount' に修正（正しいスペルに修正）
    // unitの型を"minutes"と明示的に指定（型エラー回避のため）
    const updates = {
      id: '1',
      name: '朝の読書', // 名前を変更
      goal: { amount: 20, unit: 'minutes' as 'minutes' },
    };
    const action: Action = { type: 'UPDATE', payload: updates };
    const newState = habitReducer(initialState, action);
    const targetHabit = newState.find(h => h.id === '1');

    // TODO: Reducer実装後、このテストが通るようにする
    expect(targetHabit?.name).toBe('朝の読書');
    expect(targetHabit?.goal.amount).toBe(20);
    expect(targetHabit?.goal.unit).toBe('minutes');
    // 更新されていないプロパティは元のままであることを確認
    expect(targetHabit?.type).toBe('count');
  });
});
