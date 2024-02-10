"use client";

interface BillboardProps {
  data: BillboardType[];
}

import { Billboard as BillboardType } from "@/types/types";
// import { useRouter } from "next/navigation";
import Image from "next/image";

import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import "swiper/css/scrollbar";

function Billboard({ data }: BillboardProps) {
  // const router = useRouter();

  return (
    <div className="p-4 sm:p-6 lg:p-8 rounded-xl overflow-hidden">
      <div className="rounded-xl relative md:aspect-[2.4/1] overflow-hidden bg-cover">
        <Swiper
          modules={[Navigation, Pagination, A11y]}
          spaceBetween={0}
          slidesPerView={1}
          navigation={false}
          loop={true}
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log("slide change")}
        >
          {data.map((image, i) => (
            <SwiperSlide
              // onClick={() => router.push(`/${image.label}`)}
              zoom
              key={i}
              className=""
            >
              <Image
                width="0"
                height="0"
                sizes="100vw"
                placeholder="empty"
                src={image.image.image}
                key={i}
                alt="product"
                className="rounded-lg w-full h-auto"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default Billboard;
