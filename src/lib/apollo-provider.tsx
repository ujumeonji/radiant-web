"use client";

import { apolloClient } from "@/graphql/client";
import { ApolloProvider } from "@apollo/client";

interface Props {
  children: React.ReactNode;
}

export function GraphQLProvider({ children }: Props) {
  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
}
