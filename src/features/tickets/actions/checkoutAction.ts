"use server";
import { redirect } from "next/navigation";
import { Stripe } from "stripe";

export const checkoutAction = async (order: {
  eventId: number;
  userId: string;
  fullName: string;
  price: number;
  title: string;
}) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "usd",
            unit_amount: order.price * 100,
            product_data: {
              name: order.title,
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        fullName: order.fullName,
        eventId: order.eventId,
        userId: order.userId,
      },
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/dashboard?tab=tickets`,
      cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/events/details/${order.eventId}`,
    });
    redirect(session.url!);
  } catch (e) {
    throw e;
  }
};
