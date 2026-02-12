import { atom } from "jotai";

export interface AuthUser {
  memberId?: number;
  nickname: string;
}

export const authAtom = atom<{
  isLoggedIn: boolean;
  initialized: boolean;
  user: AuthUser | null;
}>({
  isLoggedIn: false,
  initialized: false,
  user: null,
});
