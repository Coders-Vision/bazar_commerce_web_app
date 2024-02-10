import { getCategories } from "@/services/CategoryService";
import { getProducts } from "@/services/ProductService";
import getCurrentHost from "@/utils/get-current-host";

async function sitemap() {
  const categories = await getCategories();

  const catLinks =
    categories.map((cat) => ({
      url: `${getCurrentHost().toString()}category/${cat._id}`,
      lastModified: new Date(),
    })) ?? [];
  const products = await getProducts({});

  const productLinks =
    products.map((product) => ({
      url: `${getCurrentHost().toString()}product/${product.sku}/${
        product.slug
      }`,
      lastModified: new Date(),
    })) ?? [];

  return [
    {
      url: getCurrentHost().toString(),
      lastModified: new Date(),
    },
    ...catLinks,
    ...productLinks,
  ];
}

export default sitemap;
