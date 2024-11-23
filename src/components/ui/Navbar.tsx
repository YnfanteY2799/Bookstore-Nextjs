import { AuthBasedUser, LangSwitcher, AuthModals, ThemeSwitcher } from "@/components";
import Link from "next/link";

import type { ReactNode } from "react";

export default function Navbar(): ReactNode {

  


  return (
    <header className="border-b">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/Home" className="text-2xl font-bold">
          Minimalist Books
        </Link>

        <div className="space-x-2">
          <ThemeSwitcher />
          <LangSwitcher />
          <AuthBasedUser />
        </div>
      </nav>
      <AuthModals />
    </header>
  );
}
