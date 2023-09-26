"use client";
import { ProductImages as Images } from "@/types/types";
import { useState } from "react";
import { Navigation, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperT } from "swiper/types";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/thumbs";
import "swiper/css/effect-coverflow";
import "swiper/css/mousewheel";
import "swiper/css/autoplay";
import "swiper/css/effect-fade";
import "swiper/css/grid";

interface ProductGalleryProps {
  images: Images[];
}

function ProductGallery({ images }: ProductGalleryProps) {
  const [activeThumb, setActiveThumb] = useState<SwiperT>();
  return (
    <div className=" border-2  border-slate-100">
      <Swiper
        modules={[Navigation, Thumbs]}
        loop={true}
        slidesPerView={1}
        pagination={{
          clickable: true,
        }}
        grabCursor={true}
        navigation={true}
        thumbs={{
          swiper: activeThumb && !activeThumb.destroyed ? activeThumb : null,
        }}
        className="thumbShow"
      >
        {images.map((p, index) => {
          return (
            <SwiperSlide key={index}>
              <img className="w-[90vw] h-[75vh] object-scale-down" src={p.url} alt="" />
            </SwiperSlide>
          );
        })}
      </Swiper>
      <Swiper
        onSwiper={setActiveThumb}
        loop={false}
        grabCursor={true}
        spaceBetween={10}
        slidesPerView={4}
        modules={[Navigation, Thumbs]}
        className="thumbBtn mt-3 border-2  border-slate-100"
      >
        {images.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="">
              <img className="w-[250px] h-[200px] object-scale-down" src={item.url} alt="product images" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
    // <Tab.Group as="div" className="flex flex-col-reverse">
    //   <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
    //     <Tab.List className="grid grid-cols-4 gap-6">
    //       {images.map((image) => (
    //         <GalleryTab key={image.id} image={image} />
    //       ))}
    //     </Tab.List>
    //   </div>
    //   <Tab.Panels className="aspect-square w-full">
    //     {images.map((image) => (
    //       <Tab.Panel key={image.id}>
    //         <div className="aspect-square relative h-full w-full sm:rounded-lg overflow-hidden">
    //           <Image
    //             fill
    //             src={image.url}
    //             alt="Image"
    //             className="object-cover object-center"
    //           />
    //         </div>
    //       </Tab.Panel>
    //     ))}
    //   </Tab.Panels>
    // </Tab.Group>
  );
}

export default ProductGallery;
