// import { useSearchParams } from "next/navigation";
// import { useEffect } from "react";
import useCart from "@/hooks/use-cart";
import Container from "@/layout/Container";
import { retreiveChargeId } from "@/services/PaymentService";
import { toast } from "react-hot-toast";
import PaymentStatus from "./components/payment-status";

interface PaymentProps {
  searchParams: {
    tap_id?: string;
    // data?: string;
  };
}

async function Payment({ searchParams }: PaymentProps) {
  const chargeDetails = await retreiveChargeId(searchParams?.tap_id || "");

  return (
    <div className="bg-white">
      <Container>

        <PaymentStatus
          message={chargeDetails?.message}
          status={chargeDetails?.status}
        />

      </Container>
    </div>
  );
}

export default Payment;
