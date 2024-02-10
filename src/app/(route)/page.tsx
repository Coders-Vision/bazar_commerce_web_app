import Billboard from "@/components/home/billboard";
import ProductList from "@/components/home/product-list";
import Container from "@/layout/Container";
import { getBillboards } from "@/services/BillboardService";
import { getProducts } from "@/services/ProductService";

export const revalidate = 0;

async function Home() {
  const billboards = await getBillboards();
  const products = await getProducts({});

  return (
    <Container>
      <div className="space-y-10 pb-10">
        <Billboard data={billboards} />
        <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-4">
          <ProductList title={"Feature Product"} items={products} />
        </div>
      </div>
    </Container>
  );
}

export default Home;
