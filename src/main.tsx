import App from "./App";
import "./index.css";
import "./tailwind.css";

import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@toss/tds-mobile";

import { TossProviders } from "./providers/TossProviders";
import { isTossApp } from "./lib/isTossApp";
import OverlayRenderer from "./components/overlay/OverlayRenderer.tsx";
import { Toaster } from "sonner";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  isTossApp() ? (
    <TossProviders>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <OverlayRenderer />
          <App />
        </BrowserRouter>
        <Toaster position="top-center" richColors closeButton />
      </QueryClientProvider>
    </TossProviders>
  ) : (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <OverlayRenderer />
          <div className="min-h-screen w-full">
            <App />
          </div>
        </BrowserRouter>
        <Toaster position="top-center" richColors closeButton />
      </QueryClientProvider>
    </ThemeProvider>
  ),
);
