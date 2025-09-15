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
    id: casual.uuid,
    username: casual.username,
    name: casual.full_name,
    avatar: () =>
      `https://avatars.githubusercontent.com/u/${casual.integer(1, 999999)}?v=4`,
    followersCount: () => casual.integer(10, 5000),
    followingCount: () => casual.integer(5, 500),
    fields: () => {
      const fields = ["BACKEND", "FRONTEND", "AI_ML"];
      const count = casual.integer(1, 3);
      return casual
        .array_of_digits(count)
        .map(() => fields[casual.integer(0, fields.length - 1)])
        .filter((field, index, arr) => arr.indexOf(field) === index);
    },
  }),

  Post: () => ({
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
    likes: () => casual.integer(0, 1000),
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
    postCount: () => casual.integer(1, 100),
  }),

  PostEdge: () => ({
    cursor: casual.uuid,
    node: () => ({}), // This will be filled by the Post mock
  }),

  PostConnection: () => ({
    pageInfo: () => ({
      hasNextPage: casual.coin_flip,
      hasPreviousPage: casual.coin_flip,
      startCursor: casual.uuid,
      endCursor: casual.uuid,
    }),
  }),

  // Query resolvers for lists
  Query: () => ({
    recommendedAuthors: () =>
      new Array(casual.integer(3, 8)).fill(0).map(() => ({})),
    trendingPosts: () =>
      new Array(casual.integer(5, 15)).fill(0).map(() => ({})),
    popularTopics: () =>
      new Array(casual.integer(3, 10)).fill(0).map(() => ({})),
  }),
};

async function startServer() {
  // Create executable schema
  const schema = makeExecutableSchema({ typeDefs });

  // Add mocks to schema
  const mockedSchema = addMocksToSchema({
    schema,
    mocks,
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
