"use client";

import { PopularTopicsDocument } from "@/graphql/generated/graphql";
import { useQuery } from "@apollo/client";
import Link from "next/link";

export default function PopularTopics() {
  const { data, loading, error } = useQuery(PopularTopicsDocument, {
    variables: { limit: 5 },
  });
  if (loading) {
    return (
      <div className="bg-white">
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Popular Topics
          </h2>
          <div className="animate-pulse">Loading...</div>
        </div>
      </div>
    );
  }

  if (error || !data?.popularTopics.length) {
    return (
      <div className="bg-white">
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Popular Topics
          </h2>
          <div className="space-y-3">
            <div className="text-gray-500 text-sm text-center py-8">
              No popular topics available
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Popular Topics</h2>

        <div className="space-y-3">
          {data.popularTopics.map((topic) => (
            <Link
              key={topic.slug}
              href={`/topics/${topic.slug}`}
              className="group block"
            >
              <div className="flex items-center justify-between py-2 hover:bg-gray-50 transition-colors rounded">
                <span className="text-sm font-medium text-gray-700 group-hover:text-slate-800">
                  {topic.name}
                </span>
                <span className="text-xs text-gray-500">
                  {topic.postCount} posts
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
