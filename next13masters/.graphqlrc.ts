import type { CodegenConfig } from '@graphql-codegen/cli';
import { loadEnvConfig } from '@next/env';

loadEnvConfig(process.cwd());

const config: CodegenConfig = {
  overwrite: true,
  schema: process.env.GRAPHQL_API,
  documents: ['src/graphql/**/*.graphql', 'src/{app,ui,api}/**/*.{ts,tsx}'],
  ignoreNoDocuments: true,
  generates: {
    'src/gql/': {
      preset: 'client',
      plugins: [],
      presetConfig: {
        fragmentMasking: false,
      },
      config: {
        defaultScalarType: 'unknown',
        useTypeImports: true,
        skipTypename: true,
        documentMode: 'string',
        enumsAsTypes: true,
      },
    },
  },
};

export default config;
