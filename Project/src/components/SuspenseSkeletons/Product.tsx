import { useScreenSize } from "@/hooks/useScreenSize";
import { cn } from "@/utils/utilities";

export const ProductSkeleton = () => {
  const { isMobile } = useScreenSize();
  
  return (
    <article
      className={cn(
        "max-w-1/5 flex min-w-56 flex-col gap-4 items-center relative group px-4 py-6 shadow-custom rounded-md",
        { "min-w-38": isMobile }
      )}
    >
      {/* Like button placeholder */}
      <div className="absolute top-0 right-0 p-2">
        <div className="w-6 h-6 bg-gray-200 rounded-full animate-pulse" />
      </div>

      {/* Link container wrapper */}
      <div className="w-full flex flex-col gap-2">
        {/* Image container */}
        <div className="p-2">
          <div 
            className="w-full aspect-[3/2] bg-gray-200 rounded-md animate-pulse mx-auto"
          />
        </div>

        {/* Title placeholder - matched line-clamp-1 */}
        <div className="w-full h-5 bg-gray-200 rounded animate-pulse mt-4" />

        {/* Price placeholder - matched font-semibold */}
        <div className="w-1/3 h-6 bg-gray-200 rounded animate-pulse" />

        {/* Rating placeholder - matched RatingSpan */}
        <div className="flex gap-1 mt-1">
          {[...Array(5)].map((_, i) => (
            <div
              key={i + "rating"}
              className="w-4 h-4 bg-gray-200 rounded animate-pulse"
            />
          ))}
        </div>
      </div>

      {/* Button placeholder - only shown when not mobile */}
      {!isMobile && (
        <div className="w-full h-9 bg-gray-200 rounded animate-pulse mt-auto" />
      )}
    </article>
  );
};