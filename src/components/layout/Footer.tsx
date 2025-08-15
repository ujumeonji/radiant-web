"use client";

import BrandAccent from "@/components/ui/BrandAccent";
import Container from "@/components/ui/Container";
import Logo from "@/components/ui/Logo";
import { Github, Instagram, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";

export default function Footer() {
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
                A curated translation platform that bridges language barriers,
                bringing carefully selected technical, organizational, and
                career insights from around the world to share knowledge
                globally.
              </p>
            </div>

            <div>
              <h4 className="text-slate-100 font-medium mb-4">Quick Links</h4>
              <nav className="space-y-2">
                <Link
                  href="/"
                  className="block text-slate-400 hover:text-slate-100 transition-colors"
                >
                  Home
                </Link>
              </nav>
            </div>

            <div>
              <h4 className="text-slate-100 font-medium mb-4">Connect</h4>
              <div className="flex space-x-4">
                <button
                  type="button"
                  className="text-slate-400 hover:text-slate-100 transition-colors disabled:opacity-50"
                  aria-label="GitHub (Coming soon)"
                  disabled
                >
                  <Github className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  className="text-slate-400 hover:text-slate-100 transition-colors disabled:opacity-50"
                  aria-label="Twitter (Coming soon)"
                  disabled
                >
                  <Twitter className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  className="text-slate-400 hover:text-slate-100 transition-colors disabled:opacity-50"
                  aria-label="LinkedIn (Coming soon)"
                  disabled
                >
                  <Linkedin className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  className="text-slate-400 hover:text-slate-100 transition-colors disabled:opacity-50"
                  aria-label="Instagram (Coming soon)"
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
            © 2025 radiant. All rights reserved.
          </div>
        </div>
      </Container>
    </footer>
  );
}
