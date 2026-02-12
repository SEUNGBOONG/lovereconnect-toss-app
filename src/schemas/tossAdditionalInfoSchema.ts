import { z } from "zod";
import { MBTI_LIST } from "../constants/mbtiList";
import { errorMessages as e } from "../constants/errorMessages";

export const tossAdditionalInfoSchema = z.object({
  nickname: z.string().min(2, { message: e.nickname.min }),

  instagramId: z
    .string()
    .min(1, { message: e.instagramId.required })
    .regex(/^\S+$/, { message: e.instagramId.noSpace })
    .regex(/^[a-zA-Z0-9._]{1,30}$/, { message: e.instagramId.invalid })
    .refine(
      (v) => !v.startsWith(".") && !v.startsWith("_") && !v.endsWith(".") && !v.endsWith("_"),
      { message: e.instagramId.edgeDotUnderscore },
    ),

  mbti: z.enum(MBTI_LIST, { message: e.mbti.required }),

  // 선택값: 빈 문자열 허용 → payload 변환 시 null 처리
  tiktokId: z.string().optional(),
});

export type TossAdditionalInfoFormData = z.infer<typeof tossAdditionalInfoSchema>;
