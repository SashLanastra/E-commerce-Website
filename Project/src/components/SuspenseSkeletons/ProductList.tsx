import { ProductSkeleton } from "./Product";

export const ProductListSkeleton = ({productsLength}: {productsLength : number}) => (
    <div className="flex flex-col items-center justify-center gap-4">
      {/* Search Bar Skeleton */}
      <div className="w-full max-w-5xl">
        <div className="h-10 bg-gray-200 rounded-md animate-pulse w-full" />
      </div>
  
      {/* Products Grid Skeleton */}
      <div className="max-w-5xl flex flex-wrap justify-center gap-4">
        {[...Array(productsLength)].map((_, index) => (
          <ProductSkeleton key={index + "skeleton"} />
        ))}
      </div>
    </div>
  );
