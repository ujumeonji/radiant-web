# Mock GraphQL Server

이 디렉토리는 개발용 Mock GraphQL Server를 포함합니다.

**🚀 동적 스키마 로딩**: `src/graphql/schema` 디렉토리의 모든 `.graphql` 파일을 자동으로 감지하고 병합하여 사용합니다.

## 사용법

### 1. Mock Server만 실행
```bash
pnpm mock-server
```

### 2. Mock Server와 Next.js 앱 동시 실행
```bash
pnpm dev:with-mock
```

### 3. 환경 변수 설정
`.env.mock` 파일을 `.env.local`로 복사하여 mock server URL을 설정하세요:
```bash
cp .env.mock .env.local
```

## 특징

- **🔄 동적 스키마 로딩**: `src/graphql/schema/**/*.graphql` 파일들을 자동으로 감지하고 병합
- **🔍 실시간 스키마 감지**: 서버 시작 시 스키마 파일 경로와 내용을 출력
- **📊 실제같은 데이터**: casual-browserify를 사용하여 현실적인 가짜 데이터 생성
- **🔧 완전한 스키마**: 현재 프로덕션 스키마와 완전히 호환
- **🎮 GraphQL Playground**: `http://localhost:4000`에서 쿼리 테스트 가능
- **🎯 커스텀 Mock**: 각 타입별로 맞춤형 mock 데이터

## 스키마 파일 구조

현재 감지되는 스키마 파일들:
```
src/graphql/schema/
├── post/post.graphql          # Post 타입과 관련 쿼리
├── user/user.graphql          # User 타입과 추천 작가 쿼리
└── trending/trending.graphql  # Topic 타입과 트렌딩 쿼리
```

서버 시작 시 이 파일들이 자동으로 로드되고 병합됩니다.

## Mock 데이터 예시

### User
- GitHub 스타일 아바타 URL
- 실제같은 사용자명과 이름
- 랜덤한 팔로워/팔로잉 수
- 다양한 전문 분야 조합

### Post
- 의미있는 제목과 본문
- 실제 날짜 범위의 생성/수정 시간
- Lorem Picsum을 사용한 썸네일 이미지
- 현실적인 좋아요/댓글 수

### Topic
- SEO 친화적인 슬러그
- 다양한 게시물 수

## GraphQL Playground

서버 실행 후 `http://localhost:4000`에서 다음과 같은 쿼리를 테스트할 수 있습니다:

```graphql
query GetPosts {
  posts(first: 10) {
    edges {
      node {
        id
        title
        body
        author {
          name
          username
          avatar
        }
        likes
        commentsCount
      }
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}

query GetRecommendedAuthors {
  recommendedAuthors(limit: 5) {
    id
    name
    username
    avatar
    followersCount
    fields
  }
}

query GetTrendingPosts {
  trendingPosts(limit: 10) {
    id
    title
    likes
    author {
      name
    }
  }
}
```