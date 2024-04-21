import { redirect } from 'next/navigation';
import Stripe from 'stripe';

type Props = {
  searchParams: {
    session_id?: string;
  };
};

export default async function CartSuccessPage({ searchParams }: Props) {
  if (!searchParams.session_id) {
    redirect('/');
  }

  if (!process.env.STRIPE_KEY) {
    throw new Error('Missing STRIPE_KEY');
  }

  const stripe = new Stripe(process.env.STRIPE_KEY, {
    apiVersion: '2023-08-16',
    typescript: true,
  });

  const session = await stripe.checkout.sessions.retrieve(searchParams.session_id);

  return <section>{session.payment_status}</section>;
}
