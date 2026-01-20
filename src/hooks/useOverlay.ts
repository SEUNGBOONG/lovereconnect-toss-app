import { useAtom } from "jotai";
import type { ReactNode } from "react";
import { overlayAtom, type OverlayType } from "../atoms/overlayAtom.ts";

export function useOverlay() {
  const [, setOverlay] = useAtom(overlayAtom);

  const openOverlay = (type: OverlayType, content: ReactNode) => {
    setOverlay({ type, content });
  };

  const closeOverlay = () => {
    setOverlay({ type: null, content: null });
  };

  return { openOverlay, closeOverlay };
}
