import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { prisma } from "@/shared/lib/prisma";

export async function POST(req: Request) {
  const SIGNING_SECRET = process.env.SIGNING_SECRET;

  if (!SIGNING_SECRET) {
    throw new Error(
      "Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env"
    );
  }

  const wh = new Webhook(SIGNING_SECRET);

  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error: Missing Svix headers", {
      status: 400,
    });
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);

  let evt: WebhookEvent;

  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error: Could not verify webhook:", err);
    return new Response("Error: Verification error", {
      status: 400,
    });
  }

  if (evt.type === "user.updated") {
    const { image_url, username, email_addresses, id } = evt.data;
    try {
      const updatedUser = await prisma.user.update({
        where: { id },
        data: {
          profile_image_url: image_url,
          username: username as string,
          email: email_addresses[0].email_address,
        },
      });
      return new Response(JSON.stringify(updatedUser), {
        status: 201,
      });
    } catch (err) {
      console.error("Error: Failed to update User in Database", err);
      return new Response("Error: Failed to update User in Database", {
        status: 400,
      });
    }
  }

  if (evt.type === "user.created") {
    const { image_url, id, username, email_addresses } = evt.data;
    try {
      const newUser = await prisma.user.create({
        data: {
          id,
          profile_image_url: image_url,
          username: username ?? "",
          email: email_addresses[0].email_address,
        },
      });
      return new Response(JSON.stringify(newUser), {
        status: 201,
      });
    } catch (err) {
      console.error("Error: Failed to store User in Database", err);
      return new Response("Error: Failed to store User in Database", {
        status: 400,
      });
    }
  }
  return new Response("Webhook received", { status: 200 });
}
