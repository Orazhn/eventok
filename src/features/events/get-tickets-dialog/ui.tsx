"use client";

import { useState } from "react";
import { Button } from "@/shared/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/dialog";
import { Label } from "@/shared/ui/label";
import { MinusIcon, PlusIcon } from "lucide-react";
import { formatCurrency } from "@/shared/lib/utils";

interface BuyTicketDialogProps {
  ticketPrice: number;
  ticketName?: string;
}

export function BuyTicketDialog({
  ticketPrice,
  ticketName = "Standard Ticket",
}: BuyTicketDialogProps) {
  const [quantity, setQuantity] = useState(1);
  const total = ticketPrice * quantity;

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Buy Tickets</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Buy Tickets</DialogTitle>
          <DialogDescription>
            Purchase tickets for the event. Review your order before confirming.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Ticket</Label>
            <div className="col-span-3 font-medium">{ticketName}</div>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Price</Label>
            <div className="col-span-3">{formatCurrency(ticketPrice)}</div>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Quantity</Label>
            <div className="col-span-3 flex items-center">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full"
                onClick={decrementQuantity}
                disabled={quantity <= 1}
              >
                <MinusIcon className="h-3 w-3" />
                <span className="sr-only">Decrease quantity</span>
              </Button>

              <div className="flex w-12 items-center justify-center font-medium mx-2">
                {quantity}
              </div>

              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full"
                onClick={incrementQuantity}
              >
                <PlusIcon className="h-3 w-3" />
                <span className="sr-only">Increase quantity</span>
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Total</Label>
            <div className="col-span-3 text-lg font-bold">
              {formatCurrency(total)}
            </div>
          </div>
        </div>
        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          <Button variant="outline" className="sm:w-auto w-full">
            Cancel
          </Button>
          <Button type="submit" className="sm:w-auto w-full">
            Confirm Purchase
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
