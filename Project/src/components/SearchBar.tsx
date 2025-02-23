import { useState } from "react";
import { useProduct } from "@/hooks/useProduct";
import { Link } from "react-router-dom";
import { ProductType } from "@/utils";

export type SearchBarProps = {
  setSearchResults: (products: ProductType[]) => void;
};

const SearchBar = ({ setSearchResults }: SearchBarProps) => {
  const { searchProducts } = useProduct();
  const [search, setSearch] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setShowDropdown(true);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const filteredProducts = search.length > 0 ? searchProducts(search) : [];
    e.preventDefault();
    setSearchResults(filteredProducts);
    setShowDropdown(false);
  };

  // Get filtered products based on search input
  const filteredProducts = search.length > 0 ? searchProducts(search) : [];

  return (
    <div className="relative w-full px-4">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search for products"
          className="w-full h-10 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={search}
          onChange={handleSearch}
          onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
          onFocus={() => setShowDropdown(true)}
        />
      </form>

      {/* Dropdown */}
      {showDropdown && filteredProducts.length > 0 && (
        <div className="absolute w-full mt-1 max-h-60 overflow-auto bg-white border border-gray-300 rounded-md shadow-lg z-50">
          {filteredProducts.map((product) => (
            <Link key={product.id} to={`${product.id}`}>
              <button
                key={product.id}
                className="w-full p-2 text-left hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                onKeyDown={() => {
                  setSearch(product.title);
                  searchProducts(product.title);
                  setShowDropdown(false);
                }}
              >
                {product.title}
              </button>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
