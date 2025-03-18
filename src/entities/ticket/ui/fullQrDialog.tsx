import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/dialog";
import { QRCodeSVG } from "qrcode.react";

export function FullQrDialog({ code }: { code: string }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="w-full h-full aspect-square bg-white p-2 md:p-4 rounded-lg shadow-sm cursor-pointer">
          <QRCodeSVG value={code} className="size-full" />
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] flex items-center justify-center p-1 ">
        <DialogTitle />
        <QRCodeSVG value={code} className="size-96" />
      </DialogContent>
    </Dialog>
  );
}
