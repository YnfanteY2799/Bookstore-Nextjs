import type { RSC } from "@/types/client";
import type { ReactNode } from "react";

export default function RootLayout({ children }: Readonly<RSC>): ReactNode {
  return <>{children}</>;
}
