"use client";

import { useState } from "react";
import { GetPostQuery } from "@/graphql/generated/graphql";
import PostDetailHeader from "./PostDetailHeader";
import PostAuthorInfo from "./PostAuthorInfo";
import PostViewToggle from "./PostViewToggle";
import PostContent from "./PostContent";
import RelatedPosts from "./RelatedPosts";

type PostType = Extract<
  NonNullable<GetPostQuery["post"]>,
  { __typename?: "Post" }
>;

interface PostDetailPageProps {
  post: PostType;
}

type ViewMode = "korean" | "original" | "both";

export default function PostDetailPage({ post }: PostDetailPageProps) {
  const [viewMode, setViewMode] = useState<ViewMode>("korean");
  const [showHighlight, setShowHighlight] = useState(false);

  return (
    <div className="flex-grow container mx-auto max-w-screen-lg px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <PostDetailHeader post={post} />

      <PostAuthorInfo post={post} />

      <PostViewToggle
        viewMode={viewMode}
        setViewMode={setViewMode}
        showHighlight={showHighlight}
        setShowHighlight={setShowHighlight}
      />

      <PostContent
        post={post}
        viewMode={viewMode}
        showHighlight={showHighlight}
      />

      <RelatedPosts currentPostId={post.id} />
    </div>
  );
}
