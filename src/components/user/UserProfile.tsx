"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { formatDate } from "@/lib/date-format";
import Image from "next/image";
import Link from "next/link";
import { Post } from "@/types/post";

interface User {
  id: string;
  username: string;
  name: string;
  avatarUrl?: string;
  bio?: string;
  location?: string;
  websiteUrl?: string;
  joinedAt: string;
  postsCount: number;
  viewsCount: number;
  followersCount: number;
  followingCount: number;
  professionalFields: string[];
}

interface UserProfileProps {
  user: User;
  posts: Post[];
  isLoadingPosts: boolean;
  postsError?: Error;
}

export default function UserProfile({
  user,
  posts,
  isLoadingPosts,
  postsError,
}: UserProfileProps) {
  const t = useTranslations();
  const locale = useLocale();
  const [activeTab, setActiveTab] = useState<
    "posts" | "activity" | "followers" | "following"
  >("posts");

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num.toString();
  };

  const joinedDate = formatDate(user.joinedAt, locale);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Profile Header */}
      <header className="text-center mb-12">
        <figure className="mb-6">
          <Image
            src={user.avatarUrl || "/default-avatar.png"}
            alt={`${user.name} profile picture`}
            width={96}
            height={96}
            className="w-24 h-24 rounded-full mx-auto object-cover"
          />
        </figure>

        <div className="mb-6">
          <h1 className="text-3xl font-medium text-gray-900 mb-2">
            {user.name}
          </h1>
          <p className="text-gray-500 mb-6">@{user.username}</p>
        </div>

        <div className="flex items-center justify-center gap-3 mb-8">
          <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-10 px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white">
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
              className="w-4 h-4 mr-2"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <line x1="19" x2="19" y1="8" y2="14"></line>
              <line x1="22" x2="16" y1="11" y2="11"></line>
            </svg>
            {t("profile.follow")}
          </button>

          <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 bg-transparent">
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
              className="w-4 h-4"
            >
              <circle cx="18" cy="5" r="3"></circle>
              <circle cx="6" cy="12" r="3"></circle>
              <circle cx="18" cy="19" r="3"></circle>
              <line x1="8.59" x2="15.42" y1="13.51" y2="17.49"></line>
              <line x1="15.41" x2="8.59" y1="6.51" y2="10.49"></line>
            </svg>
          </button>
        </div>

        {/* User Stats */}
        <section
          className="flex items-center justify-center gap-8 text-sm"
          aria-label={t("profile.userStats")}
        >
          <div className="text-center">
            <div className="font-medium text-gray-900">{user.postsCount}</div>
            <div className="text-gray-600">{t("profile.translatedPosts")}</div>
          </div>
          <div className="text-center">
            <div className="font-medium text-gray-900">
              {formatNumber(user.followersCount)}
            </div>
            <div className="text-gray-600">{t("profile.followers")}</div>
          </div>
          <div className="text-center">
            <div className="font-medium text-gray-900">
              {formatNumber(user.followingCount)}
            </div>
            <div className="text-gray-600">{t("profile.following")}</div>
          </div>
        </section>
      </header>

      {/* Bio Section */}
      {user.bio && (
        <section className="mb-12">
          <p className="text-gray-700 leading-relaxed text-center">
            {user.bio}
          </p>
        </section>
      )}

      {/* User Info */}
      <section className="flex items-center justify-center gap-6 text-sm text-gray-600 mb-12">
        {user.location && (
          <div className="flex items-center gap-1">
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
              className="w-4 h-4"
            >
              <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            <span>{user.location}</span>
          </div>
        )}

        <div className="flex items-center gap-1">
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
            className="w-4 h-4"
          >
            <path d="M8 2v4"></path>
            <path d="M16 2v4"></path>
            <rect width="18" height="18" x="3" y="4" rx="2"></rect>
            <path d="M3 10h18"></path>
          </svg>
          <span>
            {joinedDate} {t("profile.joined")}
          </span>
        </div>

        {user.websiteUrl && (
          <div className="flex items-center gap-1">
            <Link
              href={user.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-900 hover:text-gray-700 flex items-center gap-1"
            >
              {t("profile.website")}
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
                className="w-3 h-3"
              >
                <path d="M15 3h6v6"></path>
                <path d="M10 14 21 3"></path>
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
              </svg>
            </Link>
          </div>
        )}
      </section>

      {/* Tabs Navigation */}
      <nav
        className="flex items-center justify-center gap-8 mb-12"
        role="tablist"
      >
        <button
          className={`text-sm font-medium pb-2 border-b-2 transition-colors ${
            activeTab === "posts"
              ? "text-gray-900 border-gray-900"
              : "text-gray-500 border-transparent hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("posts")}
          role="tab"
          aria-selected={activeTab === "posts"}
        >
          {t("profile.translatedPosts")}
        </button>
        <button
          className={`text-sm font-medium pb-2 border-b-2 transition-colors ${
            activeTab === "activity"
              ? "text-gray-900 border-gray-900"
              : "text-gray-500 border-transparent hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("activity")}
          role="tab"
          aria-selected={activeTab === "activity"}
        >
          {t("profile.activity")}
        </button>
        <button
          className={`text-sm font-medium pb-2 border-b-2 transition-colors ${
            activeTab === "followers"
              ? "text-gray-900 border-gray-900"
              : "text-gray-500 border-transparent hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("followers")}
          role="tab"
          aria-selected={activeTab === "followers"}
        >
          {t("profile.followers")}
        </button>
        <button
          className={`text-sm font-medium pb-2 border-b-2 transition-colors ${
            activeTab === "following"
              ? "text-gray-900 border-gray-900"
              : "text-gray-500 border-transparent hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("following")}
          role="tab"
          aria-selected={activeTab === "following"}
        >
          {t("profile.following")}
        </button>
      </nav>

      {/* Content Section */}
      <section role="tabpanel">
        {activeTab === "posts" && (
          <div>
            {isLoadingPosts ? (
              <div className="space-y-8">
                {Array.from({ length: 3 }).map((_, i) => (
                  <article
                    key={i}
                    className="animate-pulse pb-6 border-b border-gray-100 last:border-b-0"
                  >
                    <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="h-3 bg-gray-200 rounded w-20"></div>
                        <div className="h-3 bg-gray-200 rounded w-16"></div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="h-3 bg-gray-200 rounded w-16"></div>
                        <div className="h-3 bg-gray-200 rounded w-16"></div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : postsError ? (
              <div className="text-center text-gray-500 py-8">
                {t("profile.errorLoadingPosts")}
              </div>
            ) : posts.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                {t("profile.noPostsYet")}
              </div>
            ) : (
              <div className="space-y-8">
                {posts.map((post) => (
                  <article
                    key={post.id}
                    className="pb-6 border-b border-gray-100 last:border-b-0"
                  >
                    <Link
                      href={`/${locale}/posts/${post.id}`}
                      className="block group"
                    >
                      <h3 className="text-lg font-medium text-gray-900 group-hover:text-gray-700 mb-2">
                        {post.translatedTitle || post.title}
                      </h3>
                      <p className="text-gray-500 text-sm mb-4 italic">
                        {post.title}
                      </p>
                    </Link>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center gap-4">
                        <span>{formatDate(post.createdAt, locale)}</span>
                        <span>·</span>
                        <span>
                          {t("profile.readingTime", {
                            minutes: Math.ceil(
                              post.translatedSentences?.length || 5 / 2,
                            ),
                          })}
                        </span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span>
                          {post.likesCount} {t("profile.likes")}
                        </span>
                        <span>·</span>
                        <span>
                          {formatNumber(
                            Math.floor(Math.random() * 5000) + 1000,
                          )}{" "}
                          {t("profile.views")}
                        </span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "activity" && (
          <div className="text-center text-gray-500 py-8">
            {t("profile.activityComingSoon")}
          </div>
        )}

        {activeTab === "followers" && (
          <div className="text-center text-gray-500 py-8">
            {t("profile.followersComingSoon")}
          </div>
        )}

        {activeTab === "following" && (
          <div className="text-center text-gray-500 py-8">
            {t("profile.followingComingSoon")}
          </div>
        )}
      </section>
    </div>
  );
}
