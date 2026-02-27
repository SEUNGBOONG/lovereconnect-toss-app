import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useSetAtom } from "jotai";

import { apiClient } from "../lib/api/client.ts";
import { API } from "../lib/api/endpoints.ts";
import { authAtom } from "../atoms/authAtom.ts";
import type { LoginFormData } from "../schemas/memberSchema.ts";
import type { ApiResponse, ApiError } from "../types/api.ts";
import type { SignUpRequest } from "../types/signup.ts";
import type { TossAdditionalInfoRequest } from "../utils/toTossAdditionalInfoRequest.ts";

/* ======================
 * 회원가입
 * ====================== */
export const useSignup = () => {
  const navigate = useNavigate();

  return useMutation<ApiResponse<null>, ApiError, SignUpRequest>({
    mutationFn: (payload) =>
      apiClient(API.MEMBER.SIGNUP, {
        method: "POST",
        body: JSON.stringify(payload),
      }),
    onSuccess: () => {
      toast.success("회원가입 완료");
      navigate("/login");
    },
    onError: (err) => {
      toast.error("회원가입 실패", {
        description: err.message,
      });
    },
  });
};

/* ======================
 * 로그인
 * ====================== */
export const useLogin = () => {
  const navigate = useNavigate();
  const setAuth = useSetAtom(authAtom);

  return useMutation<
    ApiResponse<{
      memberId: number;
      memberName: string;
      memberNickName: string;
    }>,
    ApiError,
    LoginFormData
  >({
    mutationFn: ({ email, password }) =>
      apiClient(API.MEMBER.LOGIN, {
        method: "POST",
        body: JSON.stringify({
          memberEmail: email,
          memberPassword: password,
        }),
      }),

    onSuccess: (res) => {
      setAuth((prev) => ({
        ...prev,
        isLoggedIn: true,
        initialized: true,
        user: {
          nickname: res.data.memberNickName,
          name: res.data.memberName,
        } as any, // ← partial 명시적으로 허용
      }));

      toast.success("로그인 성공");
      navigate("/");
    },

    onError: (err) => {
      toast.error("로그인 실패", {
        description: err.message,
      });
    },
  });
};

/* ======================
 * 토스 추가 정보 입력
 * ====================== */
export const useTossAdditionalInfo = () => {
  const navigate = useNavigate();

  return useMutation<ApiResponse<null>, ApiError, TossAdditionalInfoRequest>({
    mutationFn: (payload) =>
      apiClient(API.MEMBER.TOSS_ADDITIONAL_INFO, {
        method: "PATCH",
        body: JSON.stringify(payload),
      }),

    onSuccess: () => {
      toast.success("추가 정보 입력 완료");
      navigate("/");
    },

    onError: (err) => {
      toast.error("추가 정보 입력 실패", {
        description: err.message,
      });
    },
  });
};

/* ======================
 * 로그아웃
 * ====================== */
export const useLogout = () => {
  const navigate = useNavigate();
  const setAuth = useSetAtom(authAtom);

  return useMutation<ApiResponse<null>, ApiError>({
    mutationFn: () => apiClient(API.MEMBER.LOGOUT, { method: "POST" }),
    onSuccess: () => {
      setAuth((prev) => ({
        ...prev,
        isLoggedIn: false,
        user: null,
        initialized: true,
      }));

      toast.success("로그아웃 되었습니다");
      navigate("/");
    },
  });
};

// /* ======================
//  * 내 프로필 조회
//  * ====================== */
// export const useMemberProfile = () => {
//   return useQuery<ApiResponse<MemberProfileResponse>, ApiError>({
//     queryKey: ["memberProfile"],
//     queryFn: () => apiClient(API.MEMBER.PROFILE, { method: "GET" }),
//     select: (res) => res.data,
//   });
// };
//
// /* ======================
//  * 내 프로필 수정
//  * ====================== */
// export const useUpdateMemberProfile = () => {
//   return useMutation<ApiResponse<null>, ApiError, MemberProfileUpdateForm>({
//     mutationFn: (payload) =>
//       apiClient(API.MEMBER.PROFILE, {
//         method: "PATCH",
//         body: JSON.stringify(payload),
//       }),
//     onSuccess: () => {
//       toast.success("내 정보가 수정되었습니다");
//     },
//   });
// };
