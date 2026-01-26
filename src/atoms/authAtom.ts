import { atom } from "jotai";
import type { MeResponse } from "../lib/api/auth.ts";

export const authAtom = atom<{
  isLoggedIn: boolean;
  user: MeResponse | null;
  initialized: boolean;
}>({
  isLoggedIn: false,
  user: null,
  initialized: false,
});
