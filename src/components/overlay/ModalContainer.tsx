import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface ModalContainerProps {
  children: ReactNode;
}

export default function ModalContainer({ children }: ModalContainerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 80 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 80 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="fixed bottom-0 left-0 right-0 z-50 mx-auto w-full max-w-md rounded-t-2xl bg-white p-6 pb-[env(safe-area-inset-bottom)] shadow-[0_-8px_24px_rgba(0,0,0,0.12)]"
    >
      {children}
    </motion.div>
  );
}
