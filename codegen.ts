import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "src/graphql/schema/**/*.graphql",
  documents: ["src/graphql/operations/**/*.graphql"],
  generates: {
    "src/graphql/generated/": {
      preset: "client",
      config: {
        documentMode: "graphQLTag",
        namingConvention: {
          typeNames: "pascal-case#pascalCase",
          enumValues: "upper-case#upperCase",
        },
        withHooks: true,
        withHOC: false,
        withComponent: false,
      },
      plugins: [],
    },
    "src/graphql/generated/schema.json": {
      plugins: ["introspection"],
    },
  },
  config: {
    scalars: {
      DateTime: "string",
      JSON: "any",
      Upload: "File",
    },
    skipTypename: false,
    enumsAsTypes: false,
  },
  watch: true,
  verbose: false,
  errorsOnly: false,
};

export default config;
