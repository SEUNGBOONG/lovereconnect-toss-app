export function safeTimeAgo(dateString?: string | null) {
  // null / undefined / 빈 문자열 방어
  if (!dateString) return "알 수 없음";

  const time = new Date(dateString).getTime();

  // 잘못된 날짜(NaN) 방어
  if (Number.isNaN(time)) return "알 수 없음";

  const diff = Date.now() - time;

  // 미래 시간 방어 (서버/클라 시간차)
  if (diff < 0) return "방금 전";

  const minutes = Math.floor(diff / 60000);

  if (minutes < 1) return "방금 전";
  if (minutes < 60) return `${minutes}분 전`;
  if (minutes < 1440) return `${Math.floor(minutes / 60)}시간 전`;
  return `${Math.floor(minutes / 1440)}일 전`;
}
