import stripe from 'stripe';

import { NextResponse } from 'next/server';

const stripeInstance = stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const { origin } = new URL(req.url);
    const cartData = await req.json(); // Parse the JSON data from the request body

    // Create line items from the cart data
    const lineItems = cartData.map(item => ({
      price_data: {
        currency: 'eur', // Or your preferred currency
        product_data: {
          name: item.attributes.name,
          description: `by ${item.attributes.creator}`,
        },
        unit_amount: item.attributes.price * 100, // Stripe expects the amount in cents
      },
      quantity: item.quantity,
    }));

    const session = await stripeInstance.checkout.sessions.create({
      line_items: lineItems,
      mode: 'payment',
      success_url: `${origin}/successful_order?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cancelled_order?session_id={CHECKOUT_SESSION_ID}`,
    });

    return NextResponse.json({ url: session.url }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: err.statusCode || 500 });
  }
}