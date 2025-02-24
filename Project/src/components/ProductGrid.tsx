import { ReactElement } from "react";
import { useCart } from "@/hooks/useCart";
import { useProduct } from "@/hooks/useProduct";
import Product from "@/components/Product";
import { useLiked } from "@/hooks/useLiked";
import { CartItemType, LikeItemType, ProductType } from "@/utils";

const ProductGrid = ({
  searchResults,
}: {
  searchResults: ProductType[];
}): ReactElement => {
  const { cartDispatch, CART_REDUCER_ACTIONS, cart } = useCart();
  const { products } = useProduct();
  const { likes, likeDispatch, LIKE_REDUCER_ACTIONS } = useLiked();

  const productsToDisplay = searchResults.length > 0 ? searchResults : products; // or incorporate searchResults if needed

  return (
    <div className="max-w-5xl flex flex-wrap justify-center gap-4">
      {productsToDisplay.map((product: ProductType) => {
        const inCart: boolean = cart.some(
          (item: CartItemType) => item.id === product.id
        );
        const inLikes: boolean = likes.some(
          (item: LikeItemType) => item.id === product.id
        );

        return (
          <Product
            key={product.id}
            product={product}
            cartDispatch={cartDispatch}
            CART_REDUCER_ACTIONS={CART_REDUCER_ACTIONS}
            inCart={inCart}
            inLikes={inLikes}
            likeDispatch={likeDispatch}
            LIKE_REDUCER_ACTIONS={LIKE_REDUCER_ACTIONS}
          />
        );
      })}
    </div>
  );
};

export default ProductGrid;
