"use client";

import { TrendingPostsDocument } from "@/graphql/generated/graphql";
import { useQueryStates } from "@/lib/hooks/useQueryStates";
import QueryWrapper from "@/components/ui/QueryWrapper";
import { useQuery } from "@apollo/client";
import { MessageCircle, ThumbsUp, TrendingUp } from "lucide-react";
import Link from "next/link";

export default function TrendingSection() {
  const queryResult = useQuery(TrendingPostsDocument, {
    variables: { limit: 5 },
  });

  const {
    data: posts,
    isLoading,
    hasError,
    isEmpty,
  } = useQueryStates(queryResult, (data) => data.trendingPosts);

  const title = (
    <div className="flex items-center gap-2">
      <TrendingUp className="w-5 h-5 text-slate-800" />
      <span>Trending</span>
    </div>
  );

  return (
    <QueryWrapper
      isLoading={isLoading}
      hasError={hasError}
      isEmpty={isEmpty}
      title={title}
      emptyMessage="No trending posts available"
    >
      <div className="space-y-6">
        {posts?.map((post, index) => (
          <Link
            key={post.id}
            href={`/posts/${post.id}`}
            className="group block"
          >
            <div className="flex gap-4 pb-6 border-b border-gray-100 last:border-b-0 last:pb-0">
              <div className="flex-shrink-0">
                <span className="text-2xl font-bold text-gray-300">
                  {(index + 1).toString().padStart(2, "0")}
                </span>
              </div>

              <div className="flex-1 min-w-0">
                <div className="mb-2">
                  <span className="text-xs text-gray-500 font-medium">
                    by {post.author?.name || post.author?.username}
                  </span>
                </div>

                <h3 className="font-bold text-gray-900 group-hover:text-slate-800 transition-colors line-clamp-2 mb-2 leading-tight">
                  {post.title}
                </h3>

                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <ThumbsUp className="w-3 h-3" />
                    {post.likes}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle className="w-3 h-3" />
                    {post.commentsCount}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </QueryWrapper>
  );
}
