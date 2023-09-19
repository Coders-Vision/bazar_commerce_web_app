import ProductList from "@/components/home/product-list";
import ProductGallery from "@/components/gallery/product-gallery";
import Container from "@/layout/Container";
import { getProductBySKU, getProducts } from "@/services/ProductService";
import ProductInfo from "@/components/product-info";
import { Metadata } from "next";
import getCurrentHost from "@/utils/get-current-host";

interface ProductPage {
  params: {
    sku: string;
    slug: string;
  };
}

export async function generateMetadata({
  params,
}: ProductPage): Promise<Metadata> {
  const product = await getProductBySKU(params?.sku);
  try {
    if (!product) {
      return {
        title: "",
      };
    } else {
      return {
        title: product.name,
        description: product.description,
        openGraph: {
          title: product.name,
          description: product.description,
          // images: product.images,
          type: "website",
        },
        twitter: {
          title: product.name,
          description: product.description,
        },
        alternates: {
          canonical: `/product/${params.sku}/${params.slug}`,
        },
      };
    }
  } catch (error) {
    return {
      title: "No Name",
    };
  }
}

async function ProductPage({ params }: ProductPage) {
  const product = await getProductBySKU(params?.sku);
  const similarProducts = await getProducts({
    categoryId: product?.category.id,
  });
  return (
    <div className="ng-white">
      <Container>
        <div className="px-4 py-10 sm:px-4 lg:px-6">
          <div className="lg:grid lg:grid-cols-2 lg:item-start lg:gap-x-8">
            <ProductGallery images={product.images} />
            <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
              <ProductInfo data={product} />
            </div>
          </div>
          <hr className="my-10" />
          <ProductList title="Similar Products" items={similarProducts} />
        </div>
      </Container>
    </div>
  );
}

export default ProductPage;
