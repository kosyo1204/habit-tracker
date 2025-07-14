import { type Habit, type CountHabit, type CheckHabit } from '../type/Habit';
// uuidライブラリをインポート
import { v4 as uuidv4 } from 'uuid';
import { getNowISOString } from '../utils/date';

// 各アクションのペイロードの型を定義

// ADDアクションのペイロードは、reducerで生成されるプロパティを除いたもの
type AddPayload = Omit<CountHabit, 'id' | 'createdAt' | 'updatedAt'> | Omit<CheckHabit, 'id' | 'createdAt' | 'updatedAt'>;

// UPDATEのペイロードは、idと更新したいプロパティ（Habitの一部）
// typeとvalueは直接UPDATEしない想定
type UpdatePayload = Partial<Omit<Habit, 'type' | 'value'>> & { id: string };


// Actionの型をユニオンで定義
export type Action =
  | { type: 'ADD'; payload: AddPayload }
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
  const now = getNowISOString(); // 日時を事前に取得

  switch (action.type) {
    case 'ADD': {
      // TODO: payloadのバリデーションを追加する
      // 新しい習慣を生成し、型アサーションでHabit型であることを保証
            const newHabit = {
              ...action.payload,
              id: uuidv4(),
              createdAt: now,
              updatedAt: now,
            } as Habit;
            return [...state, newHabit];
    }
    case 'DELETE':
      return state.filter(habit => habit.id !== action.payload.id);

    case 'UPDATE': {
      return state.map(habit =>
        habit.id === action.payload.id
          ? { ...habit, ...action.payload, updatedAt: now }
          : habit
      );
    }

    case 'INCREMENT': {
      return state.map(habit => {
        if (habit.id !== action.payload.id) {
          return habit;
        }
        // 対象の習慣が'count'型の場合のみインクリメント
        // Discriminated Unionにより、habit.typeが'count'であればhabit.valueはnumber型であることが保証される
        if (habit.type === 'count') {
          return {
            ...habit,
            value: habit.value + 1,
            updatedAt: now,
          };
        }
        // 型が違うなど、条件に合わない場合は何もしない
        return habit;
      });
    }

    case 'TOGGLE': {
        return state.map(habit => {
            if (habit.id !== action.payload.id) {
                return habit;
            }
            // 対象の習慣が'check'型の場合のみトグル
            // Discriminated Unionにより、habit.typeが'check'であればhabit.valueはboolean型であることが保証される
            if (habit.type === 'check') {
                return {
                    ...habit,
                    value: !habit.value,
                    updatedAt: now,
                };
            }
            return habit;
        });
    }

    case 'SKIP': {
        return state.map(habit =>
            habit.id === action.payload.id
                ? { ...habit, skipped: true, updatedAt: now }
                : habit
        );
    }

    default:
      return state;
  }
};