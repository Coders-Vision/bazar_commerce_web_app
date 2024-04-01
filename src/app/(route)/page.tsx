import Billboard from "@/components/home/billboard";
import ProductList from "@/components/home/product-list";
import Container from "@/layout/Container";
import { getBillboards } from "@/actions/billboard";
import { getProducts } from "@/actions/product";
import ProductsSlider from "@/components/products-slider";

export const revalidate = 0;

async function Home() {
  const billboards = await getBillboards();
  const products = await getProducts({});

  return (
    <Container>
      <div className="pb-10 space-y-10">
        <Billboard data={billboards} />
        <ProductsSlider results={products} title="Feature Products" />
        {/* <div className="flex flex-col px-4 gap-y-8 sm:px-6 lg:px-4">
          <ProductList title={"Feature Product"} items={products} />
        </div> */}
      </div>
    </Container>
  );
}

export default Home;
