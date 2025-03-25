import stripe from "stripe";
import { NextResponse } from "next/server";
import { buyTicketAction } from "@/features/tickets/actions/buyTicketAction";

export async function POST(request: Request) {
  const body = await request.text();

  const sig = request.headers.get("stripe-signature") as string;
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

  let event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err) {
    return NextResponse.json({ message: "Webhook error", error: err });
  }

  const eventType = event.type;

  // CREATE
  if (eventType === "checkout.session.completed") {
    const { amount_total, metadata } = event.data.object;

    const ticket = {
      eventId: Number(metadata?.eventId),
      userId: metadata?.userId as string,
      payed: amount_total ? amount_total / 100 : 0,
      fullName: metadata?.fullName as string,
    };

    const newOrder = await buyTicketAction(ticket);

    return NextResponse.json({ message: "OK", order: newOrder });
  }

  return new Response("", { status: 200 });
}
