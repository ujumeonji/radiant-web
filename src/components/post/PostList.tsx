"use client";

import { PostsDocument } from "@/graphql/generated/graphql";
import { Post } from "@/types/post";
import { useQuery } from "@apollo/client";
import { useTranslations } from "next-intl";
import { useState } from "react";
import PostCard from "./PostCard";

interface PostListProps {
  initialFirst?: number;
}

export default function PostList({ initialFirst = 10 }: PostListProps) {
  const [hasMore, setHasMore] = useState(true);
  const t = useTranslations();

  const { data, loading, error, fetchMore } = useQuery(PostsDocument, {
    variables: { first: initialFirst },
    notifyOnNetworkStatusChange: true,
    onCompleted: (data) => {
      setHasMore(data.posts.pageInfo.hasNextPage);
    },
  });

  const loadMore = async () => {
    if (!hasMore || loading) return;

    try {
      const result = await fetchMore({
        variables: {
          after: data?.posts.pageInfo.endCursor,
          first: initialFirst,
        },
      });

      setHasMore(result.data.posts.pageInfo.hasNextPage);
    } catch (err) {
      console.error("Failed to load more posts:", err);
    }
  };

  const loadingSkeleton = (
    <section
      className="space-y-6"
      aria-live="polite"
      aria-label={t("post.loading")}
      role="status"
    >
      {Array.from({ length: 3 }).map((_, i) => (
        <article
          key={i}
          className="animate-pulse"
          aria-label={t("post.postLoading", { index: i + 1 })}
        >
          <div
            className="h-48 bg-gray-200 rounded-lg mb-4"
            role="presentation"
          ></div>
          <div className="space-y-3">
            <div
              className="h-6 bg-gray-200 rounded w-3/4"
              role="presentation"
            ></div>
            <div
              className="h-4 bg-gray-200 rounded w-full"
              role="presentation"
            ></div>
            <div
              className="h-4 bg-gray-200 rounded w-2/3"
              role="presentation"
            ></div>
            <div className="flex justify-between">
              <div
                className="h-4 bg-gray-200 rounded w-24"
                role="presentation"
              ></div>
              <div
                className="h-4 bg-gray-200 rounded w-16"
                role="presentation"
              ></div>
            </div>
          </div>
        </article>
      ))}
    </section>
  );

  if (loading && !data) {
    return (
      <main
        className="flex-1 max-w-3xl"
        role="main"
        aria-label={t("post.postList")}
      >
        {loadingSkeleton}
      </main>
    );
  }

  if (error) {
    return (
      <main
        className="flex-1 max-w-3xl"
        role="main"
        aria-label={t("post.postList")}
      >
        <section
          className="text-center py-8 text-gray-500"
          role="alert"
          aria-live="polite"
        >
          <h2 className="sr-only">{t("error.errorOccurred")}</h2>
          <p>{t("post.failedToLoad")}</p>
        </section>
      </main>
    );
  }

  const posts = data?.posts.edges.map((edge) => edge.node) || [];

  return (
    <main
      className="flex-1 max-w-3xl"
      role="main"
      aria-label={t("post.postList")}
    >
      <section
        className="space-y-6"
        aria-label={t("post.totalPosts", { count: posts.length })}
      >
        {posts.map((post: Post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </section>

      {hasMore && (
        <nav
          className="text-center py-8"
          role="navigation"
          aria-label={t("error.morePostsNavigation")}
        >
          <button
            type="button"
            onClick={loadMore}
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            aria-label={
              loading ? t("post.loadingMorePosts") : t("post.loadMorePosts")
            }
            aria-describedby={loading ? "loading-status" : undefined}
          >
            {loading ? t("common.loading") : t("common.loadMore")}
          </button>
          {loading && (
            <div id="loading-status" className="sr-only" aria-live="polite">
              {t("post.loadingMoreDescription")}
            </div>
          )}
        </nav>
      )}

      {!hasMore && posts.length > 0 && (
        <footer className="text-center py-8 text-gray-500" role="contentinfo">
          <p aria-live="polite">{t("post.allPostsLoaded")}</p>
        </footer>
      )}
    </main>
  );
}
