import { notFound } from "next/navigation";
import { Metadata } from "next";
import PostDetailPage from "@/components/post/PostDetailPage";
import { getServerApolloClient } from "@/graphql/client";
import { GetPostDocument, GetPostQuery } from "@/graphql/generated/graphql";

interface Props {
  params: Promise<{
    id: string;
    locale: string;
  }>;
}

const postCache = new Map<string, GetPostQuery | null>();

async function getPost(id: string): Promise<GetPostQuery | null> {
  if (postCache.has(id)) {
    return postCache.get(id) || null;
  }

  const client = getServerApolloClient();

  try {
    const { data } = await client.query({
      query: GetPostDocument,
      variables: { id },
    });

    postCache.set(id, data);
    return data;
  } catch (error) {
    postCache.set(id, null);
    throw error;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  try {
    const data = await getPost(id);

    if (!data?.post) {
      return {
        title: "포스트를 찾을 수 없습니다",
      };
    }

    return {
      title: data.post.title,
      description: data.post.body?.substring(0, 160) || "",
    };
  } catch {
    return {
      title: "포스트를 찾을 수 없습니다",
    };
  }
}

export default async function Page({ params }: Props) {
  const { id } = await params;

  try {
    const data = await getPost(id);

    if (!data?.post) {
      notFound();
    }

    return <PostDetailPage post={data.post} />;
  } catch {
    notFound();
  }
}
