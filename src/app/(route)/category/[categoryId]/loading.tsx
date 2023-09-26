import Container from "@/layout/Container";
import ImageLoader from "@/components/ui/loaders/image-loader";
import ProductCardLoader from "@/components/ui/loaders/product-card-loader";

function Loader() {
  return (
    <div className="bg-white">
      <Container>
        Loading
      </Container>
      <div className="px-4 sm:px-6 lg:px-8 pb-24">
        <div className="lg:grid lg:grid-cols-5 lg-gap-x-8">
          {/* Loader */}

          <div className="hidden lg:block">
            {/* Size Loader */}
            {/* Color Loader */}
          </div>
          <div className="mt-6 lg:col-span-4 lg:mt-0">
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <ProductCardLoader />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Loader;
