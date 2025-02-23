import { ProductType } from "@/utils";

export const fetchProducts = async (): Promise<ProductType[]> => {
  const response = await fetch(import.meta.env.VITE_API_URL);
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  return response.json();
};

export const fetchProduct = async (id: number): Promise<ProductType> => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/${id}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const fetchProductsByCategory = async (
  category: string
): Promise<ProductType[]> => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/category/${category}`
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

