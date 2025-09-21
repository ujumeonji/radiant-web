"use client";

import { PostsDocument } from "@/graphql/generated/graphql";
import { Post } from "@/types/post";
import { useQuery } from "@apollo/client";
import { useTranslations } from "next-intl";
import { useState, useRef, useCallback, useEffect } from "react";
import PostCard from "./PostCard";

interface PostListProps {
  initialFirst?: number;
}

export default function PostList({ initialFirst = 10 }: PostListProps) {
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const observerRef = useRef<HTMLDivElement>(null);
  const t = useTranslations();

  const { data, loading, error, fetchMore } = useQuery(PostsDocument, {
    variables: { first: initialFirst },
    notifyOnNetworkStatusChange: true,
    onCompleted: (data) => {
      setHasMore(data.posts.pageInfo.hasNextPage);
    },
  });

  const loadMore = useCallback(async () => {
    if (!hasMore || loading || isLoadingMore) return;

    setIsLoadingMore(true);
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
    } finally {
      setIsLoadingMore(false);
    }
  }, [
    hasMore,
    loading,
    isLoadingMore,
    fetchMore,
    data?.posts.pageInfo.endCursor,
    initialFirst,
  ]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && hasMore && !loading && !isLoadingMore) {
          loadMore();
        }
      },
      {
        rootMargin: "100px",
        threshold: 0.1,
      },
    );

    const currentObserverRef = observerRef.current;
    if (currentObserverRef) {
      observer.observe(currentObserverRef);
    }

    return () => {
      if (currentObserverRef) {
        observer.unobserve(currentObserverRef);
      }
    };
  }, [hasMore, loading, isLoadingMore, loadMore]);

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
      <section className="flex-1" role="main" aria-label={t("post.postList")}>
        {loadingSkeleton}
      </section>
    );
  }

  if (error) {
    return (
      <section className="flex-1" role="main" aria-label={t("post.postList")}>
        <section
          className="text-center py-8 text-gray-500"
          role="alert"
          aria-live="polite"
        >
          <h2 className="sr-only">{t("error.errorOccurred")}</h2>
          <p>{t("post.failedToLoad")}</p>
        </section>
      </section>
    );
  }

  const posts = data?.posts.edges.map((edge) => edge.node) || [];

  return (
    <main className="flex-1" role="main" aria-label={t("post.postList")}>
      <section
        className="space-y-6"
        aria-label={t("post.totalPosts", { count: posts.length })}
      >
        {posts.map((post: Post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </section>

      {hasMore && (
        <div
          ref={observerRef}
          className="flex justify-center py-8"
          aria-live="polite"
          aria-label={t("post.loadingMorePosts")}
        >
          {isLoadingMore && (
            <div className="flex items-center gap-2 text-gray-500">
              <div className="animate-spin h-5 w-5 border-2 border-gray-300 border-t-slate-800 rounded-full"></div>
              <span>{t("common.loading")}</span>
            </div>
          )}
        </div>
      )}

      {!hasMore && posts.length > 0 && (
        <footer className="text-center py-8 text-gray-500" role="contentinfo">
          <p aria-live="polite">{t("post.allPostsLoaded")}</p>
        </footer>
      )}
    </main>
  );
}
