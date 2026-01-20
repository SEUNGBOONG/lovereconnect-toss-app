import { atom } from "jotai";
import type { ReactNode } from "react";

export type OverlayType = "modal";

export const overlayAtom = atom<{
  type: OverlayType | null;
  content: ReactNode | null;
}>({
  type: null,
  content: null,
});
