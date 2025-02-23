import { ReactElement, createContext, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "@/utils/api";
import { ProductType } from "@/utils";

export type UseProductsContextType = {
  products: ProductType[];
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  singleProduct: (id: number) => ProductType | undefined;
  productsByCategory: (category: string) => ProductType[];
  sortByPriceAsc: () => ProductType[];
  sortByPriceDesc: () => ProductType[];
  sortByRatingAsc: () => ProductType[];
  searchProducts: (search: string) => ProductType[];
};

const initProductsContextState: UseProductsContextType = {
  products: [],
  isLoading: false,
  isError: false,
  error: null,
  singleProduct: () => undefined,
  productsByCategory: () => [],
  sortByPriceAsc: () => [],
  sortByPriceDesc: () => [],
  sortByRatingAsc: () => [],
  searchProducts: () => [],
};

const ProductContext = createContext<UseProductsContextType>(
  initProductsContextState
);

type ChildrenType = {
  children?: ReactElement | ReactElement[];
};

export const ProductProvider = ({ children }: ChildrenType): ReactElement => {
  const {
    data: products = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      try {
        const cachedData = localStorage.getItem("products");

        if (cachedData) {
          const parsed = JSON.parse(cachedData);
          if (Array.isArray(parsed) && parsed.length > 0) {
            return parsed as ProductType[];
          }
        }

        const products = await fetchProducts();
        localStorage.setItem("products", JSON.stringify(products));
        return products;
      } catch (error) {
        console.error("Cache operation failed:", error);
        return fetchProducts();
      }
    },
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  // Memoize the singleProduct function to prevent unnecessary rerenders
  const singleProduct = useMemo(
    () => (id: number) => products.find((product) => product.id === id),
    [products]
  );

  const productsByCategory = useMemo(
    () => (category: string) =>
      products.filter((product) => product.category === category),
    [products]
  );

  const sortByPriceAsc = useMemo(
    () => () => [...products].sort((a, b) => a.price - b.price),
    [products]
  );

  const sortByPriceDesc = useMemo(
    () => () => [...products].sort((a, b) => b.price - a.price),
    [products]
  );

  const sortByRatingAsc = useMemo(
    () => () => [...products].sort((a, b) => a.rating.rate - b.rating.rate),
    [products]
  );

  const searchProducts = useMemo(
    () => (search: string) => {
      const searchTerm = search.toLowerCase().trim();

      if (!searchTerm) return products;

      return products.filter((product) => {
        // Search in multiple fields
        const matchTitle = product.title.toLowerCase().includes(searchTerm);
        const matchDescription = product.description
          .toLowerCase()
          .includes(searchTerm);
        const matchCategory = product.category
          .toLowerCase()
          .includes(searchTerm);
        const matchPrice = product.price.toString().includes(searchTerm);

        // Match exact price if user enters a number
        const exactPrice =
          !isNaN(Number(searchTerm)) && product.price === Number(searchTerm);

        // Search for price ranges with "under" or "over" keywords
        const priceUnder =
          searchTerm.startsWith("under") &&
          product.price < Number(searchTerm.replace("under", ""));
        const priceOver =
          searchTerm.startsWith("over") &&
          product.price > Number(searchTerm.replace("over", ""));

        // Combine all search conditions
        return (
          matchTitle ||
          matchDescription ||
          matchCategory ||
          matchPrice ||
          exactPrice ||
          priceUnder ||
          priceOver
        );
      });
    },
    [products]
  );

  const value = useMemo(
    () => ({
      products,
      isLoading,
      isError,
      error,
      singleProduct,
      productsByCategory,
      sortByPriceAsc,
      sortByPriceDesc,
      sortByRatingAsc,
      searchProducts,
    }),
    [
      products,
      isLoading,
      isError,
      error,
      singleProduct,
      productsByCategory,
      sortByPriceAsc,
      sortByPriceDesc,
      sortByRatingAsc,
      searchProducts,
    ]
  );

  return (
    <ProductContext.Provider value={value as UseProductsContextType}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContext;
