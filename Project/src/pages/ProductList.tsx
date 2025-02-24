import SearchBar from "@/components/SearchBar";
import ProductGrid from "@/components/ProductGrid";
import { ProductType } from "@/utils";
import { useState } from "react";
import { useProduct } from "@/hooks/useProduct";

const ProductList = () => {
  const [searchResults, setSearchResults] = useState<ProductType[]>([]);
  const { isLoading, isError, error } = useProduct();

  if (!isLoading && isError) {
    throw error;
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <SearchBar setSearchResults={setSearchResults} />
      <ProductGrid searchResults={searchResults} />
    </div>
  );
};

export default ProductList;
