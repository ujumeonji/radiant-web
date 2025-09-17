const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { addMocksToSchema } = require("@graphql-tools/mock");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const { readFileSync } = require("fs");
const { join } = require("path");
const { glob } = require("glob");
const casual = require("casual-browserify");

// Function to load and merge schema files
function loadSchemas() {
  console.log("🔍 Loading GraphQL schema files from src/graphql/schema...");

  const schemaDir = join(__dirname, "../src/graphql/schema");
  const schemaFiles = glob.sync("**/*.graphql", { cwd: schemaDir });

  console.log(`📁 Found schema files: ${schemaFiles.join(", ")}`);

  let typeDefs = "";

  schemaFiles.forEach((file) => {
    const filePath = join(schemaDir, file);
    const content = readFileSync(filePath, "utf8");
    console.log(`📖 Loading: ${file}`);
    typeDefs += content + "\n";
  });

  console.log("✅ Schema files loaded successfully");
  return typeDefs;
}

// Load schema dynamically
const typeDefs = loadSchemas();

// Custom mocks for realistic data
const mocks = {
  DateTime: () => casual.moment.format(),

  User: () => ({
    __typename: "User",
    id: casual.uuid,
    username: casual.username,
    name: casual.full_name,
    avatarUrl: () =>
      `https://avatars.githubusercontent.com/u/${casual.integer(1, 999999)}?v=4`,
    bio: () => casual.sentences(casual.integer(1, 3)),
    location: () => `${casual.city}, ${casual.country}`,
    websiteUrl: () =>
      casual.random > 0.5 ? `https://${casual.username}.dev` : null,
    joinedAt: casual.moment.subtract(casual.integer(1, 36), "months").format(),
    postsCount: () => casual.integer(5, 100),
    viewsCount: () => casual.integer(1000, 50000),
    followersCount: () => casual.integer(10, 5000),
    followingCount: () => casual.integer(5, 500),
    professionalFields: () => {
      const fields = ["BACKEND", "FRONTEND", "AI_ML"];
      const count = casual.integer(1, 3);
      return casual
        .array_of_digits(count)
        .map(() => fields[casual.integer(0, fields.length - 1)])
        .filter((field, index, arr) => arr.indexOf(field) === index);
    },
  }),

  Post: () => ({
    __typename: "Post",
    id: casual.uuid,
    title: () => "You can contribute to the translation efforts!",
    body: casual.sentences(casual.integer(3, 8)),
    translatedTitle: () => "번역에 기여할 수 있습니다!",
    originalSentences: () => [
      "The community conducts the translation work for the React docs on each language-specific fork of react.dev.",
      "Typical translation work involves directly translating a Markdown file and creating a pull request.",
      "Click the 'contribute' link above to the GitHub repository for your language, and follow the instructions there to help with the translation effort.",
      "If you want to start a new translation for your language, visit: translations.react.dev",
    ],
    translatedSentences: () => [
      "커뮤니티는 react.dev의 각 언어별 포크에서 React 문서에 대한 번역 작업을 수행합니다.",
      "일반적인 번역 작업에는 Markdown 파일을 직접 번역하고 풀 리퀘스트를 생성하는 작업이 포함됩니다.",
      "사용하는 언어의 GitHub 저장소로 연결되는 '기여하기' 링크를 클릭하고, 해당 저장소의 안내에 따라 번역 작업에 참여하세요.",
      "만약 새로운 언어의 번역을 시작하고 싶다면, translations.react.dev를 방문하세요.",
    ],
    createdAt: casual.moment.subtract(casual.integer(0, 30), "days").format(),
    updatedAt: casual.moment.subtract(casual.integer(0, 5), "days").format(),
    likesCount: () => casual.integer(0, 1000),
    commentsCount: () => casual.integer(0, 50),
    thumbnailUrl: () =>
      casual.random > 0.3
        ? `https://picsum.photos/400/300?random=${casual.integer(1, 1000)}`
        : null,
  }),

  Topic: () => ({
    id: casual.uuid,
    name: casual.title,
    slug: () => casual.title.toLowerCase().replace(/\s+/g, "-"),
    postsCount: () => casual.integer(1, 100),
  }),

  PostEdge: () => ({
    cursor: casual.uuid,
    node: () => ({}), // This will be filled by the Post mock
  }),

  UserEdge: () => ({
    cursor: casual.uuid,
    node: () => ({}), // This will be filled by the User mock
  }),

  TopicEdge: () => ({
    cursor: casual.uuid,
    node: () => ({}), // This will be filled by the Topic mock
  }),

  PageInfo: () => ({
    hasNextPage: casual.coin_flip,
    hasPreviousPage: casual.coin_flip,
    startCursor: casual.uuid,
    endCursor: casual.uuid,
  }),

  PostConnection: () => ({
    edges: () =>
      new Array(casual.integer(5, 15)).fill(0).map(() => ({
        node: {},
        cursor: casual.uuid,
      })),
    pageInfo: () => ({
      hasNextPage: casual.coin_flip,
      hasPreviousPage: casual.coin_flip,
      startCursor: casual.uuid,
      endCursor: casual.uuid,
    }),
    totalCount: () => casual.integer(20, 500),
  }),

  // Connection types
  UserConnection: () => ({
    edges: () =>
      new Array(casual.integer(3, 8)).fill(0).map(() => ({
        node: {},
        cursor: casual.uuid,
      })),
    pageInfo: () => ({
      hasNextPage: casual.coin_flip,
      hasPreviousPage: casual.coin_flip,
      startCursor: casual.uuid,
      endCursor: casual.uuid,
    }),
    totalCount: () => casual.integer(10, 100),
  }),

  TopicConnection: () => ({
    edges: () =>
      new Array(casual.integer(3, 10)).fill(0).map(() => ({
        node: {},
        cursor: casual.uuid,
      })),
    pageInfo: () => ({
      hasNextPage: casual.coin_flip,
      hasPreviousPage: casual.coin_flip,
      startCursor: casual.uuid,
      endCursor: casual.uuid,
    }),
  }),

  // Union type resolvers
  UserResult: () => {
    const isError = casual.random > 0.9;
    if (isError) {
      return {
        __typename: "UserNotFoundError",
        message: "사용자를 찾을 수 없습니다",
        code: "USER_NOT_FOUND",
        username: casual.username,
      };
    } else {
      return {
        __typename: "User",
        id: casual.uuid,
        username: casual.username,
        name: casual.full_name,
        avatarUrl: `https://avatars.githubusercontent.com/u/${casual.integer(1, 999999)}?v=4`,
        bio: casual.sentences(casual.integer(1, 3)),
        location: `${casual.city}, ${casual.country}`,
        websiteUrl:
          casual.random > 0.5 ? `https://${casual.username}.dev` : null,
        joinedAt: casual.moment
          .subtract(casual.integer(1, 36), "months")
          .format(),
        postsCount: casual.integer(5, 100),
        viewsCount: casual.integer(1000, 50000),
        followersCount: casual.integer(10, 5000),
        followingCount: casual.integer(5, 500),
        professionalFields: (() => {
          const fields = ["BACKEND", "FRONTEND", "AI_ML"];
          const count = casual.integer(1, 3);
          return casual
            .array_of_digits(count)
            .map(() => fields[casual.integer(0, fields.length - 1)])
            .filter((field, index, arr) => arr.indexOf(field) === index);
        })(),
      };
    }
  },

  PostResult: () => {
    const isError = casual.random > 0.9;
    if (isError) {
      return {
        __typename: "PostNotFoundError",
        message: "포스트를 찾을 수 없습니다",
        code: "POST_NOT_FOUND",
        postId: casual.uuid,
      };
    } else {
      return {
        __typename: "Post",
        id: casual.uuid,
        title: "You can contribute to the translation efforts!",
        body: casual.sentences(casual.integer(3, 8)),
        translatedTitle: "번역에 기여할 수 있습니다!",
        originalSentences: [
          "The community conducts the translation work for the React docs on each language-specific fork of react.dev.",
          "Typical translation work involves directly translating a Markdown file and creating a pull request.",
          "Click the 'contribute' link above to the GitHub repository for your language, and follow the instructions there to help with the translation effort.",
          "If you want to start a new translation for your language, visit: translations.react.dev",
        ],
        translatedSentences: [
          "커뮤니티는 react.dev의 각 언어별 포크에서 React 문서에 대한 번역 작업을 수행합니다.",
          "일반적인 번역 작업에는 Markdown 파일을 직접 번역하고 풀 리퀘스트를 생성하는 작업이 포함됩니다.",
          "사용하는 언어의 GitHub 저장소로 연결되는 '기여하기' 링크를 클릭하고, 해당 저장소의 안내에 따라 번역 작업에 참여하세요.",
          "만약 새로운 언어의 번역을 시작하고 싶다면, translations.react.dev를 방문하세요.",
        ],
        createdAt: casual.moment
          .subtract(casual.integer(0, 30), "days")
          .format(),
        updatedAt: casual.moment
          .subtract(casual.integer(0, 5), "days")
          .format(),
        likesCount: casual.integer(0, 1000),
        commentsCount: casual.integer(0, 50),
        thumbnailUrl:
          casual.random > 0.3
            ? `https://picsum.photos/400/300?random=${casual.integer(1, 1000)}`
            : null,
      };
    }
  },

  // Error types for union resolvers
  UserNotFoundError: () => ({
    __typename: "UserNotFoundError",
    message: "사용자를 찾을 수 없습니다",
    code: "USER_NOT_FOUND",
    username: casual.username,
  }),

  PostNotFoundError: () => ({
    __typename: "PostNotFoundError",
    message: "포스트를 찾을 수 없습니다",
    code: "POST_NOT_FOUND",
    postId: casual.uuid,
  }),

  // Query resolvers for lists
  Query: () => ({
    recommendedAuthors: () => ({
      edges: new Array(casual.integer(3, 8)).fill(0).map(() => ({
        node: {},
        cursor: casual.uuid,
      })),
      pageInfo: {
        hasNextPage: casual.coin_flip,
        hasPreviousPage: casual.coin_flip,
        startCursor: casual.uuid,
        endCursor: casual.uuid,
      },
      totalCount: casual.integer(10, 100),
    }),
    trendingPosts: () => ({
      edges: new Array(casual.integer(5, 15)).fill(0).map(() => ({
        node: {},
        cursor: casual.uuid,
      })),
      pageInfo: {
        hasNextPage: casual.coin_flip,
        hasPreviousPage: casual.coin_flip,
        startCursor: casual.uuid,
        endCursor: casual.uuid,
      },
    }),
    popularTopics: () => ({
      edges: new Array(casual.integer(3, 10)).fill(0).map(() => ({
        node: {},
        cursor: casual.uuid,
      })),
      pageInfo: {
        hasNextPage: casual.coin_flip,
        hasPreviousPage: casual.coin_flip,
        startCursor: casual.uuid,
        endCursor: casual.uuid,
      },
    }),
    user: () => {
      const isError = casual.random > 0.9;
      if (isError) {
        return {
          __typename: "UserNotFoundError",
          message: "사용자를 찾을 수 없습니다",
          code: "USER_NOT_FOUND",
          username: casual.username,
        };
      } else {
        return {
          __typename: "User",
          id: casual.uuid,
          username: casual.username,
          name: casual.full_name,
          avatarUrl: `https://avatars.githubusercontent.com/u/${casual.integer(1, 999999)}?v=4`,
          bio: casual.sentences(casual.integer(1, 3)),
          location: `${casual.city}, ${casual.country}`,
          websiteUrl:
            casual.random > 0.5 ? `https://${casual.username}.dev` : null,
          joinedAt: casual.moment
            .subtract(casual.integer(1, 36), "months")
            .format(),
          postsCount: casual.integer(5, 100),
          viewsCount: casual.integer(1000, 50000),
          followersCount: casual.integer(10, 5000),
          followingCount: casual.integer(5, 500),
          professionalFields: (() => {
            const fields = ["BACKEND", "FRONTEND", "AI_ML"];
            const count = casual.integer(1, 3);
            return casual
              .array_of_digits(count)
              .map(() => fields[casual.integer(0, fields.length - 1)])
              .filter((field, index, arr) => arr.indexOf(field) === index);
          })(),
        };
      }
    },
    userPosts: () => ({
      edges: new Array(casual.integer(3, 10)).fill(0).map(() => ({
        node: {},
        cursor: casual.uuid,
      })),
      pageInfo: {
        hasNextPage: casual.coin_flip,
        hasPreviousPage: casual.coin_flip,
        startCursor: casual.uuid,
        endCursor: casual.uuid,
      },
    }),
  }),
};

async function startServer() {
  // Define resolvers for union types
  const resolvers = {
    UserResult: {
      __resolveType(obj) {
        if (obj.__typename) {
          return obj.__typename;
        }
        if (obj.message && obj.code && obj.username) {
          return "UserNotFoundError";
        }
        if (obj.id && obj.username && obj.name) {
          return "User";
        }
        return "User"; // Default fallback
      },
    },
    PostResult: {
      __resolveType(obj) {
        if (obj.__typename) {
          return obj.__typename;
        }
        if (obj.message && obj.code && obj.postId) {
          return "PostNotFoundError";
        }
        if (obj.id && obj.title) {
          return "Post";
        }
        return "Post"; // Default fallback
      },
    },
  };

  // Create executable schema with resolvers
  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });

  // Add mocks to schema
  const mockedSchema = addMocksToSchema({
    schema,
    mocks,
    preserveResolvers: true, // Preserve the union type resolvers
  });

  // Create Apollo Server
  const server = new ApolloServer({
    schema: mockedSchema,
    introspection: true,
    playground: true,
  });

  // Start the server
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({ req }) => {
      return {
        req,
      };
    },
  });

  console.log(`🚀 Mock GraphQL Server ready at ${url}`);
  console.log(`📖 GraphQL Playground available at ${url}`);
}

startServer().catch((error) => {
  console.error("Failed to start server:", error);
  process.exit(1);
});
