import { NextResponse } from 'next/server';
import stripe from 'stripe';

const stripeInstance = stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const { line_items } = await req.json();
    const session = await stripeInstance.checkout.sessions.create({
        line_items: [
            {
              // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
              price: 'price_1PlFga2M4rj1gd0ux9LsirbP',
              quantity: 1,
            },
          ],
      mode: 'payment',
      success_url: `${req.headers.get('origin')}/?success=true`,
      cancel_url: `${req.headers.get('origin')}/?canceled=true`,
    });
    return NextResponse.redirect(session.url, 303);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: err.statusCode || 500 });
  }
}

export function GET() {
  return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });
}
