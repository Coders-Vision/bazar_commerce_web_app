"use client";

import { Product, ProductImages } from "@/types/types";
import ProductGallery from "../gallery/product-gallery";
import ProductInfo from "../product-info";

interface PreviewModalProps {
  images: ProductImages;
  product: Product;
}

function PreviewModal({ images, product }: PreviewModalProps) {
  const processImages = [
    {
      image: images.primaryImage.image,
      thumbImage: images.primaryImage.thumbImage,
    },
    {
      image: images.secondaryImage.image,
      thumbImage: images.secondaryImage.thumbImage,
    },
    {
      image: images.thirdImage.image,
      thumbImage: images.thirdImage.thumbImage,
    },
  ];

  return (
    <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8 py-2">
      <div className="sm:col-span-4 lg:col-span-5">
        <ProductGallery images={processImages} />
      </div>
      <div className="sm:col-span-8 lg:col-span-7">
        <ProductInfo data={product} />
      </div>
    </div>
  );
}

export default PreviewModal;
