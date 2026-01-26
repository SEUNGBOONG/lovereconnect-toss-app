import { apiClient } from "./client";
import { API } from "./endpoints";
import type { ApiResponse } from "../../types/api.ts";

export interface MeResponse {
  email: string;
  name: string;
  nickname: string;
  phoneNumber: string;
  instagramId: string | null;
  tiktokId: string | null;
  mbti: string;
  gender: "MALE" | "FEMALE";
  birthDate: string;
  emailAgree: boolean;
}

export const fetchMe = () =>
  apiClient<ApiResponse<MeResponse>>(API.AUTH.ME, {
    method: "GET",
  });
