import ArticleFeed from "@/components/article/ArticleFeed";
import PopularTopics from "@/components/sidebar/PopularTopics";
import RecommendedAuthors from "@/components/sidebar/RecommendedAuthors";
import TrendingSection from "@/components/sidebar/TrendingSection";
import {
  mockArticles,
  mockAuthors,
  mockPopularTopics,
  mockTrendingArticles,
} from "@/data/mockData";

export default function Home() {
  return (
    <main className="container max-w-screen-lg mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex gap-8 max-w-7xl mx-auto">
        <ArticleFeed articles={mockArticles} />

        <div className="hidden lg:block w-80">
          <div className="space-y-8 sticky top-24">
            <TrendingSection articles={mockTrendingArticles} />
            <PopularTopics topics={mockPopularTopics} />
            <RecommendedAuthors authors={mockAuthors} />
          </div>
        </div>
      </div>
    </main>
  );
}
