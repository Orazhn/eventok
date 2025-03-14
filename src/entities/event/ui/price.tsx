import { Badge } from "@/shared/ui/badge";

const Price = ({ price }: { price: number }) => {
  return (
    <Badge className="font-semibold px-4 bg-green-500 ">
      {price > 0 ? ` $ ${price}` : "FREE"}
    </Badge>
  );
};

export default Price;
