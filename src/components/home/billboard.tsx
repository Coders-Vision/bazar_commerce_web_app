"use client";
// import { useEffect, useState } from "react";
import { Billboard as BillboardType } from "@/types";
// import { Carousel } from "flowbite-react";

interface BillboardProps {
  data: BillboardType;
}

function Billboard({ data }: BillboardProps) {
  // const [mounted, setMounted] = useState(false);

  // useEffect(() => {
  //   setMounted(true);
  // }, []);
  // if (!mounted) {
  //   return null;
  // }

  return (
    <div className="p-4 sm:p-6 lg:p-8 rounded-xl overflow-hidden">
      <div
        className="rounded-xl relative aspect-square md:aspect-[2.4/1] overflow-hidden bg-cover"
        style={{ backgroundImage: `url(${data?.imageUrl})` }}
      >
        <div className="h-full w-full flex flex-col justify-center items-center gap-y-8">
          <div className="font-bold text-3xl sm:text-5xl lg:text-6xl sm:max-w-xl max-w-xs">
            {data?.label}
          </div>
        </div>
      </div>
    </div>

    // <Carousel>
    //   <div className="flex h-full items-center justify-center bg-gray-400 dark:bg-gray-700 dark:text-white">
    //     Slide 1
    //   </div>
    //   <div className="flex h-full items-center justify-center bg-gray-400 dark:bg-gray-700 dark:text-white">
    //     Slide 2
    //   </div>
    //   <div className="flex h-full items-center justify-center bg-gray-400 dark:bg-gray-700 dark:text-white">
    //     Slide 3
    //   </div>
    // </Carousel>
  );
}

export default Billboard;
