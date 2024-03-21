import ProductList from "@/components/home/product-list";
import ProductGallery from "@/components/gallery/product-gallery";
import Container from "@/layout/Container";
import { getProductBySKU, getProducts } from "@/actions/product";
import ProductInfo from "@/components/product-info";
import { Metadata } from "next";

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
        title: product.nameEn,
        description: product.descriptionEn,
        openGraph: {
          title: product.nameEn,
          description: product.descriptionEn,
          // images: product.images,
          type: "website",
        },
        twitter: {
          title: product.nameEn,
          description: product.descriptionEn,
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
    categoryId: product?.category.map((cat) => cat._id),
  });

  const processImages = [
    {
      image: product.images.primaryImage.image,
      thumbImage: product.images.primaryImage.thumbImage,
    },
    {
      image: product?.images?.secondaryImage?.image,
      thumbImage: product?.images?.secondaryImage?.thumbImage,
    },
    {
      image: product.images?.thirdImage?.image,
      thumbImage: product.images?.thirdImage?.thumbImage,
    },
  ];

  return (
    <div className="ng-white">
      <Container>
        <div className="px-4 py-10 sm:px-4 lg:px-6">
          <div className="lg:grid lg:grid-cols-2 lg:item-start lg:gap-x-8">
            <ProductGallery images={processImages} />
            <div className="px-4 mt-10 sm:mt-16 sm:px-0 lg:mt-0">
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
