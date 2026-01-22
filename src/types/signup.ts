import type { MemberFormData } from "../schemas/memberSchema.ts";

export interface SignUpRequest {
  email: string;
  name: string;
  password: string;
  nickname: string;
  phoneNumber: string;
  instagramId: string;
  mbti: string;
  birthYear: string;
  birthMonth: string;
  birthDay: string;
  gender: "MALE" | "FEMALE";
  emailAgree?: boolean;
  privacyAgree: boolean;
  useAgree: boolean;
}

export function toSignUpRequest(data: MemberFormData): SignUpRequest {
  return {
    email: data.email,
    name: data.name,
    password: data.password,
    nickname: data.nickname,
    phoneNumber: data.phoneNumber,
    instagramId: data.instagramId,
    mbti: data.mbti,
    birthYear: data.birthYear,
    birthMonth: data.birthMonth,
    birthDay: data.birthDay,
    gender: data.gender,
    emailAgree: data.emailAgree,
    privacyAgree: data.privacyAgree,
    useAgree: data.useAgree,
  };
}
