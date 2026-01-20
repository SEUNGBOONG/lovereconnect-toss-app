import { createPortal } from "react-dom";
import type { ReactNode } from "react";

interface PortalProps {
  children: ReactNode;
}

export default function Portal({ children }: PortalProps) {
  const container = document.getElementById("portal");
  if (!container) return null;

  return createPortal(children, container);
}
