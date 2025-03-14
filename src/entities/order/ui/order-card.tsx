import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { Button } from "@/shared/ui/button";

export default function OrderCard({ order }) {
  return (
    <Card>
      <CardHeader className="p-4 pb-0">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-base">{order.eventName}</CardTitle>
            <CardDescription>Order #{order.id}</CardDescription>
          </div>
          <div
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              order.status === "Completed"
                ? "bg-green-100 text-green-800"
                : order.status === "Pending"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {order.status}
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Date</span>
            <span>{order.date}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Tickets</span>
            <span>{order.quantity}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Total</span>
            <span className="font-medium">${order.total.toFixed(2)}</span>
          </div>
          <div className="pt-2">
            <Button variant="outline" size="sm" className="w-full">
              View Details
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
