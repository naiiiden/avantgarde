import { NextResponse } from 'next/server';
import stripe from 'stripe';

const stripeInstance = stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const { origin } = new URL(req.url); // Extract the origin from the request URL

    const session = await stripeInstance.checkout.sessions.create({
      line_items: [
        {
          price: 'price_1PlFga2M4rj1gd0ux9LsirbP', // Replace with your actual price ID
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${origin}/?success=true`,
      cancel_url: `${origin}/?canceled=true`,
    });

    return NextResponse.redirect(session.url, 303);
  } catch (err) {
    return new NextResponse(JSON.stringify({ error: err.message }), {
      status: err.statusCode || 500,
    });
  }
}