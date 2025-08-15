import PostList from "@/components/post/PostList";
import PopularTopics from "@/components/sidebar/PopularTopics";
import RecommendedAuthors from "@/components/sidebar/RecommendedAuthors";
import TrendingSection from "@/components/sidebar/TrendingSection";

export default function Home() {
  return (
    <main className="container max-w-screen-lg mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex gap-8 max-w-7xl mx-auto">
        <PostList />

        <div className="hidden lg:block w-80">
          <div className="space-y-8 sticky top-24">
            <TrendingSection />
            <PopularTopics />
            <RecommendedAuthors />
          </div>
        </div>
      </div>
    </main>
  );
}
