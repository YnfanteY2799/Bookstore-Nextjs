import { Footer, Navbar } from "@/components";

import type { RSC } from "@/types";
import type { ReactNode } from "react";

export default function RootLayout({ children }: Readonly<RSC>): ReactNode {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      {children}
      <Footer />
    </main>
  );
}
