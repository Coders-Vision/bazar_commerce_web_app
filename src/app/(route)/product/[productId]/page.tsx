import ProductList from "@/components/home/product-list";
import ProductGallery from "@/components/gallery/product-gallery";
import Container from "@/layout/Container";
import { getProduct, getProducts } from "@/services/ProductService";
import ProductInfo from "@/components/product-info";

interface ProductPage {
  params: {
    productId: string;
  };
}

async function ProductPage({ params }: ProductPage) {
  const product = await getProduct(params?.productId);
  const similarProducts = await getProducts({
    categoryId: product?.category.id,
  });
  return (
    <div className="ng-white">
      <Container>
        <div className="px-4 py-10 sm:px-4 lg:px-6">
          <div className="lg:grid lg:grid-cols-2 lg:item-start lg:gap-x-8">
           <ProductGallery images={product.images} />
            <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0"><ProductInfo data={product} /></div>
          </div>
          <hr className="my-10" />
          <ProductList title="Similar Products" items={similarProducts} />
        </div>
      </Container>
    </div>
  );
}

export default ProductPage;
