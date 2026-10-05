export interface ToyProduct {
  id: string;
  name: string;
  category: 'wooden' | 'imaginative' | 'puzzles' | 'plush' | 'stem';
  categoryLabel: string;
  price: number;
  originalPrice?: number;
  ageRange: string;
  ageGroup: '0-2' | '3-5' | '6-8' | '9+';
  rating: number;
  reviewsCount: number;
  description: string;
  story: string;
  material: string;
  dimensions: string;
  origin: string;
  image: string;
  inStock: boolean;
  isBestseller?: boolean;
  isNewArrival?: boolean;
  safetyCert: string;
  features: string[];
}

export interface CartItem {
  product: ToyProduct;
  quantity: number;
  giftWrap: boolean;
  giftNote?: string;
}

export interface Review {
  id: string;
  author: string;
  role: string;
  location: string;
  rating: number;
  headline: string;
  comment: string;
  productName: string;
  childAge: string;
  date: string;
}
