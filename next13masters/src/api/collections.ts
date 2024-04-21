import { CollectionBySlugDocument, CollectionsGetListDocument } from '@/gql/graphql';
import { executeGraphql } from './utils';

export const getCollectionList = async () => {
  const res = await executeGraphql({
    query: CollectionsGetListDocument,
    next: { revalidate: 15 },
  });
  return res.collections;
};

export const getCollectionBySlug = async (slug: string) => {
  const collection = (
    await executeGraphql({
      query: CollectionBySlugDocument,
      variables: { slug },
    })
  ).collections[0];

  return collection;
};
