import { ReactElement, useState, useEffect } from "react";
import { useProduct } from "@/hooks/useProduct";
import { CartItemType, LikeItemType, ProductType } from "@/utils";
import { useCart } from "@/hooks/useCart";
import Product from "@/components/Product";
import { useLiked } from "@/hooks/useLiked";
import { ChevronLeft, ChevronRight } from "lucide-react";

type PropsType = {
  currentItem: ProductType;
};

const ImageCarousel = ({ currentItem }: PropsType): ReactElement => {
  const { products } = useProduct();
  const { cartDispatch, CART_REDUCER_ACTIONS, cart } = useCart();
  const { likes, likeDispatch, LIKE_REDUCER_ACTIONS } = useLiked();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const filteredCarousel = products
    .filter((product) => product.category === currentItem.category)
    .filter((product) => product.id !== currentItem.id);

  const itemsToShow = isMobile ? 2 : 3;
  const maxIndex = Math.max(0, filteredCarousel.length - itemsToShow);

  const nextSlide = () => {
    setCurrentIndex(prev => Math.min(prev + itemsToShow, maxIndex));
  };

  const prevSlide = () => {
    setCurrentIndex(prev => Math.max(0, prev - itemsToShow));
  };

  let componentContent: ReactElement | ReactElement[] = <p>Loading...</p>;

  if (products?.length) {
    const visibleProducts = filteredCarousel.slice(
      currentIndex,
      currentIndex + itemsToShow
    );

    componentContent = (
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 place-items-center">
        {visibleProducts.map((product) => {
          const inCart: boolean = cart.some((item: CartItemType) => item.id === product.id);
          const inLikes: boolean = likes.some((item: LikeItemType) => item.id === product.id);

          return (
            <div key={product.id} className="w-full flex justify-center">
              <Product
                product={product}
                cartDispatch={cartDispatch}
                CART_REDUCER_ACTIONS={CART_REDUCER_ACTIONS}
                inCart={inCart}
                inLikes={inLikes}
                likeDispatch={likeDispatch}
                LIKE_REDUCER_ACTIONS={LIKE_REDUCER_ACTIONS}
              />
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 md:px-8 relative">
      <p className="text-center mt-4 text-xl font-semibold">Items You Might Like</p>
      
      <div className="relative mt-6">
        {currentIndex > 0 && (
          <button 
            onClick={prevSlide}
            className="absolute -left-2 md:-left-8 top-1/2 -translate-y-1/2 z-10 bg-white/80 rounded-full p-2 shadow-md hover:bg-white transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}
        
        {currentIndex < maxIndex && (
          <button 
            onClick={nextSlide}
            className="absolute -right-2 md:-right-8 top-1/2 -translate-y-1/2 z-10 bg-white/80 rounded-full p-2 shadow-md hover:bg-white transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}

        <div className="overflow-hidden px-2 md:px-4">
          <div className="flex justify-center">
            {componentContent}
          </div>
        </div>

        <div className="flex justify-center gap-2 mt-4">
          {Array.from({ 
            length: Math.ceil(filteredCarousel.length / itemsToShow) 
          }).map((_, idx) => (
            <button
              key={idx + currentItem.id}
              className={`w-2 h-2 rounded-full transition-colors ${
                Math.floor(currentIndex / itemsToShow) === idx 
                  ? 'bg-blue-600' 
                  : 'bg-gray-300'
              }`}
              onClick={() => setCurrentIndex(idx * itemsToShow)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageCarousel;