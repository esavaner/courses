'use server';

import { getCartFromCookies } from '@/api/cart';
import { executeGraphql } from '@/api/utils';
import { CartRemoveProductDocument, CartSetProductQuantityDocument } from '@/gql/graphql';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Stripe from 'stripe';

export const removeItem = (itemId: string) => {
  return executeGraphql({ query: CartRemoveProductDocument, variables: { itemId } });
};

export const changeItemQuantity = (itemId: string, quantity: number) => {
  return executeGraphql({ query: CartSetProductQuantityDocument, variables: { itemId, quantity } });
};

export const handlePayment = async () => {
  'use server';

  if (!process.env.STRIPE_KEY) {
    throw new Error('Missing STRIPE_KEY');
  }

  const cart = await getCartFromCookies();

  if (!cart) {
    return;
  }

  const stripe = new Stripe(process.env.STRIPE_KEY, {
    apiVersion: '2023-08-16',
    typescript: true,
  });

  const checkout = await stripe.checkout.sessions.create({
    metadata: {
      cartId: cart!.id,
    },
    payment_method_types: ['card'],
    line_items: cart!.orderItems.map((item) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.product!.name,
        },
        unit_amount: item.product!.price,
      },
      quantity: item.quantity,
    })),
    mode: 'payment',
    success_url: 'http://localhost:3000/cart/success?session_id={CHECKOUT_SESSION_ID}',
    cancel_url: 'http://localhost:3000/cart/cancel',
  });

  if (!checkout.url) {
    throw new Error('Something went wrong');
  }

  cookies().set('cartId', '');
  redirect(checkout.url);
};
