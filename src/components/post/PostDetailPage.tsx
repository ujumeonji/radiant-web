"use client";

import { useState } from "react";
import { GetPostQuery } from "@/graphql/generated/graphql";
import PostDetailHeader from "./PostDetailHeader";
import PostAuthorInfo from "./PostAuthorInfo";
import PostViewToggle from "./PostViewToggle";
import PostContent from "./PostContent";
import RelatedPosts from "./RelatedPosts";

interface PostDetailPageProps {
  post: NonNullable<GetPostQuery["post"]>;
}

type ViewMode = "korean" | "original" | "both";

export default function PostDetailPage({ post }: PostDetailPageProps) {
  const [viewMode, setViewMode] = useState<ViewMode>("korean");
  const [showHighlight, setShowHighlight] = useState(false);

  return (
    <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="max-w-4xl mx-auto">
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
    </main>
  );
}
