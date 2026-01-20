import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import type { ApiResponse, ApiError } from "../types/api.ts";
import { apiClient } from "../lib/api/client.ts";
import { API } from "../lib/api/endpoints.ts";

/* ======================
 * 인증번호 발송
 * ====================== */
export interface SendPhoneCodePayload {
  phoneNumber: string;
}

export const useSendPhoneCode = () => {
  return useMutation<ApiResponse<string>, ApiError, SendPhoneCodePayload>({
    mutationFn: (payload) =>
      apiClient<ApiResponse<string>>(API.PHONE.SEND, {
        method: "POST",
        body: JSON.stringify(payload),
      }),

    onSuccess: (res) => {
      toast.success("인증번호 전송 완료", {
        description: res.data ?? "문자로 인증번호가 발송되었습니다.",
      });
    },

    onError: (err) => {
      toast.error("전송 실패", {
        description: err.message ?? "인증번호 전송 중 오류가 발생했습니다.",
      });
    },
  });
};

/* ======================
 * 인증번호 검증
 * ====================== */
export interface VerifyPhoneCodePayload {
  phoneNumber: string;
  verificationCode: string;
}

export const useVerifyPhoneCode = () => {
  return useMutation<ApiResponse<string>, ApiError, VerifyPhoneCodePayload>({
    mutationFn: (payload) =>
      apiClient<ApiResponse<string>>(API.PHONE.VERIFY, {
        method: "POST",
        body: JSON.stringify(payload),
      }),

    onError: (err) => {
      toast.error("인증 실패", {
        description: err.message ?? "인증번호 검증 중 오류가 발생했습니다.",
      });
    },
  });
};
