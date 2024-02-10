import { getCategory } from "@/services/CategoryService";

import { getProducts } from "@/services/ProductService";

import Container from "@/layout/Container";
import Filter from "./components/filter";
import NoResults from "@/components/ui/no-results";
import ProductCard from "@/components/ui/product-card";
import MobileFilters from "./components/mobile-filters";
import { Metadata } from "next";
import CategoryImage from "./components/category-image";
import Filters from "./components/filters";

export const revalidate = 0;

interface CategoryProps {
  params: {
    categoryId: string;
  };
  searchParams: {
    colorId: string;
    sizeId: string;
  };
}

export const metadata: Metadata = {
  title: "Category",
  robots: {
    index: false,
    follow: true,
    nocache: true,
  },
};
async function Category({ params, searchParams }: CategoryProps) {
  const products = await getProducts({
    categoryId: [params.categoryId],
    colorId: [searchParams.colorId],
    // sizeId: [searchParams.sizeId],
  });

  const category = await getCategory(params?.categoryId);

  return (
    <div className="bg-white">
      <Container>
        <CategoryImage image={category.image.image} />
      </Container>
      <div className="px-4 sm:px-6 lg:px-8 pb-24">
        <div className="lg:grid lg:grid-cols-5 lg-gap-x-8">
          <MobileFilters />
          <div className="hidden lg:block">
            <Filters />
          </div>
          <div className="mt-6 lg:col-span-4 lg:mt-0">
            {products.length === 0 && <NoResults />}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {products.map((item) => (
                <ProductCard key={item._id} data={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Category;
