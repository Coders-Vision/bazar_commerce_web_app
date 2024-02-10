import { cn } from "@/lib/utils";
import { Tab } from "@headlessui/react";
import Image from "next/image";
import { ProductImages as ImageType } from "@/types/types";

interface GalleryTabProps {
  image: ImageType;
}

function GalleryTab({ image }: GalleryTabProps) {
  return (
    <Tab className="relative flex items-center justify-center bg-white rounded-md cursor-pointer aspect-square">
      {({ selected }) => (
        <div>
          <span className="absolute inset-0 w-full h-full overflow-hidden aspect-square rounder-md">
            <Image
              src={image.primaryImage.image}
              alt=""
              fill
              className="object-cover object-center"
            />
          </span>
          <span
            className={cn(
              "absoulte inset-0 rounded-md ring-2 ring-offset-2",
              selected ? "ring-black" : "ring-transparent"
            )}
          ></span>
        </div>
      )}
    </Tab>
  );
}

export default GalleryTab;
