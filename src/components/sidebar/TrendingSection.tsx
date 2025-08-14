import { TrendingArticle } from "@/types/article";
import { Clock, ThumbsUp, TrendingUp } from "lucide-react";
import Link from "next/link";

interface TrendingSectionProps {
  articles: TrendingArticle[];
}

export default function TrendingSection({ articles }: TrendingSectionProps) {
  return (
    <div className="bg-white">
      <div className="p-6">
        <h2 className="flex items-center gap-2 text-xl font-bold text-gray-900 mb-6">
          <TrendingUp className="w-5 h-5 text-slate-800" />
          Trending
        </h2>

        <div className="space-y-6">
          {articles.map((article) => (
            <Link key={article.id} href="#" className="group block">
              <div className="flex gap-4 pb-6 border-b border-gray-100 last:border-b-0 last:pb-0">
                <div className="flex-shrink-0">
                  <span className="text-2xl font-bold text-gray-300">
                    {article.rank.toString().padStart(2, "0")}
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="mb-2">
                    <span className="text-xs text-gray-500 font-medium">
                      {article.category}
                    </span>
                  </div>

                  <h3 className="font-bold text-gray-900 group-hover:text-slate-800 transition-colors line-clamp-2 mb-2 leading-tight">
                    {article.title}
                  </h3>

                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {article.readingTime}분
                    </span>
                    <span className="flex items-center gap-1">
                      <ThumbsUp className="w-3 h-3" />
                      {article.likes}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
