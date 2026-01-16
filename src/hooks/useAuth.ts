import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useSetAtom } from "jotai";

import { apiClient } from "../lib/api/client.ts";
import { API } from "../lib/api/endpoints.ts";
import { authAtom } from "../atoms/authAtom.ts";
import type { LoginFormData, MemberFormData } from "../schemas/memberSchema.ts";
import type { ApiResponse, ApiError } from "../types/api.ts";

/* ======================
 * 회원가입
 * ====================== */
export const useSignup = () => {
  const navigate = useNavigate();

  return useMutation<ApiResponse<null>, ApiError, MemberFormData>({
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

  return useMutation<ApiResponse<null>, ApiError, LoginFormData>({
    mutationFn: ({ email, password }) =>
      apiClient(API.MEMBER.LOGIN, {
        method: "POST",
        body: JSON.stringify({
          memberEmail: email,
          memberPassword: password,
        }),
      }),
    onSuccess: () => {
      setAuth({ isLoggedIn: true });
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
 * 로그아웃
 * ====================== */
export const useLogout = () => {
  const navigate = useNavigate();
  const setAuth = useSetAtom(authAtom);

  return useMutation<ApiResponse<null>, ApiError>({
    mutationFn: () => apiClient(API.MEMBER.LOGOUT, { method: "POST" }),
    onSuccess: () => {
      setAuth({ isLoggedIn: false });
      toast.success("로그아웃 되었습니다");
      navigate("/login");
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
