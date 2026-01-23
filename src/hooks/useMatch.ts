import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { apiClient } from "../lib/api/client.ts";
import { API } from "../lib/api/endpoints.ts";
import type { ApiError, ApiResponse } from "../types/api.ts";

/* =========================
 * 매칭 요청
 * ========================= */

export interface MatchRequestPayload {
  targetPhone: string;
  targetInsta: string;
  targetName: string;
  requesterDesire: number;
}

export const useMatchRequest = () => {
  const navigate = useNavigate();

  return useMutation<ApiResponse<ApiResponse<null>>, ApiError, MatchRequestPayload>({
    mutationFn: (payload) =>
      apiClient<ApiResponse<ApiResponse<null>>>(API.MATCH.REQUEST, {
        method: "POST",
        body: JSON.stringify(payload),
      }),

    onSuccess: (res) => {
      toast.success("매칭 요청 완료", {
        description: res.data?.message ?? "성공적으로 요청되었습니다.",
      });

      navigate("/");
    },

    onError: (err) => {
      toast.error("매칭 요청 실패", {
        description: err.message ?? "요청 중 오류가 발생했습니다.",
      });
    },
  });
};

/* =========================
 * 매칭 정보 조회
 * ========================= */

export interface MatchInfo {
  targetPhone: string;
  targetInsta: string;
  targetName: string;
  requesterDesire: number;
  matched: boolean;
  matchMessage: string | null;
}

export const useMatchInfo = (enabled = true) => {
  return useQuery<ApiResponse<MatchInfo>, ApiError>({
    queryKey: ["match-info"],

    queryFn: () =>
      apiClient<ApiResponse<MatchInfo>>(API.MATCH.REQUEST, {
        method: "GET",
      }),

    enabled,

    staleTime: 0,
    gcTime: 0,

    refetchOnMount: true,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,

    retry: false,
  });
};

/* =========================
 * 매칭 정보 수정
 * ========================= */

export const useMatchUpdate = () => {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<void>, ApiError, MatchRequestPayload>({
    mutationFn: (payload) =>
      apiClient(API.MATCH.REQUEST, {
        method: "PUT",
        body: JSON.stringify(payload),
      }),

    onSuccess: () => {
      toast.success("매칭 정보가 수정되었습니다.");

      queryClient.invalidateQueries({
        queryKey: ["match-info"],
      });
    },
    onError: (err) => {
      toast.error("매칭 정보 수정 실패", {
        description: err.message ?? "요청 중 오류가 발생했습니다.",
      });
    },
  });
};

/* =========================
 * 매칭 결과 조회
 * ========================= */

export const useMatchResult = () => {
  return useQuery<ApiResponse<string>, ApiError>({
    queryKey: ["match-result"],

    queryFn: () =>
      apiClient<ApiResponse<string>>(API.MATCH.RESULT, {
        method: "GET",
      }),

    staleTime: 0,
    gcTime: 0,

    refetchOnMount: true,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,

    retry: false,
  });
};
