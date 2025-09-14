"use client";

import BrandAccent from "@/components/ui/BrandAccent";
import Container from "@/components/ui/Container";
import LanguageSelector from "@/components/ui/LanguageSelector";
import Logo from "@/components/ui/Logo";
import { Link } from "@/i18n/routing";
import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = useTranslations();

  return (
    <header className="bg-white/80 backdrop-blur-sm sticky top-0 z-50 border-b">
      <BrandAccent />
      <Container>
        <div className="flex items-stretch justify-between">
          <div className="flex items-center justify-center px-6 py-4 border-l border-r">
            <Logo variant="dark" />
          </div>

          <nav className="hidden md:flex items-center justify-center flex-grow">
            <ul className="flex items-center space-x-8">
              <li>
                <Link
                  className="text-sm font-medium hover:text-gray-900 relative pb-1 text-gray-900 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-gray-900"
                  href="/"
                >
                  {t("header.home")}
                </Link>
              </li>
            </ul>
          </nav>

          <div className="flex items-center">
            <div className="px-4">
              <LanguageSelector />
            </div>
            <button
              className="flex items-center justify-center self-stretch px-6 py-4 border-l border-r transition-colors hover:bg-slate-100 hover:text-slate-800"
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={
                isMenuOpen ? t("common.closeMenu") : t("common.openMenu")
              }
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 text-gray-800" />
              ) : (
                <Menu className="h-6 w-6 text-gray-800" />
              )}
            </button>
          </div>
        </div>
      </Container>
    </header>
  );
}
