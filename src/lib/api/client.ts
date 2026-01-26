export async function apiClient<T>(path: string, options?: RequestInit): Promise<T> {
  const url = `${import.meta.env.VITE_API_BASE_URL}${path}`;

  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers || {}),
    },
    credentials: "include",
    ...options,
  });

  const data = await res.json().catch(() => ({}));

  // 인증 만료 / 권한 없음 → 로그인 페이지로 이동
  if (res.status === 401 || res.status === 403) {
    if (data?.code === "T001" || data?.code === "T002" || path === "/auth/me") {
      window.location.href = "/login";
      throw {
        type: "AUTH_EXPIRED",
        code: data.code,
        message: data.message ?? "로그인이 필요합니다.",
        status: res.status,
      };
    }
  }

  if (!res.ok) {
    throw {
      type: "API_ERROR",
      code: data.code || "NETWORK_ERROR",
      message: data.message || "서버와 통신할 수 없습니다.",
      status: res.status,
    };
  }

  return data;
}
