"use client";

import { PostsDocument } from "@/graphql/generated/graphql";
import { Post } from "@/types/post";
import { useQuery } from "@apollo/client";
import { useState } from "react";
import PostCard from "./PostCard";

interface PostListProps {
  initialFirst?: number;
}

export default function PostList({ initialFirst = 10 }: PostListProps) {
  const [hasMore, setHasMore] = useState(true);

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
      aria-label="포스트 로딩 중"
      role="status"
    >
      {Array.from({ length: 3 }).map((_, i) => (
        <article
          key={i}
          className="animate-pulse"
          aria-label={`포스트 ${i + 1} 로딩 중`}
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
      <main className="flex-1 max-w-3xl" role="main" aria-label="포스트 목록">
        {loadingSkeleton}
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex-1 max-w-3xl" role="main" aria-label="포스트 목록">
        <section
          className="text-center py-8 text-gray-500"
          role="alert"
          aria-live="polite"
        >
          <h2 className="sr-only">오류 발생</h2>
          <p>포스트를 불러오는데 실패했습니다.</p>
        </section>
      </main>
    );
  }

  const posts = data?.posts.edges.map((edge) => edge.node) || [];

  return (
    <main className="flex-1 max-w-3xl" role="main" aria-label="포스트 목록">
      <section
        className="space-y-6"
        aria-label={`총 ${posts.length}개의 포스트`}
      >
        {posts.map((post: Post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </section>

      {hasMore && (
        <nav
          className="text-center py-8"
          role="navigation"
          aria-label="더 많은 포스트 로드"
        >
          <button
            type="button"
            onClick={loadMore}
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            aria-label={
              loading ? "더 많은 포스트 로딩 중" : "더 많은 포스트 불러오기"
            }
            aria-describedby={loading ? "loading-status" : undefined}
          >
            {loading ? "로딩 중..." : "더 보기"}
          </button>
          {loading && (
            <div id="loading-status" className="sr-only" aria-live="polite">
              더 많은 포스트를 불러오고 있습니다.
            </div>
          )}
        </nav>
      )}

      {!hasMore && posts.length > 0 && (
        <footer className="text-center py-8 text-gray-500" role="contentinfo">
          <p aria-live="polite">모든 포스트를 불러왔습니다.</p>
        </footer>
      )}
    </main>
  );
}
