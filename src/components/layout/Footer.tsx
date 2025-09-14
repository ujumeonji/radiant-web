"use client";

import BrandAccent from "@/components/ui/BrandAccent";
import Container from "@/components/ui/Container";
import Logo from "@/components/ui/Logo";
import { Link } from "@/i18n/routing";
import { Github, Instagram, Linkedin, Twitter } from "lucide-react";
import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations();

  return (
    <footer className="bg-slate-900 text-slate-200 mt-20">
      <BrandAccent />
      <Container>
        <div className="py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="mb-4">
                <Logo variant="light" href={undefined} />
              </div>
              <p className="text-slate-400 max-w-md mb-6">
                {t("footer.slogan")}
              </p>
            </div>

            <div>
              <h4 className="text-slate-100 font-medium mb-4">
                {t("footer.quickLinks")}
              </h4>
              <nav className="space-y-2">
                <Link
                  href="/"
                  className="block text-slate-400 hover:text-slate-100 transition-colors"
                >
                  {t("common.home")}
                </Link>
              </nav>
            </div>

            <div>
              <h4 className="text-slate-100 font-medium mb-4">
                {t("footer.connect")}
              </h4>
              <div className="flex space-x-4">
                <button
                  type="button"
                  className="text-slate-400 hover:text-slate-100 transition-colors disabled:opacity-50"
                  aria-label={`GitHub ${t("footer.comingSoon")}`}
                  disabled
                >
                  <Github className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  className="text-slate-400 hover:text-slate-100 transition-colors disabled:opacity-50"
                  aria-label={`Twitter ${t("footer.comingSoon")}`}
                  disabled
                >
                  <Twitter className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  className="text-slate-400 hover:text-slate-100 transition-colors disabled:opacity-50"
                  aria-label={`LinkedIn ${t("footer.comingSoon")}`}
                  disabled
                >
                  <Linkedin className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  className="text-slate-400 hover:text-slate-100 transition-colors disabled:opacity-50"
                  aria-label={`Instagram ${t("footer.comingSoon")}`}
                  disabled
                >
                  <Instagram className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-700 py-6">
          <div className="text-center text-slate-500 text-sm">
            {t("footer.copyright")}
          </div>
        </div>
      </Container>
    </footer>
  );
}
