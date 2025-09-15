"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { useLocale } from "next-intl";
import { useQuery } from "@apollo/client";
import { PostsDocument } from "@/graphql/generated/graphql";
import { formatDate } from "@/lib/date-format";

interface RelatedPostsProps {
  currentPostId: string;
}

export default function RelatedPosts({ currentPostId }: RelatedPostsProps) {
  const t = useTranslations("postDetail");
  const locale = useLocale();

  const { data, loading, error } = useQuery(PostsDocument, {
    variables: { first: 6 },
  });

  if (loading) {
    return (
      <section className="mt-16 pt-8 border-t border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          {t("relatedPosts")}
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="h-48 bg-gray-200 rounded-lg"></div>
            </div>
          ))}
        </div>
        <div className="text-center py-4 text-gray-500">
          {t("relatedPostsLoading")}
        </div>
      </section>
    );
  }

  if (error || !data?.posts?.edges) {
    return (
      <section className="mt-16 pt-8 border-t border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          {t("relatedPosts")}
        </h2>
        <div className="text-center py-8 text-gray-500">
          {t("relatedPostsError")}
        </div>
      </section>
    );
  }

  const relatedPosts = data.posts.edges
    .filter((edge) => edge.node.id !== currentPostId)
    .slice(0, 3)
    .map((edge) => edge.node);

  const getPostGradient = (index: number) => {
    const gradients = [
      { gradient: "from-slate-700 to-slate-800", textColor: "text-white" },
      {
        gradient: "from-gray-50 to-gray-100",
        textColor: "text-gray-900",
        border: "border border-gray-200",
      },
      { gradient: "from-slate-700 to-slate-800", textColor: "text-white" },
    ];
    return gradients[index % gradients.length];
  };

  return (
    <section className="mt-16 pt-8 border-t border-gray-200">
      <h2 className="text-2xl font-bold text-gray-900 mb-8">
        {t("relatedPosts")}
      </h2>
      <ul className="grid md:grid-cols-3 gap-6" role="list">
        {relatedPosts.map((post, index) => {
          const style = getPostGradient(index);
          const formattedDate = formatDate(post.createdAt, locale);

          return (
            <li key={post.id}>
              <article className="group block h-full">
                <Link
                  href={`/${locale}/posts/${post.id}`}
                  className="block h-full"
                  aria-label={`${t("readPost")}: ${post.title}`}
                >
                  <div
                    className={`p-6 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg relative overflow-hidden h-full flex flex-col bg-gradient-to-br ${style.gradient} ${style.textColor} ${style.border || ""}`}
                  >
                    <header className="mb-3">
                      <div
                        className={`text-sm font-medium ${style.textColor === "text-white" ? "text-slate-300" : "text-gray-500"}`}
                      >
                        <span>{t("tech")}</span>
                        <span aria-hidden="true"> • </span>
                        <time dateTime={post.createdAt}>{formattedDate}</time>
                      </div>
                    </header>
                    <div className="mb-4 flex-grow">
                      <h3 className="text-lg font-semibold mb-2 leading-tight">
                        {post.title}
                      </h3>
                      <p
                        className={`text-sm leading-relaxed ${style.textColor === "text-white" ? "text-slate-200" : "text-gray-600"}`}
                      >
                        {post.body?.substring(0, 100)}...
                      </p>
                    </div>
                    <footer className="flex items-center justify-between mt-auto">
                      <div className="flex items-center gap-2">
                        <address
                          className={`text-sm not-italic ${style.textColor === "text-white" ? "text-slate-300" : "text-gray-500"}`}
                        >
                          {post.author?.name || t("unknownAuthor")}
                        </address>
                        <span
                          className={`text-xs ${style.textColor === "text-white" ? "text-slate-400" : "text-gray-400"}`}
                          aria-hidden="true"
                        >
                          •{" "}
                          {t("readingTime", {
                            minutes: Math.ceil((post.body?.length || 0) / 500),
                          })}
                        </span>
                      </div>
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
                        className={`w-5 h-5 transition-transform group-hover:translate-x-1 ${style.textColor === "text-white" ? "text-slate-300" : "text-gray-500"}`}
                        aria-hidden="true"
                      >
                        <path d="M5 12h14"></path>
                        <path d="m12 5 7 7-7 7"></path>
                      </svg>
                    </footer>
                  </div>
                </Link>
              </article>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
