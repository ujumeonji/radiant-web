import {
  ApolloClient,
  createHttpLink,
  from,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URL || "http://localhost:4000/graphql",
});

const authLink = setContext((_, { headers }) => {
  let token = "";
  if (typeof window !== "undefined") {
    token = localStorage.getItem("token") ?? "";
  }
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

export const apolloClient = new ApolloClient({
  link: from([authLink, httpLink]),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          posts: {
            keyArgs: false,
            merge(existing = { edges: [], pageInfo: {} }, incoming) {
              return {
                ...incoming,
                edges: [...existing.edges, ...incoming.edges],
              };
            },
          },
        },
      },
    },
  }),
  connectToDevTools: process.env.NODE_ENV === "development",
  defaultOptions: {
    watchQuery: {
      errorPolicy: "all",
    },
    query: {
      errorPolicy: "all",
    },
    mutate: {
      errorPolicy: "all",
    },
  },
});

let serverClient: ApolloClient<NormalizedCacheObject> | null = null;

export function getServerApolloClient(): ApolloClient<NormalizedCacheObject> {
  if (!serverClient) {
    serverClient = new ApolloClient({
      ssrMode: true,
      link: httpLink,
      cache: new InMemoryCache(),
    });
  }
  return serverClient;
}

export function createApolloClient(): ApolloClient<NormalizedCacheObject> {
  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: from([authLink, httpLink]),
    cache: new InMemoryCache(),
  });
}
