"use client";

import { Menu } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-white/80 backdrop-blur-sm sticky top-0 z-50 border-b">
      <div className="border-t-4 border-slate-800"></div>
      <div className="container mx-auto max-w-screen-lg px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-center px-6 py-4 border-l border-r">
            <a
              className="text-3xl font-bold tracking-tighter text-gray-800"
              href="/"
            >
              radiant
            </a>
          </div>

          <nav className="hidden md:flex items-center justify-center flex-grow">
            <ul className="flex items-center space-x-8">
              <li>
                <a
                  className="text-sm font-medium hover:text-gray-900 relative pb-1 text-gray-900 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-gray-900"
                  href="/"
                >
                  Home
                </a>
              </li>
            </ul>
          </nav>

          <button
            className="flex items-center justify-center self-stretch px-6 py-4 border-l border-r transition-colors hover:bg-slate-100 hover:text-slate-800"
            type="button"
          >
            <Menu className="h-6 w-6 text-gray-800" />
          </button>
        </div>
      </div>
    </header>
  );
}
