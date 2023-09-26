import { cn } from "@/lib/utils";
import React from "react";

function ProductCardLoader({
  bgColor="bg-white/5",
  color="bg-rose-100/10",
}: {
  bgColor?: string;
  color?: string;
}) {
  return (
    <div className={`${cn("space-y-5 rounded-2xl p-4", bgColor)}}`}>
      <div className={`${cn("h-24 rounded-lg", color)}}`}></div>
      <div className="space-y-3">
        <div className={`${cn("h-3 w-3/5 rounded-lg ", color)}}`}></div>
        <div className={`${cn("h-3 w-3/5 rounded-lg ", color)}}`}></div>
        <div className={`${cn("h-3 w-3/5 rounded-lg ", color)}}`}></div>
      </div>
    </div>
  );
}

export default ProductCardLoader;
