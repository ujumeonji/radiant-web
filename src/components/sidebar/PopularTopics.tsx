import { PopularTopic } from "@/types/article";
import Link from "next/link";

interface PopularTopicsProps {
  topics: PopularTopic[];
}

export default function PopularTopics({ topics }: PopularTopicsProps) {
  return (
    <div className="bg-white">
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Popular Topics</h2>

        <div className="space-y-3">
          {topics.map((topic) => (
            <Link
              key={topic.slug}
              href={`/category/${topic.slug}`}
              className="group block"
            >
              <div className="flex items-center justify-between py-2 hover:bg-gray-50 transition-colors rounded">
                <span className="text-sm font-medium text-gray-700 group-hover:text-slate-800">
                  {topic.name}
                </span>
                <span className="text-xs text-gray-500">{topic.count}개</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
