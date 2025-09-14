"use client";

import Container from "@/components/ui/Container";
import { Link } from "@/i18n/routing";
import { Home, ArrowLeft, Search } from "lucide-react";
import { useTranslations } from "next-intl";

export default function NotFoundPage() {
  const t = useTranslations();

  return (
    <main role="main" aria-labelledby="error-title" className="flex-1">
      <Container>
        <section className="py-16">
          <div className="max-w-2xl mx-auto text-center">
            <header className="mb-8">
              <h1
                id="error-title"
                className="text-9xl font-bold text-gray-200 mb-4"
                aria-label={`404 ${t("error.pageNotFound")}`}
              >
                404
              </h1>
              <div
                className="w-24 h-1 bg-slate-800 mx-auto mb-6"
                role="presentation"
              ></div>
            </header>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {t("error.pageNotFound")}
              </h2>
              <p className="text-lg text-gray-600 mb-2">
                {t("error.pageNotFoundDescription")}
              </p>
              <p className="text-gray-500">{t("error.checkUrlOrNavigate")}</p>
            </section>

            <nav aria-label={t("error.errorNavigation")} className="mb-16">
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  href="/"
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white flex items-center gap-2"
                  aria-label={t("error.homePageLabel")}
                >
                  <Home className="w-4 h-4" aria-hidden="true" />
                  {t("error.backToHome")}
                </Link>
                <button
                  type="button"
                  onClick={() => window.history.back()}
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border hover:text-accent-foreground h-10 px-4 py-2 border-slate-800 text-slate-800 hover:bg-slate-50 bg-transparent flex items-center gap-2"
                  aria-label={t("error.previousPageLabel")}
                >
                  <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                  {t("error.goToPrevious")}
                </button>
              </div>
            </nav>

            <aside
              className="border-t border-gray-200 pt-12"
              aria-labelledby="suggestions-title"
            >
              <h3
                id="suggestions-title"
                className="text-xl font-semibold text-gray-900 mb-6"
              >
                {t("error.suggestedPages")}
              </h3>
              <nav
                aria-label={t("error.recommendedPages")}
                className="grid sm:grid-cols-2 gap-6"
              >
                <Link
                  href="/"
                  className="group p-6 border border-gray-200 rounded-lg hover:border-slate-800 hover:shadow-md transition-all"
                  aria-label={t("error.latestPostsPageLabel")}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center"
                      aria-hidden="true"
                    >
                      <Home className="w-5 h-5 text-white" />
                    </div>
                    <h4 className="font-semibold text-gray-900 group-hover:text-slate-800">
                      {t("error.latestPosts")}
                    </h4>
                  </div>
                  <p className="text-sm text-gray-600">
                    {t("error.latestPostsDescription")}
                  </p>
                </Link>

                <div
                  className="group p-6 border border-gray-200 rounded-lg hover:border-slate-800 hover:shadow-md transition-all cursor-not-allowed opacity-75"
                  role="button"
                  aria-disabled="true"
                  aria-label={t("error.searchFeatureDisabled")}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center"
                      aria-hidden="true"
                    >
                      <Search className="w-5 h-5 text-white" />
                    </div>
                    <h4 className="font-semibold text-gray-900 group-hover:text-slate-800">
                      {t("error.search")}
                    </h4>
                  </div>
                  <p className="text-sm text-gray-600">
                    {t("error.searchDescription")}
                  </p>
                </div>
              </nav>
            </aside>
          </div>
        </section>
      </Container>
    </main>
  );
}
