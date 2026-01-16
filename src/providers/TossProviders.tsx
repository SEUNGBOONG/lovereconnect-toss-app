import { TDSMobileAITProvider } from "@toss/tds-mobile-ait";
import { ThemeProvider } from "@toss/tds-mobile";
import type { ReactNode } from "react";

export function TossProviders({ children }: { children: ReactNode }) {
  return (
    <TDSMobileAITProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </TDSMobileAITProvider>
  );
}
