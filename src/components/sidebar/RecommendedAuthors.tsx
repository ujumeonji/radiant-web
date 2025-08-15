"use client";

import { RecommendedAuthorsDocument } from "@/graphql/generated/graphql";
import { useQuery } from "@apollo/client";
import Link from "next/link";

export default function RecommendedAuthors() {
  const { data, loading, error } = useQuery(RecommendedAuthorsDocument, {
    variables: { limit: 3 },
  });
  const formatFollowers = (count: number): string => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  if (loading) {
    return (
      <div className="bg-white">
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Recommended Authors
          </h2>
          <div className="animate-pulse">Loading...</div>
        </div>
      </div>
    );
  }

  if (error || !data?.recommendedAuthors.length) {
    return (
      <div className="bg-white">
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Recommended Authors
          </h2>
          <div className="space-y-4">
            <div className="text-gray-500 text-sm text-center py-8">
              No recommended authors available
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">
          Recommended Authors
        </h2>

        <div className="space-y-4">
          {data.recommendedAuthors.map((author) => (
            <Link
              key={author.id}
              href={`/authors/${author.username}`}
              className="group block"
            >
              <div className="flex items-center gap-3 py-2 hover:bg-gray-50 transition-colors rounded">
                {author.avatar ? (
                  <img
                    src={author.avatar}
                    alt={author.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    {author.name.charAt(0)}
                  </div>
                )}

                <div className="flex-1">
                  <p className="font-medium text-sm text-gray-900 group-hover:text-slate-800">
                    {author.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {formatFollowers(author.followersCount)} followers
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
