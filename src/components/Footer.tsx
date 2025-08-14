"use client";

import { Github, Instagram, Linkedin, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-200 mt-20">
      <div className="border-t-4 border-slate-800"></div>
      <div className="container mx-auto max-w-screen-lg px-4 sm:px-6 lg:px-8">
        <div className="py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="text-3xl font-bold tracking-tighter text-slate-50 mb-4">
                radiant
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
                <a
                  href="/"
                  className="block text-slate-400 hover:text-slate-100 transition-colors"
                >
                  Home
                </a>
              </nav>
            </div>

            <div>
              <h4 className="text-slate-100 font-medium mb-4">Connect</h4>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-slate-400 hover:text-slate-100 transition-colors"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="text-slate-400 hover:text-slate-100 transition-colors"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="text-slate-400 hover:text-slate-100 transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="text-slate-400 hover:text-slate-100 transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-700 py-6">
          <div className="text-center text-slate-500 text-sm">
            © 2025 radiant. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
