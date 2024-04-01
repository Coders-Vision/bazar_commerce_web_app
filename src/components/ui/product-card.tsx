"use client";
import { Product } from "@/types/types";
import Image from "next/image";
import IconButton from "./icon-button";
import { Expand, ShoppingCart } from "lucide-react";
import Currency from "./currency";
import { useRouter } from "next/navigation";
import { useModalContext } from "@/context/ModalContext";
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
    cart.addItem({...data,qty:1});
  };

  return (
    <div
      onClick={handleClick}
      className="p-3 space-y-4 bg-white border cursor-pointer group rounded-xl"
    >
      {/* Image & actions */}
      <div className="relative bg-gray-100 aspect-square rounded-xl">
        <Image
          src={data.images?.primaryImage.image}
          alt=""
          fill
          className="object-scale-down rounded-md aspect-square"
        />
        <div className="absolute w-full px-6 transition opacity-0 group-hover:opacity-100 bottom-5">
          <div className="flex justify-center gap-x-6">
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
        <p className="text-lg font-semibold truncate">{data.nameEn}</p>
        <p className="text-sm text-gray-500">{data.category[0]?.nameEn}</p>
      </div>
      {/* Price & Reiew */}
      <div className="flex items-center justify-between">
        <Currency value={parseFloat(data?.salePrice)} />
      </div>
    </div>
  );
}

export default ProductCard;
