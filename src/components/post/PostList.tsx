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
    <div className="space-y-6">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
          <div className="space-y-3">
            <div className="h-6 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            <div className="flex justify-between">
              <div className="h-4 bg-gray-200 rounded w-24"></div>
              <div className="h-4 bg-gray-200 rounded w-16"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  if (loading && !data) {
    return <div className="flex-1 max-w-3xl">{loadingSkeleton}</div>;
  }

  if (error) {
    return (
      <div className="flex-1 max-w-3xl">
        <div className="text-center py-8 text-gray-500">No posts found.</div>
      </div>
    );
  }

  const posts = data?.posts.edges.map((edge) => edge.node) || [];

  return (
    <div className="flex-1 max-w-3xl">
      <div className="space-y-6">
        {posts.map((post: Post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      {hasMore && (
        <div className="text-center py-8">
          <button
            onClick={loadMore}
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Loading..." : "Load More"}
          </button>
        </div>
      )}

      {!hasMore && posts.length > 0 && (
        <div className="text-center py-8 text-gray-500">
          All posts have been loaded.
        </div>
      )}
    </div>
  );
}
