import Container from "@/layout/Container";
import { getTransaction } from "@/services/PaymentService";
import PaymentStatus from "./components/payment-status";

interface PaymentProps {
  searchParams: {
    transactionId?: string;
    // data?: string;
  };
}

async function Payment({ searchParams }: PaymentProps) {
  const transactionDetails = await getTransaction(
    searchParams?.transactionId || ""
  );

  return (
    <div className="bg-white">
      <Container>
        <PaymentStatus
          message={
            transactionDetails?.result === "SUCCESS"
              ? "Payment done successfully"
              : ""
          }
          status={transactionDetails?.result}
        />
      </Container>
    </div>
  );
}

export default Payment;
