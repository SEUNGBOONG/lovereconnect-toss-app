import { z } from "zod";

export const matchSchema = z.object({
  targetName: z.string().min(1, "이름을 입력해주세요."),
  targetPhone: z.string().regex(/^010\d{8}$/, "올바른 전화번호 형식을 입력해주세요."),
  targetInsta: z
    .string()
    .min(1, "인스타그램 ID를 입력해주세요.")
    .refine((v) => /^[a-zA-Z0-9._]{1,30}$/.test(v), "올바른 인스타그램 ID 형식이 아닙니다."),
  requesterDesire: z.number().min(0).max(100, "0~100 사이로 선택해주세요."),
});

export type MatchFormData = z.infer<typeof matchSchema>;
