/**
 * 現在日時をISO8601形式の文字列で返すユーティリティ関数
 * @returns 現在日時（例: 2025-07-13T12:34:56.789Z）
 */
export function getNowISOString(): string {
  return new Date().toISOString();
}
