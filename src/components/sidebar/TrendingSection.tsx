"use client";

import { TrendingPostsDocument } from "@/graphql/generated/graphql";
import { useQuery } from "@apollo/client";
import { MessageCircle, ThumbsUp, TrendingUp } from "lucide-react";
import Link from "next/link";

export default function TrendingSection() {
  const { data, loading, error } = useQuery(TrendingPostsDocument, {
    variables: { limit: 5 },
  });
  if (loading)
    return (
      <div className="bg-white p-6">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  if (error || !data?.trendingPosts.length) {
    return (
      <div className="bg-white">
        <div className="p-6">
          <h2 className="flex items-center gap-2 text-xl font-bold text-gray-900 mb-6">
            <TrendingUp className="w-5 h-5 text-slate-800" />
            Trending
          </h2>
          <div className="space-y-6">
            <div className="text-gray-500 text-sm text-center py-8">
              No trending posts available
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <div className="p-6">
        <h2 className="flex items-center gap-2 text-xl font-bold text-gray-900 mb-6">
          <TrendingUp className="w-5 h-5 text-slate-800" />
          Trending
        </h2>

        <div className="space-y-6">
          {data?.trendingPosts.map((post, index) => (
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
      </div>
    </div>
  );
}
