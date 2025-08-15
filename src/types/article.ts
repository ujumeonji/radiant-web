export interface Author {
  id: string;
  name: string;
  avatar?: string;
  followers: number;
  category: string;
}

export interface Article {
  id: string;
  title: string;
  description: string;
  category: string;
  author: Author;
  publishedAt: string;
  likes: number;
  comments: number;
  readingTime: number;
  image?: string;
}

export interface TrendingArticle {
  id: string;
  title: string;
  category: string;
  readingTime: number;
  likes: number;
  rank: number;
}

export interface PopularTopic {
  name: string;
  count: number;
  slug: string;
}
