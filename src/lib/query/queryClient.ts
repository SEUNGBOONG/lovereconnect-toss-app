import { QueryClient, QueryCache, MutationCache } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      if (isAuthExpiredError(error)) {
        window.dispatchEvent(new CustomEvent("auth:expired"));
      }
    },
  }),

  mutationCache: new MutationCache({
    onError: (error) => {
      if (isAuthExpiredError(error)) {
        window.dispatchEvent(new CustomEvent("auth:expired"));
      }
    },
  }),

  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

/* ---------- type guard ---------- */

interface AuthExpiredError {
  type: "AUTH_EXPIRED";
  status: number;
  code?: string;
  message?: string;
}

function isAuthExpiredError(error: unknown): error is AuthExpiredError {
  if (typeof error !== "object" || error === null) {
    return false;
  }

  if (!("type" in error)) {
    return false;
  }

  const typedError = error as { type?: unknown };

  return typedError.type === "AUTH_EXPIRED";
}
