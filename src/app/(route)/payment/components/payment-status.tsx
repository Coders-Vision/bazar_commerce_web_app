"use client";
import { Button } from "@/components/ui/button";
import useCart from "@/hooks/use-cart";
import { CheckCircle, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface PaymentStatusProps {
  status: string;
  message?: string;
}

function PaymentStatus({ status }: PaymentStatusProps) {

  const router = useRouter();
  const removeAll = useCart((state) => state.removeAll);


  useEffect(() => {
    if (status === "success") {
      toast.success("Payment completed.");
      removeAll();
    }
  }, [removeAll]);
  return (
    <div className="bg-white p-6  sm:mx-auto  md:mx-auto flex flex-col justify-center items-center ">
      {status === "success" ? (
        <CheckCircle size={100} color="green" />
      ) : (
        <XCircle size={100} color="red" />
      )}

      <div className="text-center">
        <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
          {status === "success" ? "Payment Done!" : "Payment Error"}
        </h3>
        <p className="text-gray-600 my-2">
          {status === "success"
            ? "Thank you for completing your secure online payment."
            : "Unable to Complete Payment"}
        </p>
        <div className="py-10 text-center">
          <Button
            onClick={() => router.push("/")}
            className="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3"
          >
            GO BACK
          </Button>
        </div>
      </div>
    </div>
  );
}

export default PaymentStatus;
