"use client";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import React, { useCallback, useRef } from "react";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import { Autoplay} from "swiper/modules";
import ProductCard from "./ui/product-card";
import { Product } from "@/types/types";
import { Button } from "./ui/button";

type ProductsSlider = {
  title: string;
  results: Product[];
  showDescription?: boolean;
};

function ProductsSlider({ title, results }: ProductsSlider) {
  const slideRef = useRef<SwiperRef>(null);

  const handlePrev = useCallback(() => {
    if (!slideRef.current) return;
    slideRef.current?.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!slideRef.current) return;
    slideRef.current?.swiper.slideNext();
  }, []);

  if (!results.length) {
    return <></>;
  }
  return (
    <div className="mx-2 ">
      <h3 className="text-3xl font-bold">{title}</h3>
      <div className="relative">
        {/* <Button onClick={handlePrev}>Prev</Button>
        <Button onClick={handleNext}>Next</Button> */}
        <Swiper
          ref={slideRef}
          loop={true}
          autoplay={{
            delay: 4000,
          }}
          speed={200}
          // className="select-none"
          // modules={[Autoplay, Navigation, A11y, Scrollbar]}
          modules={[Autoplay]}
          
          //change dir based on locale
          dir={"ltr"}
          // concat Lang key like ar or en when implementing locale
          key={`${title.toLowerCase()}-`}
          breakpoints={{
            280: { slidesPerView: 2, spaceBetween: 4 },
            360: { slidesPerView: 2.5, spaceBetween: 5 },
            480: { slidesPerView: 2.75, spaceBetween: 5 },
            768: { slidesPerView: 4, spaceBetween: 5 },
            820: { slidesPerView: 4, spaceBetween: 10 },
            900: { slidesPerView: 5, spaceBetween: 5 },
            1024: { slidesPerView: 5, spaceBetween: 5 },
            1200: { slidesPerView: 6, spaceBetween: 5 },
          }}
        >
          {results.map((result, index) => (
            <SwiperSlide key={index}>
              <div className="my-4">
                <ProductCard key={result._id} data={result} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default ProductsSlider;
