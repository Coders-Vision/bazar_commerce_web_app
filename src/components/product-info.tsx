"use client";

import { Product } from "@/types/types";
import Currency from "./ui/currency";
import { Button } from "@/components/ui/button";
import { Share2, ShoppingCart } from "lucide-react";
import { MouseEventHandler } from "react";
import useCart from "@/hooks/use-cart";
import getCurrentHost from "@/utils/get-current-host";

interface ProductInfoProps {
  data: Product;
}

function ProductInfo({ data }: ProductInfoProps) {
  const cart = useCart();

  const onAddToCart: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.stopPropagation();
    cart.addItem(data);
  };

  const openShareDrawer = () => {
    const dataShare = {
      title: data.name,
      text: data.description,
      url: `${getCurrentHost().toString()}//product/${data.sku}/${data.slug}`,
    };
    if (navigator.share && navigator.canShare(dataShare)) {
      navigator.share(dataShare);
    } else {
      alert("Sharing not supported in this browser");
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900">{data.name}</h1>
      <div className="mt-3 flex items-end justify-between">
        <p className="text-2xl text-gray-900">
          <Currency value={parseFloat(data.price)} />
        </p>
      </div>
      <hr className="my-4" />
      <div className="flex flex-col gap-y-6">
        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold text-black">Brand: </h3>
          <div className="text-gray">{data?.brand?.name}</div>
        </div>
        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold text-black">Size: </h3>
          <div>{data?.size?.name}</div>
        </div>
        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold text-black">Color: </h3>
          <div
            className="h-6 w-6 rounded-full border border-gray-600"
            style={{ backgroundColor: data?.color?.value }}
          ></div>
        </div>
        <div className="mt-1">
          <h3 className="font-semibold text-black">Description: </h3>
          <div className="mt-2">{data?.description}</div>
        </div>
        <div className="mt-10 flex flex-col md:flex-row items-center gap-x-3 gap-y-2">
          <Button onClick={onAddToCart} className="flex item-center gap-x-2">
            <ShoppingCart />
            Add to Cart
          </Button>

          {!navigator.canShare && (
            <Button
              onClick={openShareDrawer}
              className="flex item-center gap-x-2"
            >
              <Share2 />
              Share
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductInfo;
