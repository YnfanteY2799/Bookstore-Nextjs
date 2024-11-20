"use client";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { NextUIProvider } from "@nextui-org/react";
import { Toaster } from "sonner";

import type { RSC } from "@/types/client";
import type { ReactNode } from "react";

export default function ThemeProvider({ children }: RSC): ReactNode {
  return (
    <NextUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="dark">
        {children}
        <Toaster richColors closeButton position="bottom-right" />
      </NextThemesProvider>
    </NextUIProvider>
  );
}
