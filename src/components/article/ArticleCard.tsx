import { Article } from "@/types/article";
import { MessageCircle, Star, ThumbsUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ArticleCardProps {
  article: Article;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  return (
    <article className="py-8 border-b">
      <div className="flex justify-between gap-8">
        <div className="flex-1">
          <Link href={`/post/${article.id}`} className="group">
            <h2 className="text-2xl font-bold text-gray-900 group-hover:underline">
              {article.title}
            </h2>
            <p className="mt-2 text-gray-500">{article.description}</p>
          </Link>

          <div className="mt-4 flex justify-between items-center">
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-500" />
                {article.publishedAt}
              </span>
              <span className="flex items-center gap-1">
                <ThumbsUp className="w-4 h-4" />
                {article.likes}
              </span>
              <span className="flex items-center gap-1">
                <MessageCircle className="w-4 h-4" />
                {article.comments}
              </span>
            </div>
          </div>
        </div>

        {article.image && (
          <div className="flex-shrink-0">
            <Image
              src={article.image}
              alt={article.title}
              width={112}
              height={112}
              className="object-cover w-28 h-28"
            />
          </div>
        )}
      </div>
    </article>
  );
}
