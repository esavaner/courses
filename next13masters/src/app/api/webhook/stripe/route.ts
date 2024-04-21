/// <reference types="stripe-event-types" />

import { NextRequest } from 'next/server';
import Stripe from 'stripe';

export const POST = async (request: NextRequest): Promise<Response> => {
  if (!process.env.STRIPE_KEY) {
    throw new Error('Missing STRIPE_KEY');
  }

  if (!process.env.STRIPE_WEBHOOK) {
    throw new Error('Missing STRIPE_WEBHOOK');
  }

  const signature = request.headers.get('stripe-signature');

  if (!signature) {
    return new Response('No signature', { status: 401 });
  }

  const stripe = new Stripe(process.env.STRIPE_KEY, {
    apiVersion: '2023-08-16',
    typescript: true,
  });

  const event = stripe.webhooks.constructEvent(
    await request.text(),
    signature,
    process.env.STRIPE_WEBHOOK,
  ) as Stripe.DiscriminatedEvent;

  switch (event.type) {
    case 'checkout.session.completed': {
      event.data.object.metadata?.cartId;
    }
    case 'checkout.session.expired': {
    }
  }

  return new Response('OK', { status: 200 });
};
