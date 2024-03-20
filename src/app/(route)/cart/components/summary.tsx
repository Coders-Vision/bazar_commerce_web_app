"use client";

import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";
import { toast } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { createOrderSummary } from "@/services/PaymentService";
import { Spinner } from "flowbite-react";
import { Cart } from "@/types/types";

function Summarry() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const items = useCart((state) => state.items);
  const removeAll = useCart((state) => state.removeAll);

  useEffect(() => {
    if (searchParams.get("success")) {
      toast.success("Payment completed.");
      removeAll();
    }

    if (searchParams.get("canceled")) {
      toast.error("Something went wrong.");
    }
  }, [searchParams, removeAll]);

  const totalPrice = items.reduce((total, item) => {
    return total + Number(item.salePrice);
  }, 0);

  const onProceed = async () => {
    try {
      setIsLoading(true);
      const cartItems: Cart[] = items.map((item) => ({
        productId: item._id,
        price: parseFloat(item.salePrice),
        qty: 1,
      }));
      const orderSummary = { orderItems: cartItems };
      const response = await createOrderSummary(orderSummary);
      if (response?.status === "success") {
        router.push(`/order-summary/${response?.data?._id}`);
      }
    } catch (e) {
      setIsLoading(false);
      const error = e as AxiosError;
      const msg: any = error?.response?.data;
      const errorMessage = msg?.message || "";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
      <h2 className="text-lg font-medium text-gray-900">Order summary</h2>
      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <div className="text-base font-medium text-gray-900">Order total</div>
          <Currency value={totalPrice} />
        </div>
      </div>
      <Button
        onClick={onProceed}
        disabled={items.length === 0 || isLoading}
        className="w-full mt-6"
      >
        {isLoading ? (
          <>
            <Spinner aria-label="signing" />
            <span className="pl-3">Please wait...</span>
          </>
        ) : (
          "Proceed"
        )}
      </Button>
    </div>
  );
}

export default Summarry;
