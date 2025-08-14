import { Article } from "@/types/article";
import ArticleCard from "./ArticleCard";

interface ArticleFeedProps {
  articles: Article[];
}

export default function ArticleFeed({ articles }: ArticleFeedProps) {
  return (
    <div className="flex-1 max-w-3xl">
      <div>
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>

      <div className="h-4"></div>
      <div className="text-center py-8 text-gray-500">
        모든 게시글을 불러왔습니다.
      </div>
    </div>
  );
}
