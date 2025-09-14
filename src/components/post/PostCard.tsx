"use client";

import { Post } from "@/types/post";
import { formatDate } from "@/lib/date-format";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const locale = useLocale();
  const t = useTranslations();

  const formattedDate = formatDate(post.createdAt, locale);
  const ariaLabelDate = t("post.publishedDate", { date: formattedDate });

  return (
    <article
      className="border-b border-gray-200 pb-6 mb-6 last:border-b-0"
      role="article"
      aria-labelledby={`post-title-${post.id}`}
    >
      {post.thumbnailUrl && (
        <figure className="mb-4">
          <Image
            src={post.thumbnailUrl}
            alt={t("post.thumbnailAlt", { title: post.title })}
            width={800}
            height={192}
            className="w-full h-48 object-cover rounded-lg"
            loading="lazy"
          />
        </figure>
      )}

      <div className="space-y-3">
        <header>
          <h2
            id={`post-title-${post.id}`}
            className="text-xl font-bold text-gray-900 line-clamp-2"
          >
            {post.title}
          </h2>
        </header>

        {post.body && (
          <section className="post-content">
            <p className="text-gray-600 line-clamp-3">{post.body}</p>
          </section>
        )}

        <footer className="flex items-center justify-between text-sm text-gray-500">
          <time dateTime={post.createdAt} aria-label={ariaLabelDate}>
            {formattedDate}
          </time>

          <div
            className="flex items-center space-x-4"
            role="group"
            aria-label={t("post.postInteractions")}
          >
            <div
              className="flex items-center space-x-1"
              role="group"
              aria-label={t("post.likesCount", { count: post.likes })}
            >
              <svg
                className="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
                role="presentation"
              >
                <path
                  fillRule="evenodd"
                  d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                  clipRule="evenodd"
                />
              </svg>
              <span aria-label={t("post.likes")}>{post.likes}</span>
            </div>

            <div
              className="flex items-center space-x-1"
              role="group"
              aria-label={t("post.commentsCount", {
                count: post.commentsCount,
              })}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
                role="presentation"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              <span aria-label={t("post.comments")}>{post.commentsCount}</span>
            </div>
          </div>
        </footer>
      </div>
    </article>
  );
}
