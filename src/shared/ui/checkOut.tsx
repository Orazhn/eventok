import React, { useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { IEvent } from "@/entities/event/modal";
import { Button } from "./button";
import { checkoutAction } from "@/features/tickets/actions/checkoutAction";
import { useQueryClient } from "@tanstack/react-query";

loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const CheckOut = ({
  event,
  userId,
  name,
  surname,
}: {
  event: IEvent;
  userId: string;
  name: string;
  surname?: string;
}) => {
  const queryClient = useQueryClient();
  const { id, ticket_price, title } = event;

  const handleCheckOut = async () => {
    await checkoutAction({
      eventId: id,
      userId,
      fullName: `${name} ${surname}`,
      price: ticket_price,
      title,
    });
    await queryClient.invalidateQueries({ queryKey: ["tickets"] });
  };

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      console.log("Order placed! you will receive an email confirmation");
    }
    if (query.get("canceled")) {
      console.log(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }
  }, []);
  return (
    <Button
      type="button"
      onClick={handleCheckOut}
      disabled={name?.length < 2 || !name}
    >
      Checkout
    </Button>
  );
};

export default CheckOut;
