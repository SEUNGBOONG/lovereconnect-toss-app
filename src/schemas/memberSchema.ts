import { z } from "zod";
import { errorMessages as e } from "../constants/errorMessages";
import { MBTI_LIST } from "../constants/mbtiList";

export const memberSchema = z
  .object({
    name: z.string().min(2, { message: e.name.min }),
    nickname: z.string().min(2, { message: e.nickname.min }),

    email: z.email({ message: e.email.invalid }),
    password: z.string().min(10, { message: e.password.min }),
    passwordConfirm: z.string().min(1, { message: e.passwordConfirm.required }),

    phoneNumber: z.string().regex(/^010\d{8}$/, { message: e.phoneNumber.invalid }),

    gender: z.enum(["MALE", "FEMALE"], { message: e.gender.required }),
    mbti: z.enum(MBTI_LIST, { message: e.mbti.required }),

    instagramId: z
      .string()
      .min(1, { message: e.instagramId.required })
      .regex(/^\S+$/, { message: e.instagramId.noSpace })
      .regex(/^[a-zA-Z0-9._]{1,30}$/, { message: e.instagramId.invalid })
      .refine(
        (v) => !v.startsWith(".") && !v.startsWith("_") && !v.endsWith(".") && !v.endsWith("_"),
        { message: e.instagramId.edgeDotUnderscore },
      ),

    // 생년월일 (폼 필드)
    birthYear: z.string().nonempty({ message: e.birth.yearRequired }),
    birthMonth: z.string().nonempty({ message: e.birth.monthRequired }),
    birthDay: z.string().nonempty({ message: e.birth.dayRequired }),

    // DatePicker 검증 트리거용
    birthDate: z.string().min(1, { message: e.birth.required }),

    privacyAgree: z.boolean().refine((v) => v === true, { message: e.agreement.required }),
    useAgree: z.boolean().refine((v) => v === true, { message: e.agreement.required }),
    emailAgree: z.boolean().optional(),
  })
  // 비밀번호 일치 검증
  .refine((v) => v.password === v.passwordConfirm, {
    message: e.passwordConfirm.notMatch,
    path: ["passwordConfirm"],
  })
  // 날짜 조합 검증
  .refine(
    (v) => {
      const date = new Date(`${v.birthYear}-${v.birthMonth}-${v.birthDay}`);
      return (
        !isNaN(date.getTime()) &&
        date.getFullYear().toString() === v.birthYear &&
        (date.getMonth() + 1).toString().padStart(2, "0") === v.birthMonth &&
        date.getDate().toString().padStart(2, "0") === v.birthDay
      );
    },
    {
      message: e.birth.invalidDate,
      path: ["birthDay"],
    },
  );

export type MemberFormData = z.infer<typeof memberSchema>;

export const loginSchema = z.object({
  email: z.string().email({ message: e.email.invalid }),
  password: z.string().min(1, { message: e.password.required }),
});

export type LoginFormData = z.infer<typeof loginSchema>;
