"use client";

import { GetPostQuery } from "@/graphql/generated/graphql";

type PostType = Extract<
  NonNullable<GetPostQuery["post"]>,
  { __typename?: "Post" }
>;

interface PostDetailHeaderProps {
  post: PostType;
}

export default function PostDetailHeader({ post }: PostDetailHeaderProps) {
  return (
    <header className="mb-8">
      <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2">
        {post.translatedTitle}
      </h1>
      <p className="text-md text-gray-500 mb-6">{post.title}</p>
    </header>
  );
}
