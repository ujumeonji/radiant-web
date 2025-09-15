"use client";

import { GetPostQuery } from "@/graphql/generated/graphql";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { formatDate } from "@/lib/date-format";
import { useLocale } from "next-intl";

interface PostAuthorInfoProps {
  post: NonNullable<GetPostQuery["post"]>;
}

export default function PostAuthorInfo({ post }: PostAuthorInfoProps) {
  const t = useTranslations("postDetail");
  const locale = useLocale();
  const formattedDate = formatDate(post.createdAt, locale);

  return (
    <aside className="space-y-6 mb-6" aria-label={t("postAuthorInfo")}>
      <section
        className="bg-gray-50 rounded-lg p-4"
        aria-labelledby="original-author-heading"
      >
        <header className="flex items-center justify-between mb-3">
          <h3
            id="original-author-heading"
            className="flex items-center gap-3 text-sm font-semibold text-gray-700"
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
              className="w-4 h-4 text-gray-600"
              aria-hidden="true"
            >
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            {t("originalAuthor")}
          </h3>
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3 text-xs bg-transparent"
            href="#"
            aria-label={t("viewOriginalPost")}
          >
            {t("viewOriginal")}
          </a>
        </header>
        <address className="flex items-center gap-3 not-italic">
          <div className="relative flex shrink-0 overflow-hidden rounded-full h-10 w-10">
            <Image
              className="aspect-square h-full w-full"
              alt={`${post.author?.name || t("unknownAuthor")} avatar`}
              src={post.author?.avatar || "/react-logo.png"}
              width={40}
              height={40}
            />
          </div>
          <div>
            <p className="font-medium text-gray-900">
              {post.author?.name || t("unknownAuthor")}
            </p>
            <p className="text-sm text-gray-600">@{post.author?.username}</p>
            <time className="text-xs text-gray-500" dateTime={post.createdAt}>
              {t("originalPublishedDate", { date: formattedDate })}
            </time>
          </div>
        </address>
      </section>

      <section
        className="bg-blue-50 rounded-lg p-4"
        aria-labelledby="translation-contributors-heading"
      >
        <header className="flex items-center gap-3 mb-3">
          <h3
            id="translation-contributors-heading"
            className="flex items-center gap-3 text-sm font-semibold text-blue-700"
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
              className="w-4 h-4 text-blue-600"
              aria-hidden="true"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
            {t("translationContributors")}
          </h3>
          <time className="text-xs text-blue-600" dateTime={post.createdAt}>
            {t("translationDate", { date: formatDate(post.createdAt, locale) })}
          </time>
        </header>
        <ul
          className="flex items-center space-x-[-8px]"
          role="list"
          aria-label={t("participantsList")}
        >
          {post.participants.slice(0, 4).map((participant) => (
            <li
              key={participant.id}
              className="relative flex shrink-0 overflow-hidden rounded-full h-8 w-8 border-2 border-white hover:z-10 transition-transform hover:scale-110"
            >
              <Image
                className="aspect-square h-full w-full"
                alt={`${participant.name} avatar`}
                src={participant.avatar || "/react-logo.png"}
                width={32}
                height={32}
                title={participant.name}
              />
            </li>
          ))}
          {post.participants.length > 4 && (
            <li
              className="relative flex shrink-0 overflow-hidden rounded-full h-8 w-8 border-2 border-white bg-gray-200 text-xs font-medium text-gray-600 items-center justify-center"
              title={t("moreParticipants", {
                count: post.participants.length - 4,
              })}
              aria-label={t("moreParticipants", {
                count: post.participants.length - 4,
              })}
            >
              +{post.participants.length - 4}
            </li>
          )}
        </ul>
      </section>
    </aside>
  );
}
