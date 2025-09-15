"use client";

import { GetPostQuery } from "@/graphql/generated/graphql";
import { useTranslations } from "next-intl";

type ViewMode = "korean" | "original" | "both";

interface PostContentProps {
  post: NonNullable<GetPostQuery["post"]>;
  viewMode: ViewMode;
  showHighlight: boolean;
}

export default function PostContent({ post, viewMode }: PostContentProps) {
  const t = useTranslations("postDetail");

  const renderEditableContent = (content: string) => {
    const paragraphs = content.split("\n\n").filter((p) => p.trim());

    return paragraphs.map((paragraph, index) => (
      <div key={index} className="mb-8">
        <div className="group relative">
          <p>{paragraph}</p>
          <button
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground absolute top-0 -right-12 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
            title={t("editSuggestion")}
            aria-label={t("editSuggestion")}
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
              className="h-4 w-4 text-gray-500"
            >
              <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
              <path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"></path>
            </svg>
          </button>
        </div>
      </div>
    ));
  };

  const renderBothView = () => (
    <div className="grid md:grid-cols-2 gap-8">
      <section className="space-y-8" aria-labelledby="korean-content-heading">
        <h2
          id="korean-content-heading"
          className="text-lg font-semibold text-gray-900 mb-4 border-b pb-2"
        >
          {t("koreanContent")}
        </h2>
        <article className="prose prose-lg max-w-none prose-slate" lang="ko">
          {renderEditableContent(
            post.body || t("translatedContentPlaceholder"),
          )}
        </article>
      </section>
      <section className="space-y-8" aria-labelledby="original-content-heading">
        <h2
          id="original-content-heading"
          className="text-lg font-semibold text-gray-900 mb-4 border-b pb-2"
        >
          {t("originalContent")}
        </h2>
        <article className="prose prose-lg max-w-none prose-slate" lang="en">
          {renderEditableContent(post.body || t("originalContentPlaceholder"))}
        </article>
      </section>
    </div>
  );

  const getContent = () => {
    if (viewMode === "both") return renderBothView();

    const content = post.body || t("contentLoading");

    return (
      <article className="prose prose-lg max-w-none prose-slate">
        {renderEditableContent(content)}
      </article>
    );
  };

  return getContent();
}
