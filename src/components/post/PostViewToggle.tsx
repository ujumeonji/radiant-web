"use client";

import { useTranslations } from "next-intl";

type ViewMode = "korean" | "original" | "both";

interface PostViewToggleProps {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  showHighlight: boolean;
  setShowHighlight: (show: boolean) => void;
}

export default function PostViewToggle({
  viewMode,
  setViewMode,
  showHighlight,
  setShowHighlight,
}: PostViewToggleProps) {
  const t = useTranslations("postDetail");

  return (
    <section
      className="sticky top-[65px] bg-white/80 backdrop-blur-sm z-10 py-3 mb-6 border-t"
      aria-label={t("viewModeControls")}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span
            id="view-mode-label"
            className="text-sm font-semibold text-gray-700"
          >
            {t("viewMode")}
          </span>
          <button
            className={`inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input h-9 rounded-md px-3 text-xs ${
              showHighlight
                ? "bg-gradient-to-br from-slate-700 to-slate-800 text-white border-slate-600 hover:from-slate-600 hover:to-slate-700 hover:text-white"
                : "bg-background hover:bg-accent hover:text-accent-foreground"
            }`}
            onClick={() => setShowHighlight(!showHighlight)}
            aria-pressed={showHighlight}
            aria-label={t("toggleHighlight")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-3 h-3 mr-1"
            >
              <path d="m9 11-6 6v3h9l3-3"></path>
              <path d="m22 12-4.6 4.6a2 2 0 0 1-2.8 0l-5.2-5.2a2 2 0 0 1 0-2.8L14 4"></path>
            </svg>
            {t("highlight")}
          </button>
        </div>
        <fieldset className="flex items-center p-1 bg-gray-100 rounded-lg">
          <legend className="sr-only">{t("selectViewMode")}</legend>
          <button
            className={`inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-9 rounded-md px-3 hover:text-gray-800 ${
              viewMode === "korean"
                ? "bg-white text-gray-800 shadow-sm hover:bg-white"
                : "text-gray-600 hover:bg-accent"
            }`}
            onClick={() => setViewMode("korean")}
            aria-pressed={viewMode === "korean"}
          >
            {t("korean")}
          </button>
          <button
            className={`inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent h-9 rounded-md px-3 ${
              viewMode === "original"
                ? "bg-white text-gray-800 shadow-sm hover:bg-white"
                : "text-gray-600 hover:text-gray-800"
            }`}
            onClick={() => setViewMode("original")}
            aria-pressed={viewMode === "original"}
          >
            {t("original")}
          </button>
          <button
            className={`items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent h-9 rounded-md px-3 hidden md:inline-flex ${
              viewMode === "both"
                ? "bg-white text-gray-800 shadow-sm hover:bg-white"
                : "text-gray-600 hover:text-gray-800"
            }`}
            onClick={() => setViewMode("both")}
            aria-pressed={viewMode === "both"}
          >
            {t("viewTogether")}
          </button>
        </fieldset>
      </div>
    </section>
  );
}
