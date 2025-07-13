import { type Habit } from '../type/Habit';
// uuidライブラリをインポート
import { v4 as uuidv4 } from 'uuid';
import { getNowISOString } from '../utils/date';

// 各アクションのペイロードの型を定義
// UPDATEのペイロードは、idと更新したいプロパティ（Habitの一部）
// 例: { id: '1', name: '新しい名前' }
type UpdatePayload = Partial<Habit> & { id: string };


// Actionの型をユニオンで定義
export type Action =
  | { type: 'ADD'; payload: Habit }
  | { type: 'DELETE'; payload: { id: string } }
  | { type: 'INCREMENT'; payload: { id: string } }
  | { type: 'TOGGLE'; payload: { id: string } }
  | { type: 'SKIP'; payload: { id: string } }
  | { type: 'UPDATE'; payload: UpdatePayload };

/**
 * 習慣の状態を更新するreducer関数
 * ビュー側（Reactコンポーネント）でuseReducer(habitReducer, 初期値)と使う予定 
 * @param state 現在の習慣リスト
 * @param action 実行するアクション
 * @returns 更新後の習慣リスト
 */
export const habitReducer = (state: Habit[], action: Action): Habit[] => {
  switch (action.type) {
    case 'ADD':
      const now = getNowISOString() // 日時にズレが生じさせないため
      const newHabit = { ...action.payload, id: uuidv4(), createdAt: now, updatedAt: now }
      return [...state, newHabit]
    case 'DELETE':
      const filteredState = state.filter(habit => habit.id !== action.payload.id);
      return filteredState;
    case 'INCREMENT':
      
    default:
      return state;
  }
};
