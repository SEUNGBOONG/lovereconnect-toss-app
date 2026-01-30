"use client";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { partner, tdsEvent } from "@apps-in-toss/web-framework";
import { isTossApp } from "../lib/isTossApp.ts";

interface NavigationAccessoryEvent {
  id: string;
}

export function useNavigationContact() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isTossApp()) return;

    partner.addAccessoryButton({
      id: "contact",
      title: "문의하기",
      icon: {
        name: "icon-heart-mono",
      },
    });

    const cleanup = tdsEvent.addEventListener("navigationAccessoryEvent", {
      onEvent: ({ id }: NavigationAccessoryEvent) => {
        if (id === "contact") {
          navigate("/privacy-safe");
        }
      },
    });

    return () => {
      cleanup();
      partner.removeAccessoryButton();
    };
  }, [navigate]);
}
