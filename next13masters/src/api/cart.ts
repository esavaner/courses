import { cookies } from 'next/headers';
import { executeGraphql } from './utils';
import {
  CartCreateDocument,
  type CartFragment,
  CartGetByIdDocument,
  type ProductGetByIdQuery,
  CartAddProductDocument,
} from '@/gql/graphql';

export const createCart = async () => {
  return executeGraphql({ query: CartCreateDocument, cache: 'no-store' });
};

export const getCartFromCookies = async () => {
  const cartId = cookies().get('cartId')?.value;
  if (cartId) {
    const cart = await executeGraphql({
      query: CartGetByIdDocument,
      variables: { id: cartId },
      next: { tags: ['cart'] },
      cache: 'no-store',
    });
    if (cart.order) {
      return cart.order;
    }
  }
};

export const getOrCreateCart = async (): Promise<CartFragment> => {
  const existingCart = await getCartFromCookies();
  if (existingCart) {
    return existingCart;
  }
  const cart = await createCart();
  if (!cart.createOrder) {
    throw new Error('Failed to create cart');
  }
  cookies().set('cartId', cart.createOrder.id, { httpOnly: true });
  return cart.createOrder;
};

export const addToCart = async (
  orderId: string,
  product: ProductGetByIdQuery['products'][number],
) => {
  return executeGraphql({
    query: CartAddProductDocument,
    variables: {
      orderId,
      productId: product.id,
      total: product.price,
    },
    cache: 'no-store',
  });
};
