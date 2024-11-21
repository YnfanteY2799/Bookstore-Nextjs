import { Footer, Navbar } from "@/components";

import type { RSC } from "@/types/client";
import type { ReactNode } from "react";

export default function RootLayout({ children }: Readonly<RSC>): ReactNode {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
