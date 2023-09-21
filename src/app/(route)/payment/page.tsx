import Container from "@/layout/Container";
import { tapRetreiveChargeId } from "@/services/PaymentService";
import PaymentStatus from "./components/payment-status";

interface PaymentProps {
  searchParams: {
    tap_id?: string;
    // data?: string;
  };
}

async function Payment({ searchParams }: PaymentProps) {
  const chargeDetails = await tapRetreiveChargeId(searchParams?.tap_id || "");

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
