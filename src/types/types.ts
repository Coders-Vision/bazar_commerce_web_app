export interface Billboard {
  id: string;
  label: string;
  imageUrl: string;
}

export interface Brand {
  id: string;
  name: string;
}
export interface Category {
  id: string;
  name: string;
  imageUrl: string;
  billboard: Billboard;
}

export interface Product {
  id: string;
  category: Category;
  name: string;
  name_ar: string;
  brand?: Brand;
  description: string;
  description_ar: string;
  sku: string;
  slug: string;
  price: string;
  isFeatured: boolean;
  size: Size;
  color: Color;
  images: ProductImages[];
}
export interface ProductImages {
  id: string;
  url: string;
}

export interface Size {
  id: string;
  name: string;
  value: string;
}
export interface Color {
  id: string;
  name: string;
  value: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  image: string;
  accessToken: string;
  expiresIn: number;
}
