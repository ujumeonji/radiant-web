"use client";

import { RecommendedAuthorsDocument } from "@/graphql/generated/graphql";
import { useQueryStates } from "@/lib/hooks/useQueryStates";
import { formatFollowers } from "@/lib/utils";
import QueryWrapper from "@/components/ui/QueryWrapper";
import { Link } from "@/i18n/routing";
import { useQuery } from "@apollo/client";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function RecommendedAuthors() {
  const t = useTranslations();
  const queryResult = useQuery(RecommendedAuthorsDocument, {
    variables: { first: 3 },
  });

  const {
    data: authors,
    isLoading,
    hasError,
    isEmpty,
  } = useQueryStates(queryResult, (data) =>
    data.recommendedAuthors.edges.map((edge) => edge.node),
  );

  return (
    <QueryWrapper
      isLoading={isLoading}
      hasError={hasError}
      isEmpty={isEmpty}
      title={t("sidebar.recommendedAuthors")}
      emptyMessage={t("sidebar.noRecommendedAuthors")}
    >
      <div className="space-y-4">
        {authors?.map((author) => (
          <Link
            key={author.id}
            href={{
              pathname: "/users/[username]",
              params: { username: author.username },
            }}
            className="group block"
          >
            <div className="flex items-center gap-3 py-2 hover:bg-gray-50 transition-colors rounded">
              {author.avatarUrl ? (
                <Image
                  src={author.avatarUrl}
                  alt={author.name}
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-full object-cover"
                  loading="lazy"
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
    </QueryWrapper>
  );
}
