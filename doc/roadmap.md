# 前提条件（実施前の目標）

- 実装目的：習慣トラッカー（MVP →拡張）
- 技術構成：React + TypeScript + Vite
- 開発スタイル：TDD（Vitest + Playwright）
- 開発期間目安：2〜3ヶ月（※モチベ維持＆学習効率重視）
  - 1イテレーション＝2週間

# ロードマップ

| イテレーション | 期間       | 内容                                         | ゴール                        |
|:--------------:|:----------:|:---------------------------------------------|:------------------------------|
| Iteration 1    | 1〜2週目   | セットアップ & reducer TDD実装 & 画面UI・データのラフ設計              | CLI上で状態更新が動く          |
| Iteration 2    | 3〜4週目   | UI作成（App + コンポーネント分割） & TDD対応 | ローカルで最低限のUI動作       |
| Iteration 3    | 5〜6週目   | useHabits化 & 再レンダリング最適化（memoなど）| 拡張しやすい構成を作る         |
| Iteration 4    | 7〜8週目   | E2E（Playwright）整備 & localStorage対応      | ブラウザ上で安定動作           |
| Iteration 5    | 9〜10週目  | スタイリング & ポートフォリオ化（Tailwind + README）| 公開可能なプロダクトに昇華 |

✅ 各イテレーションの詳細ロードマップ

---

🚀 **Iteration 1: TDD基盤構築（1〜2週目）**

- **やること**
  - Vite + TS + React + Vitest + Playwright セットアップ
  - 型定義（Habit型）を `types/habit.ts` に作成
  - habitReducer をTDDで実装（ADD, INCREMENT, TOGGLE, DELETE）
  - 画面UI・データのラフ設計
    - 画面構成（例：習慣リスト、追加フォーム、カウントボタン等）のワイヤーフレーム作成
    - データ構造（例：Habit型のプロパティ設計、状態管理の流れ）を図やテキストで整理

- **成果物**
  - `__tests__/habitReducer.test.ts` でロジックを保証
  - 最初の仕様がテストで担保されている状態
  - UI・データ設計のドキュメントやワイヤーフレーム

---

🎨 **Iteration 2: UI構築 & コンポーネント分割（3〜4週目）**

- **やること**
  - `App.tsx` にロジックを仮実装
  - 以下のコンポーネントをTDDで作成
    - HabitItem
    - HabitList
    - AddHabitForm
  - React Testing Library によるUIテスト追加

- **成果物**
  - UI上での表示・追加・削除が可能
  - UI単位でテスト済み

---

🧠 **Iteration 3: カスタムHooks化 + 最適化（5〜6週目）**

- **やること**
  - `useHabits.ts` カスタムHookを導入（reducer内蔵）
  - 状態更新の責務分離
  - useCallback, React.memo, useMemo による再レンダリング最適化
  - コンポーネント単体テスト強化

- **成果物**
  - `useHabits.ts` が状態管理の中核に
  - 親の再描画が子に波及しない構成

---

🌐 **Iteration 4: PlaywrightでE2E + 永続化対応（7〜8週目）**

- **やること**
  - localStorage に useEffect で保存・復元
  - PlaywrightによるE2Eテスト
    - 習慣の追加・削除・カウントが保存されているか
    - E2Eテストから仕様バグを発見する

- **成果物**
  - 永続化された状態で使えるWebアプリ
  - 外から操作しても壊れない耐性を確認

---

🌟 **Iteration 5: スタイリング & ポートフォリオ化（9〜10週目）**

- **やること**
  - TailwindCSS導入（デザイン統一）
  - UIコンポーネント整備
  - README記述、GitHub公開、デプロイ（Vercelなど）

- **成果物**
  - 公開可能なプロジェクト
  - GitHub上で履歴＋テストコード＋構造が評価されやすい状態