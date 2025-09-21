import PostList from "@/components/post/PostList";
import PopularTopics from "@/components/sidebar/PopularTopics";
import RecommendedAuthors from "@/components/sidebar/RecommendedAuthors";
import TrendingSection from "@/components/sidebar/TrendingSection";

export default function Home() {
  return (
    <div className="container mx-auto max-w-screen-lg px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex gap-8 min-w-0">
        <div className="flex-2 min-w-0">
          <PostList />
        </div>

        <div className="hidden lg:block flex-1 min-w-0">
          <div className="space-y-8 sticky top-24">
            <TrendingSection />
            <PopularTopics />
            <RecommendedAuthors />
          </div>
        </div>
      </div>
    </div>
  );
}
