"use client";
import { Product } from "@/types/types";
import Image from "next/image";
import IconButton from "./icon-button";
import { Expand, ShoppingCart } from "lucide-react";
import Currency from "./currency";
import { useRouter } from "next/navigation";
import { useModal, useModalContext } from "@/context/ModalContext";
import PreviewModal from "./preview-modal";
import { MouseEventHandler } from "react";
import useCart from "@/hooks/use-cart";

interface ProductCardProps {
  data: Product;
}

function ProductCard({ data }: ProductCardProps) {
  const router = useRouter();
  const modal = useModalContext();

  const cart = useCart();
  const handleClick = () => {
    router.push(`/product/${data?.sku}/${data?.slug}`);
  };

  const onPreview: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.stopPropagation();
    await modal.showModal({
      content: <PreviewModal images={data.images} product={data} />,
      // title: data.name,
      // showModalControls: true,
    });
  };
  const onAddToCart: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.stopPropagation();
    cart.addItem(data);
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white group cursor-pointer rounded-xl border p-3 space-y-4"
    >
      {/* Image & actions */}
      <div className="aspect-square rounded-xl bg-gray-100 relative">
        <Image
          src={data.images?.[0]?.url}
          alt=""
          fill
          className="aspect-square object-scale-down rounded-md"
        />
        <div className="opacity-0 group-hover:opacity-100 transition absolute w-full px-6 bottom-5">
          <div className="flex gap-x-6 justify-center">
            <IconButton
              onClick={onPreview}
              icon={<Expand size={20} className="text-gray-600" />}
            />
            <IconButton
              onClick={onAddToCart}
              icon={<ShoppingCart size={20} className="text-gray-600" />}
            />
          </div>
        </div>
      </div>
      {/* Description */}
      <div>
        <p className="font-semibold text-lg">{data.name}</p>
        <p className="text-sm text-gray-500">{data.category?.name}</p>
      </div>
      {/* Price & Reiew */}
      <div className="flex items-center justify-between">
        <Currency value={parseFloat(data?.price)} />
      </div>
    </div>
  );
}

export default ProductCard;
