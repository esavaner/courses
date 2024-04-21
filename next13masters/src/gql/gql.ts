/* eslint-disable */
import * as types from './graphql';



/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "query CartGetById($id: ID) {\n  order(where: {id: $id}, stage: DRAFT) {\n    ...Cart\n  }\n}\n\nmutation CartCreate {\n  createOrder(data: {total: 0}) {\n    ...Cart\n  }\n}\n\nmutation CartAddProduct($orderId: ID!, $productId: ID!, $total: Int!) {\n  createOrderItem(\n    data: {product: {connect: {id: $productId}}, order: {connect: {id: $orderId}}, quantity: 1, total: $total}\n  ) {\n    id\n  }\n}\n\nmutation CartSetProductQuantity($itemId: ID!, $quantity: Int!) {\n  updateOrderItem(where: {id: $itemId}, data: {quantity: $quantity}) {\n    id\n  }\n}\n\nmutation CartRemoveProduct($itemId: ID!) {\n  deleteOrderItem(where: {id: $itemId}) {\n    id\n  }\n}": types.CartGetByIdDocument,
    "query ProductsGetByCategorySlug($slug: String!, $skip: Int!, $first: Int!) {\n  categories(where: {slug: $slug}) {\n    products(skip: $skip, first: $first) {\n      ...ProductListItem\n    }\n  }\n}": types.ProductsGetByCategorySlugDocument,
    "query CollectionBySlug($slug: String!) {\n  collections(where: {slug: $slug}) {\n    ...CollectionListItem\n    products {\n      ...ProductListItem\n    }\n  }\n}\n\nquery CollectionsGetList {\n  collections {\n    ...CollectionListItem\n  }\n}": types.CollectionBySlugDocument,
    "fragment ProductItem on Product {\n  id\n  name\n  description\n  categories(first: 1) {\n    name\n  }\n  images(first: 1) {\n    url\n  }\n  price\n  rating\n}\n\nfragment ProductListItem on Product {\n  id\n  name\n  categories(first: 1) {\n    name\n  }\n  images(first: 1) {\n    url\n  }\n  price\n  rating\n}\n\nfragment Cart on Order {\n  id\n  orderItems {\n    id\n    quantity\n    total\n    product {\n      id\n      name\n      price\n    }\n  }\n}\n\nfragment CollectionListItem on Collection {\n  id\n  name\n  slug\n}": types.ProductItemFragmentDoc,
    "query ProductGetById($id: ID!) {\n  products(where: {id: $id}) {\n    ...ProductItem\n  }\n}\n\nquery ProductsGetList($skip: Int!, $first: Int!) {\n  products(skip: $skip, first: $first) {\n    ...ProductListItem\n  }\n}\n\nquery ProductsCount {\n  productsConnection {\n    aggregate {\n      count\n    }\n  }\n}\n\nquery ProductsSearchByQuery($query: String!) {\n  products(where: {name_contains: $query}) {\n    ...ProductListItem\n  }\n}": types.ProductGetByIdDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query CartGetById($id: ID) {\n  order(where: {id: $id}, stage: DRAFT) {\n    ...Cart\n  }\n}\n\nmutation CartCreate {\n  createOrder(data: {total: 0}) {\n    ...Cart\n  }\n}\n\nmutation CartAddProduct($orderId: ID!, $productId: ID!, $total: Int!) {\n  createOrderItem(\n    data: {product: {connect: {id: $productId}}, order: {connect: {id: $orderId}}, quantity: 1, total: $total}\n  ) {\n    id\n  }\n}\n\nmutation CartSetProductQuantity($itemId: ID!, $quantity: Int!) {\n  updateOrderItem(where: {id: $itemId}, data: {quantity: $quantity}) {\n    id\n  }\n}\n\nmutation CartRemoveProduct($itemId: ID!) {\n  deleteOrderItem(where: {id: $itemId}) {\n    id\n  }\n}"): typeof import('./graphql').CartGetByIdDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductsGetByCategorySlug($slug: String!, $skip: Int!, $first: Int!) {\n  categories(where: {slug: $slug}) {\n    products(skip: $skip, first: $first) {\n      ...ProductListItem\n    }\n  }\n}"): typeof import('./graphql').ProductsGetByCategorySlugDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query CollectionBySlug($slug: String!) {\n  collections(where: {slug: $slug}) {\n    ...CollectionListItem\n    products {\n      ...ProductListItem\n    }\n  }\n}\n\nquery CollectionsGetList {\n  collections {\n    ...CollectionListItem\n  }\n}"): typeof import('./graphql').CollectionBySlugDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ProductItem on Product {\n  id\n  name\n  description\n  categories(first: 1) {\n    name\n  }\n  images(first: 1) {\n    url\n  }\n  price\n  rating\n}\n\nfragment ProductListItem on Product {\n  id\n  name\n  categories(first: 1) {\n    name\n  }\n  images(first: 1) {\n    url\n  }\n  price\n  rating\n}\n\nfragment Cart on Order {\n  id\n  orderItems {\n    id\n    quantity\n    total\n    product {\n      id\n      name\n      price\n    }\n  }\n}\n\nfragment CollectionListItem on Collection {\n  id\n  name\n  slug\n}"): typeof import('./graphql').ProductItemFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductGetById($id: ID!) {\n  products(where: {id: $id}) {\n    ...ProductItem\n  }\n}\n\nquery ProductsGetList($skip: Int!, $first: Int!) {\n  products(skip: $skip, first: $first) {\n    ...ProductListItem\n  }\n}\n\nquery ProductsCount {\n  productsConnection {\n    aggregate {\n      count\n    }\n  }\n}\n\nquery ProductsSearchByQuery($query: String!) {\n  products(where: {name_contains: $query}) {\n    ...ProductListItem\n  }\n}"): typeof import('./graphql').ProductGetByIdDocument;


export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
