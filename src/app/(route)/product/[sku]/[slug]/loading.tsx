import ImageLoader from "@/components/ui/loaders/image-loader";
import Container from "@/layout/Container";

function Loading() {
  return (
    <div className="ng-white">
      <Container>
        <div className="px-4 py-10 sm:px-4 lg:px-6">
          <div className="lg:grid lg:grid-cols-2 lg:item-start lg:gap-x-8">
            <ImageLoader />
            <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
              <div className="w-full">
                <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-60 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-44 mb-4"></div>
                <hr className="my-4" />
                <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-44 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-44 mb-4"></div>

                <div className="my-12 h-10 bg-gray-200 rounded-full dark:bg-gray-700 w-36 mb-4"></div>
              </div>
            </div>
          </div>
          <hr className="my-10" />
          <ImageLoader />
        </div>
      </Container>
    </div>
  );
}

export default Loading;
