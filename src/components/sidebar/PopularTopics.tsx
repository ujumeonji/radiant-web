"use client";

import { PopularTopicsDocument } from "@/graphql/generated/graphql";
import { useQueryStates } from "@/lib/hooks/useQueryStates";
import QueryWrapper from "@/components/ui/QueryWrapper";
import { useQuery } from "@apollo/client";
import Link from "next/link";

export default function PopularTopics() {
  const queryResult = useQuery(PopularTopicsDocument, {
    variables: { limit: 5 },
  });

  const {
    data: topics,
    isLoading,
    hasError,
    isEmpty,
  } = useQueryStates(queryResult, (data) => data.popularTopics);

  return (
    <QueryWrapper
      isLoading={isLoading}
      hasError={hasError}
      isEmpty={isEmpty}
      title="Popular Topics"
      emptyMessage="No popular topics available"
    >
      <div className="space-y-3">
        {topics?.map((topic) => (
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
    </QueryWrapper>
  );
}
