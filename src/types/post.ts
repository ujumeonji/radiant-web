import { PostsQuery } from "@/graphql/generated/graphql";

export type Post = NonNullable<PostsQuery["posts"]["edges"][number]["node"]>;

export type PostEdge = PostsQuery["posts"]["edges"][number];

export type PostConnection = PostsQuery["posts"];

export interface PostListProps {
  initialPosts?: Post[];
}
