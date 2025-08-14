import { Author } from "@/types/article";
import Link from "next/link";

interface RecommendedAuthorsProps {
  authors: Author[];
}

export default function RecommendedAuthors({
  authors,
}: RecommendedAuthorsProps) {
  const formatFollowers = (count: number): string => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  return (
    <div className="bg-white">
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">
          Recommended Authors
        </h2>

        <div className="space-y-4">
          {authors.slice(0, 3).map((author) => (
            <Link
              key={author.id}
              href={`/author/${author.name}`}
              className="group block"
            >
              <div className="flex items-center gap-3 py-2 hover:bg-gray-50 transition-colors rounded">
                <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                  {author.name.charAt(0)}
                </div>

                <div className="flex-1">
                  <p className="font-medium text-sm text-gray-900 group-hover:text-slate-800">
                    {author.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {author.category} • {formatFollowers(author.followers)}{" "}
                    followers
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
