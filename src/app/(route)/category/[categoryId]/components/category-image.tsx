import React from "react";

function CategoryImage({image}:{image:string}) {
  return (
    <div className="p-4 sm:p-6 lg:p-8 rounded-xl overflow-hidden">
      <div
        className="rounded-xl relative aspect-video md:aspect-[2.4/1] overflow-hidden bg-cover"
        style={{ backgroundImage: `url(${image})` }}
      >
        {/* <div className="h-full w-full flex flex-col justify-center items-center gap-y-8">
          <div className="font-bold text-3xl sm:text-5xl lg:text-6xl sm:max-w-xl max-w-xs">
            {data?.label}
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default CategoryImage;
