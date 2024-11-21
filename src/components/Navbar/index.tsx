import Link from "next/link";

import { ReactNode } from "react";

export default function Navbar(): ReactNode {
  return (
    <header className="border-b">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        
        <Link href="/" className="text-2xl font-bold">
          Minimalist Books
        </Link>



        <div className="space-x-4">
          <Link href="/" className="text-sm hover:underline">
            Home
          </Link>
          
        </div>
      </nav>
    </header>
  );
}
