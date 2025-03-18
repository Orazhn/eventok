"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  MapPin,
  User,
  DollarSign,
  QrCode,
} from "lucide-react";
import { Button } from "@/shared/ui/button";
import { Card, CardContent } from "@/shared/ui/card";
import { ITicket } from "../modal";
import { formatEventDate, formatTime } from "@/shared/lib/utils";
import { FullQrDialog } from "./fullQrDialog";

export default function TicketCard({ ticket }: { ticket: ITicket }) {
  const [showQR, setShowQR] = useState(false);

  const handleQr = () => setShowQR(!showQR);
  return (
    <Card className="max-sm:h-full sm:h-full max-sm:w-full lg:min-w-lg max-w-xl md:h-[340px] overflow-hidden hover:shadow-2xl shadow-xl rounded-xl py-0 md:p-4 flex flex-col">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-0 items-center h-full">
        <div className="flex justify-center items-center h-full relative rounded-lg md:p-0">
          <motion.div
            className="w-full aspect-square h-[200px]"
            initial={false}
            animate={{ rotateY: showQR ? 180 : 0 }}
            transition={{ duration: 0.5 }}
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="absolute inset-0 flex justify-center items-center backface-hidden">
              <Button
                onClick={handleQr}
                className="text-lg md:text-2xl font-bold tracking-tight"
              >
                SHOW QR
              </Button>
            </div>
            <div className="absolute inset-0 flex justify-center items-center backface-hidden rotate-y-180">
              <FullQrDialog code={ticket.code} />
            </div>
          </motion.div>
        </div>

        <div className="col-span-2 p-4 md:p-6 flex flex-col h-full">
          <CardContent className="p-0 space-y-4 md:space-y-6 flex flex-col h-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-grow">
              <div className="space-y-1">
                <div className="flex items-center text-muted-foreground">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span className="text-sm">Date</span>
                </div>
                <p className="font-medium text-sm md:text-base">
                  {formatEventDate(ticket.event.date)}
                </p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center text-muted-foreground">
                  <Clock className="h-4 w-4 mr-2" />
                  <span className="text-sm">Time</span>
                </div>
                <p className="font-medium text-sm md:text-base">
                  {formatTime(ticket.event.start_time)}
                </p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span className="text-sm">Location</span>
                </div>
                <p className="font-medium text-sm md:text-base">
                  {ticket.event.location}
                </p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center text-muted-foreground">
                  <User className="h-4 w-4 mr-2" />
                  <span className="text-sm">Full Name</span>
                </div>
                <p className="font-medium text-sm md:text-base truncate max-w-[180px]">
                  {ticket.fullName}
                </p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center text-muted-foreground">
                  <DollarSign className="h-4 w-4 mr-2" />
                  <span className="text-sm">Payment</span>
                </div>
                <p className="font-medium text-sm md:text-base">
                  {ticket.payed}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between border-t pt-4">
              <p className="text-xs md:text-sm text-muted-foreground">
                Issued: {formatEventDate(ticket.createdAt)}
              </p>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
                onClick={handleQr}
              >
                <QrCode className="h-4 w-4" />
                {showQR ? "Hide QR" : "Show QR"}
              </Button>
            </div>
          </CardContent>
        </div>
      </div>
    </Card>
  );
}
