import { getProductBySKU } from "@/actions/product";
import { ImageResponse } from "next/og";

interface ProductPage {
  params: {
    sku: string;
    slug: string;
  };
}

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function og({ params }: ProductPage) {
  const product = await getProductBySKU(params?.sku);

  return new ImageResponse(
    (
      <div tw="relative flex w-full h-full flex items-center justify-center">
        {/* Background */}
        <div tw="absolute flex inset-0">
          <img
            tw="flex flex-1"
            src={product?.images.primaryImage.image + "&w=1200&h=630&auto=format&q=75"}
            alt={product?.nameEn!!}
          />
          {/* Overlay */}
          <div tw="absolute flex inset-0 bg-black bg-opacity-50" />
        </div>
        <div tw="flex flex-col text-neutral-50">
          {/* Title */}
          <div tw="text-7xl font-bold">{product?.nameEn}</div>
        </div>
      </div>
    ),
    size
  );
}
