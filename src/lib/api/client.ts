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

  if (res.status === 401) {
    throw {
      type: "AUTH_EXPIRED",
      code: data.code,
      message: data.message ?? "로그인이 필요합니다.",
      status: 401,
    };
  }

  if (!res.ok) {
    throw {
      type: "API_ERROR",
      code: data.code || "NETWORK_ERROR",
      message: data.message || "서버 오류",
      status: res.status,
    };
  }

  return data;
}
