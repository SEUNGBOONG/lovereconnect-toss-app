import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@toss/tds-mobile";

import App from "./App";
import { TossProviders } from "./providers/TossProviders";
import { isTossApp } from "./lib/isTossApp";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  isTossApp() ? (
    <TossProviders>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </QueryClientProvider>
    </TossProviders>
  ) : (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </QueryClientProvider>
    </ThemeProvider>
  ),
);
