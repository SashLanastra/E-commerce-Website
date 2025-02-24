import { ProductType } from "@/utils";

export const fetchProducts = async (): Promise<ProductType[]> => {
  try {
    const response = await fetch(import.meta.env.VITE_API_URL);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
    }
    
    const data = await response.json();
    return data;
    
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to fetch products: ${error.message}`);
    }
    throw new Error('Failed to fetch products');
  }
};

export const fetchProduct = async (id: number): Promise<ProductType> => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/${id}`);
  try {
    return await response.json();
  } catch (error) {
    throw new Error("Failed to fetch product");
  }
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
