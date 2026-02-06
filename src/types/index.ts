export type Category = "cakes" | "cream-cakes" | "brownies" | "plain-cakes";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number; // Base price or starting price
  variantPrices?: {
      "1lb"?: number;
      "2lb"?: number;
      "3lb"?: number;
      "piece"?: number;
      "10pc"?: number;
  };
  image: string;
  category: Category;
  type?: 'cake' | 'cupcake' | 'brownie';
  tag?: string;
  rating?: number;
  popular?: boolean;
  bestseller?: boolean;
  occasions?: string[];
  originalPrice?: number;
  discountText?: string;
}

export interface CartItem {
  product: Product;
  weight: 1 | 2 | 3;
  quantity: number;
}
