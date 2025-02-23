export interface CartItemType {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  price: number;
  qty: number;
  rating: {
    rate: number;
    count: number;
  };
}

export interface CartStateType {
  cart?: CartItemType[];
}

export interface LikeItemType {
  id: number;
  description: string;
  title: string;
  category: string;
  image: string;
  price: number;
  qty: number;
  rating: {
    rate: number;
    count: number;
  };
}

export interface LikeStateType {
  likes: LikeItemType[];
}

export interface ProductType {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface ProductsStateType {
  products: ProductType[];
}
