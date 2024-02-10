export interface Translation {
  en: string;
  ar: string;
}

export interface Image {
  image: string;
  thumbImage: string;
}

export interface ProductImages {
  primaryImage: Image;
  secondaryImage: Image;
  thirdImage: Image;
  _id: string;
}

export interface Billboard {
  id: string;
  name: Translation;
  image: Image;
}

export interface Brand {
  id: string;
  nameEn: string;
  nameAr: string;
}
export interface Category {
  _id: string;
  nameEn: string;
  nameAr: string;
  image: Image;
}

export interface Product {
  _id: string;
  category: Category[];
  nameEn: string;
  nameAr: string;
  brand?: Brand;
  descriptionEn: string;
  descriptionAr: string;
  sku: string;
  slug?: string;
  salePrice: string;
  // isFeatured: boolean;
  size: Size;
  color: Color;
  images: ProductImages;
}

export interface Size {
  _id: string;
  name: Translation;
  sizeValue: string;
}
export interface Color {
  _id: string;
  name: Translation;
  hexCode: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  image: string;
  accessToken: string;
  expiresIn: number;
}

export interface OrderItem {
  productId: string;
  price: number;
  qty: number;
}
export interface OrderCreation {
  orderItems: OrderItem[];
  phone: string;
  address: string;
  paymentGateway: string;
}
