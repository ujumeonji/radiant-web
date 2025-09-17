"use client";

import { PopularTopicsDocument } from "@/graphql/generated/graphql";
import { useQueryStates } from "@/lib/hooks/useQueryStates";
import QueryWrapper from "@/components/ui/QueryWrapper";
import { Link } from "@/i18n/routing";
import { useQuery } from "@apollo/client";
import { useTranslations } from "next-intl";

export default function PopularTopics() {
  const t = useTranslations();
  const queryResult = useQuery(PopularTopicsDocument, {
    variables: { first: 5 },
  });

  const {
    data: topics,
    isLoading,
    hasError,
    isEmpty,
  } = useQueryStates(queryResult, (data) =>
    data.popularTopics.edges.map((edge) => edge.node),
  );

  return (
    <QueryWrapper
      isLoading={isLoading}
      hasError={hasError}
      isEmpty={isEmpty}
      title={t("sidebar.popularTopics")}
      emptyMessage={t("sidebar.noPopularTopics")}
    >
      <div className="space-y-3">
        {topics?.map((topic) => (
          <Link
            key={topic.slug}
            href={{ pathname: "/topics/[slug]", params: { slug: topic.slug } }}
            className="group block"
          >
            <div className="flex items-center justify-between py-2 hover:bg-gray-50 transition-colors rounded">
              <span className="text-sm font-medium text-gray-700 group-hover:text-slate-800">
                {topic.name}
              </span>
              <span className="text-xs text-gray-500">
                {topic.postsCount} posts
              </span>
            </div>
          </Link>
        ))}
      </div>
    </QueryWrapper>
  );
}
