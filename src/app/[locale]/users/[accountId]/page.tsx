"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";
import { useTranslations } from "next-intl";
import UserProfile from "@/components/user/UserProfile";
import { PostEdge } from "@/graphql/generated/graphql";

const GET_USER_QUERY = gql`
  query GetUserById($id: ID!) {
    node(id: $id) {
      ... on User {
        id
        username
        name
        avatarUrl
        bio
        location
        websiteUrl
        joinedAt
        postsCount
        viewsCount
        followersCount
        followingCount
        professionalFields
      }
    }
  }
`;

const GET_USER_POSTS_QUERY = gql`
  query GetUserPosts($username: String!, $first: Int, $after: String) {
    userPosts(username: $username, first: $first, after: $after) {
      edges {
        node {
          id
          title
          translatedTitle
          originalSentences
          translatedSentences
          createdAt
          updatedAt
          likesCount
          commentsCount
          thumbnailUrl
        }
        cursor
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
`;

export default function UserProfilePage() {
  const params = useParams();
  const accountId = params.accountId as string;
  const t = useTranslations();

  const {
    data: userData,
    loading: userLoading,
    error: userError,
  } = useQuery(GET_USER_QUERY, {
    variables: { id: accountId },
  });

  const user = userData?.node?.__typename === 'User' ? userData.node : null;

  const {
    data: postsData,
    loading: postsLoading,
    error: postsError,
  } = useQuery(GET_USER_POSTS_QUERY, {
    variables: { username: user?.username || '', first: 10 },
    skip: !user?.username,
  });

  if (userLoading) {
    return (
      <div className="min-h-screen bg-white container mx-auto max-w-screen-lg px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="text-center mb-16">
            <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-6"></div>
            <div className="h-8 bg-gray-200 rounded w-48 mx-auto mb-2"></div>
            <div className="h-6 bg-gray-200 rounded w-32 mx-auto mb-1"></div>
            <div className="h-6 bg-gray-200 rounded w-24 mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }

  if (userError || !user) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {t("error.pageNotFound")}
          </h1>
          <p className="text-gray-600">{t("profile.userNotFound")}</p>
        </div>
      </div>
    );
  }

  return (
    <UserProfile
      user={user}
      posts={
        postsData?.userPosts.edges?.map((edge: PostEdge) => edge.node) || []
      }
      isLoadingPosts={postsLoading}
      postsError={postsError}
    />
  );
}
