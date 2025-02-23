

export const ProductSkeleton = () => {
    return (
      <article className="max-w-1/5 flex min-w-56 flex-col gap-4 items-center relative group px-4 py-6 shadow-custom rounded-md">
        {/* Like button placeholder */}
        <div className="absolute top-0 right-0 p-2">
          <div className="w-6 h-6 bg-gray-200 rounded-full animate-pulse" />
        </div>
  
        {/* Image and content container */}
        <div className="w-full flex flex-col gap-2">
          {/* Image placeholder */}
          <div className="p-2">
            <div 
              className="w-[170px] aspect-[3/2] bg-gray-200 rounded-md animate-pulse"
            />
          </div>
  
          {/* Title placeholder */}
          <div className="w-3/4 h-4 bg-gray-200 rounded animate-pulse mt-4" />
  
          {/* Price placeholder */}
          <div className="w-1/4 h-4 bg-gray-200 rounded animate-pulse" />
  
          {/* Rating placeholder */}
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <div 
                key={i} 
                className="w-4 h-4 bg-gray-200 rounded animate-pulse"
              />
            ))}
          </div>
        </div>
  
        {/* Button placeholder */}
        <div className="w-full h-9 bg-gray-200 rounded animate-pulse" />
      </article>
    )
  }