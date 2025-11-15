"use client";

import BrandAccent from "@/components/ui/BrandAccent";
import Container from "@/components/ui/Container";
import LanguageSelector from "@/components/ui/LanguageSelector";
import Logo from "@/components/ui/Logo";
import { Link } from "@/i18n/routing";
import { Menu, X, User } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState, useRef, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import Image from "next/image";

const CURRENT_USER_QUERY = gql`
  query CurrentUser {
    me {
      id
      username
      name
      avatarUrl
    }
  }
`;

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuContainerRef = useRef<HTMLDivElement>(null);
  const t = useTranslations();
  const { data: userData } = useQuery(CURRENT_USER_QUERY);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        menuContainerRef.current &&
        !menuContainerRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isMenuOpen]);

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

          <div ref={menuContainerRef} className="flex items-center relative">
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
              ) : userData?.me ? (
                userData.me.avatarUrl ? (
                  <Image
                    src={userData.me.avatarUrl}
                    alt={userData.me.name}
                    width={32}
                    height={32}
                    className="rounded-full object-cover"
                  />
                ) : (
                  <User className="h-6 w-6 text-gray-800" />
                )
              ) : (
                <Menu className="h-6 w-6 text-gray-800" />
              )}
            </button>

            {/* Dropdown Menu */}
            {isMenuOpen && (
              <div
                role="menu"
                aria-orientation="vertical"
                className="absolute right-0 top-full mt-0 w-48 bg-white border border-gray-200 z-50"
              >
                <div className="py-2">
                  {userData?.me ? (
                    <Link
                      href={`/users/${userData.me.username}`}
                      role="menuitem"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {t("header.profile")}
                    </Link>
                  ) : (
                    <Link
                      href="/signin"
                      role="menuitem"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {t("header.login")}
                    </Link>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </Container>
    </header>
  );
}
