// Locale-aware date formatting utilities

const localeFormats: Record<string, Intl.DateTimeFormatOptions> = {
  ko: {
    year: "numeric",
    month: "long",
    day: "numeric",
  },
  ja: {
    year: "numeric",
    month: "long",
    day: "numeric",
  },
  zh: {
    year: "numeric",
    month: "long",
    day: "numeric",
  },
  en: {
    year: "numeric",
    month: "long",
    day: "numeric",
  },
};

export function formatDate(date: string | Date, locale: string = "ko"): string {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  const format = localeFormats[locale] || localeFormats.ko;

  return dateObj.toLocaleDateString(locale, format);
}

export function formatDateForAriaLabel(
  date: string | Date,
  locale: string = "ko",
  t: (key: string, params?: Record<string, unknown>) => string,
): string {
  const formattedDate = formatDate(date, locale);
  return t("post.publishedDate", { date: formattedDate });
}
