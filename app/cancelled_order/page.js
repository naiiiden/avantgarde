import stripe from 'stripe';

import Link from 'next/link';
import { redirect } from 'next/navigation';

export const metadata = {
    title: "Cancelled Order | Avantgarde",
    description: "Generated by create next app",
};

export default async function Page({ searchParams }) {
  const sessionId = searchParams.session_id;
  const stripeInstance = stripe(process.env.STRIPE_SECRET_KEY);

  try {
    const session = await stripeInstance.checkout.sessions.retrieve(sessionId);

    if (!session || session.payment_status === 'paid') {
      redirect('/');
    }

    return (
        <main className="px-4 pb-4 max-w-5xl mx-auto text-center">
            <h1 className="font-bold uppercase text-2xl">Order cancelled.</h1>
            <p>Your order has been cancelled. If this was a mistake, you can try placing your order again.</p>
            <Link href="/cart">Return to cart</Link>
        </main>
    );
  } catch (error) {
    redirect('/');
  }
}