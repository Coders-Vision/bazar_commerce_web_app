import Container from "@/layout/Container";
import { currrencyFormatter } from "@/lib/utils";
import { getOrderSummaryById } from "@/services/PaymentService";
import { ArrowRight } from "lucide-react";
import PaymentOptions from "./components/payment-options";
import OrderSummayItems from "./components/order-summary-items";

interface OrderSummaryyProps {
  params: {
    orderSummaryId: string;
  };
}

async function OrderSummary({ params }: OrderSummaryyProps) {
  const getOrderSummary = await getOrderSummaryById(params.orderSummaryId);

  return (
    <Container>
      <div className="bg-white">
        <Container>
          <div className="px-4 py-16 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-black">Order Summary</h1>
            <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start ">
              <OrderSummayItems orderSummary={getOrderSummary} />
              <div className="lg:col-span-4">
                <PaymentOptions orderSummaryId={params.orderSummaryId} />
              </div>
            </div>
          </div>
        </Container>
      </div>
    </Container>
  );
}

export default OrderSummary;
