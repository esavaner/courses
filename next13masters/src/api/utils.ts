import { type TypedDocumentString } from '@/gql/graphql';

type GQLResponse<T> =
  | { data: T; errors?: undefined }
  | { data?: undefined; errors: { message: string }[] };

export const executeGraphql = async <TResult, TVariables>({
  query,
  variables,
  cache,
  next,
  headers,
}: {
  query: TypedDocumentString<TResult, TVariables>;
  cache?: RequestCache;
  headers?: HeadersInit;
  next?: NextFetchRequestConfig | undefined;
} & (TVariables extends { [key: string]: never }
  ? { variables?: never }
  : { variables: TVariables })): Promise<TResult> => {
  if (!process.env.GRAPHQL_API) {
    throw TypeError('GRAPHQL_API is not defined');
  }

  const res = await fetch(process.env.GRAPHQL_API, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json',
      authorization: `Bearer ${process.env.TOKEN}`,
    },
    body: JSON.stringify({ query, variables }),
    next,
    cache,
  });

  const gqlRes = (await res.json()) as GQLResponse<TResult>;

  if (gqlRes.errors) {
    console.log(gqlRes.errors);
    throw TypeError('GraphQL Error', { cause: gqlRes.errors });
  }

  return gqlRes.data;
};
