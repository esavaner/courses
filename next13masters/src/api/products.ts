import { executeGraphql } from './utils';
import {
  ProductsGetListDocument,
  ProductsGetByCategorySlugDocument,
  ProductGetByIdDocument,
  ProductsCountDocument,
  ProductsSearchByQueryDocument,
} from '@/gql/graphql';

export const getProductsList = async (first: number = 20, skip: number = 0) => {
  const res = await executeGraphql({
    query: ProductsGetListDocument,
    variables: { skip, first },
    next: { revalidate: 15 },
  });
  return res.products;
};

export const getProductsByCategorySlug = async (
  slug: string,
  first: number = 20,
  skip: number = 0,
) => {
  const products = (
    await executeGraphql({
      query: ProductsGetByCategorySlugDocument,
      variables: { slug, skip, first },
    })
  ).categories[0]?.products;

  return products;
};

export const getProductsBySearchQuery = async (query: string) => {
  const res = await executeGraphql({
    query: ProductsSearchByQueryDocument,
    variables: { query },
  });
  return res.products;
};

export const getProductById = async (id: string) => {
  const product = (
    await executeGraphql({
      query: ProductGetByIdDocument,
      variables: { id },
      next: { revalidate: 15 },
    })
  ).products[0];
  return product;
};

export const getProductsCount = async () => {
  const count = (await executeGraphql({ query: ProductsCountDocument })).productsConnection
    .aggregate.count;
  return count;
};
