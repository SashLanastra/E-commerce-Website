import { ProductSkeleton } from "./Product";

export const ProductGridSkeleton = ({productsLength}: {productsLength: number}) => (
  <div className="max-w-5xl flex flex-wrap justify-center gap-4">
    {[...Array(productsLength)].map((_, index) => (
      <ProductSkeleton key={`skeleton-${index}`} />
    ))}
  </div>
);