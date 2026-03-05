import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { AddHabitForm } from '../components/AddHabitForm';
import type { CountHabit, CheckHabit } from '../type/Habit';

// AddHabitFormから送信されるペイロードの型（idとcreatedAt・updatedAtはReducerで生成）
type AddPayload = Omit<CountHabit, 'id' | 'createdAt' | 'updatedAt'> | Omit<CheckHabit, 'id' | 'createdAt' | 'updatedAt'>;

describe('AddHabitForm: 習慣追加フォームの表示と操作', () => {
  it('フォームの入力フィールドが表示される', () => {
    render(<AddHabitForm onAdd={() => {}} />);

    // 習慣名の入力欄
    expect(screen.getByPlaceholderText('習慣名')).toBeInTheDocument();
    // 追加ボタン
    expect(screen.getByRole('button', { name: '追加' })).toBeInTheDocument();
  });

  it('習慣名を入力して追加ボタンをクリックするとonAddが呼ばれる', () => {
    const onAdd = vi.fn();
    render(<AddHabitForm onAdd={onAdd} />);

    // 習慣名を入力
    fireEvent.change(screen.getByPlaceholderText('習慣名'), {
      target: { value: '水を飲む' },
    });

    // 追加ボタンをクリック
    fireEvent.click(screen.getByRole('button', { name: '追加' }));

    // onAddが呼ばれ、habitNameが含まれていることを確認
    expect(onAdd).toHaveBeenCalledTimes(1);
    const payload: AddPayload = onAdd.mock.calls[0][0];
    expect(payload.name).toBe('水を飲む');
  });

  it('習慣名が空のときは追加ボタンをクリックしてもonAddが呼ばれない', () => {
    const onAdd = vi.fn();
    render(<AddHabitForm onAdd={onAdd} />);

    fireEvent.click(screen.getByRole('button', { name: '追加' }));

    expect(onAdd).not.toHaveBeenCalled();
  });

  it('送信後に習慣名の入力欄がリセットされる', () => {
    render(<AddHabitForm onAdd={() => {}} />);

    const input = screen.getByPlaceholderText('習慣名') as HTMLInputElement;
    fireEvent.change(input, { target: { value: '運動する' } });
    fireEvent.click(screen.getByRole('button', { name: '追加' }));

    // 送信後に入力欄がリセットされていることを確認
    expect(input.value).toBe('');
  });

  it('タイプ（count/check）を選択できる', () => {
    render(<AddHabitForm onAdd={() => {}} />);

    // タイプ選択のselectが存在する
    const typeSelect = screen.getByLabelText('タイプ');
    expect(typeSelect).toBeInTheDocument();
  });

  it('countタイプを選択して送信するとonAddにtype: countが含まれる', () => {
    const onAdd = vi.fn();
    render(<AddHabitForm onAdd={onAdd} />);

    fireEvent.change(screen.getByPlaceholderText('習慣名'), {
      target: { value: '水を飲む' },
    });

    // countタイプを選択
    fireEvent.change(screen.getByLabelText('タイプ'), {
      target: { value: 'count' },
    });

    fireEvent.click(screen.getByRole('button', { name: '追加' }));

    const payload: AddPayload = onAdd.mock.calls[0][0];
    expect(payload.type).toBe('count');
  });
});
