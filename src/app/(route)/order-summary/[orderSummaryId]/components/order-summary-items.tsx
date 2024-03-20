"use client";
import React from "react";
import { currrencyFormatter } from "@/lib/utils";


function OrderSummayItems({orderSummary}:{orderSummary :any}) {
  return (
    <div className="lg:col-span-8">
      <div className="w-full md:w-3/4 bg-gray-100 rounded-lg p-4 shadow-md">
        <h2 className="font-semibold text-xl">Items Placed</h2>
        <div className="flex mt-4 mb-4">
          <div className="w-1/2 text-sm font-light">Item</div>
          <div className="w-1/2 text-sm font-light text-right">Price</div>
        </div>
        <div className="border-b border-gray-200"></div>

        {orderSummary?.data?.orderItems?.map((item: any, index: number) => (
          <div key={index} className="flex mt-4 py-2">
            <div className="w-1/2 text-sm">
              <div className="flex gap-x-4">
                <img
                  className="w-16"
                  src={item?.productId?.images?.primaryImage?.thumbImage}
                />
                {item?.qty} x {item?.productId?.nameEn}
              </div>
            </div>
            <div className="w-1/2 text-sm text-right">
              {currrencyFormatter(item?.price)}
            </div>
          </div>
        ))}
        <div className="flex mt-4 pt-4 border-t border-gray-200">
          <div className="w-1/2 text-sm font-semibold">Total</div>
          <div className="w-1/2 text-sm font-semibold text-right">
            {currrencyFormatter(orderSummary?.data?.totalAmount)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderSummayItems;
