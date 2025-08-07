/**
 * UTC 날짜를 한국어 형식으로 포맷팅
 * @param date - 포맷팅할 날짜
 * @returns 한국어 형식의 날짜 문자열 (예: "2024. 8. 7. 14:30")
 */
export function formatKoreanDate(date: Date): string {
  return `${date.getUTCFullYear()}. ${date.getUTCMonth() + 1}. ${date.getUTCDate()}. ${String(
    date.getUTCHours(),
  ).padStart(2, '0')}:${String(date.getUTCMinutes()).padStart(2, '0')}`;
}
