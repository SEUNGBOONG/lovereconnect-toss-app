import { atom } from "jotai";

export interface AuthState {
  isLoggedIn: boolean;
}

export const authAtom = atom<AuthState>({
  isLoggedIn: false,
});
