"use client";

import React, { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-hot-toast";
import useCart from "@/hooks/use-cart";
import { createOrder } from "@/actions/payment";
import { AxiosError } from "axios";
import { Button, Spinner } from "flowbite-react";

function PaymentOptions({ orderSummaryId }: { orderSummaryId: string }) {
  const [paymentGateway, setPaymentGateway] = useState<string>("");

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

  const onProceed = async () => {
    try {
      setIsLoading(true);

      const payload = {
        orderSummaryId: orderSummaryId,
        phone: "51234567",
        address: "hello",
        paymentGateway,
      };
      const response = await createOrder(payload);
      window.location = response?.paymentUrl;
    } catch (e) {
      setIsLoading(false);
      console.error(e);
      const error = e as AxiosError;
      const msg: any = error?.response?.data;
      const errorMessage = msg?.message || "";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full  mt-8 md:mt-0 pl-4">
      <h2 className="font-semibold text-xl">Payment Method</h2>
      <ul className="grid w-full gap-6 my-4">
        <li onClick={() => setPaymentGateway("TAP")}>
          <input
            type="radio"
            checked={paymentGateway == "TAP" ? true : false}
            className="hidden peer"
            // onClick={() => setPaymentGateway("TAP")}
          />
          <label className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
            <div className="block">
              <div className="flex">
                <img
                  className="w-8"
                  src={
                    "https://upload.wikimedia.org/wikipedia/commons/b/b2/Tap_Payments.svg"
                  }
                />
                <div className="mx-4">
                  <div className="w-full text-lg font-semibold">Tap</div>
                  <div className="w-full">Place order with Tap Payments</div>
                </div>
              </div>
            </div>
            <ArrowRight />
          </label>
        </li>
      </ul>

      <div className="mt-8">
        <Button
          onClick={onProceed}
          disabled={paymentGateway.length === 0 || isLoading}
          className="w-full mt-6"
        >
          {isLoading ? (
            <>
              <Spinner aria-label="signing" />
              <span className="pl-3">Please wait...</span>
            </>
          ) : (
            " Place Order"
          )}
        </Button>
      </div>
    </div>
  );
}

export default PaymentOptions;
