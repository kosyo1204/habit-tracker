
import { Habit } from '../type/Habit';

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
 * @param state 現在の習慣リスト
 * @param action 実行するアクション
 * @returns 更新後の習慣リスト
 */
export const habitReducer = (state: Habit[], action: Action): Habit[] => {
  // TODO: 各アクションに対応するロジックを実装する
  // このスイッチ文を実装することで、テストが通るようになります。
  switch (action.type) {
    /*
    case 'ADD':
      // TODO: 実装
      break;
    case 'DELETE':
      // TODO: 実装
      break;
    // 他のケースも同様に実装
    */
    default:
      return state;
  }
};
