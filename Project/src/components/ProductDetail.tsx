import { ReactElement, memo, useCallback } from "react";
import { CartItemType, LikeItemType, ProductType } from "@/utils";
import {
  CartReducerAction,
  CartReducerActionType,
} from "@/reducers/CartReducer";
import {
  LikeReducerAction,
  LikeReducerActionType,
} from "@/reducers/LikesReducer";
import { useCart } from "@/hooks/useCart";
import { useLiked } from "@/hooks/useLiked";
import { Button } from "@/components/Button";
import RatingSpan from "@/components/RatingSpan";
import { formatCurrency } from "@/utils/utilities";
import Details from "@/components/Details";

type PropsType = {
  currentItem: ProductType;
  cartDispatch: React.Dispatch<CartReducerAction>;
  CART_REDUCER_ACTIONS: CartReducerActionType;
  likeDispatch: React.Dispatch<LikeReducerAction>;
  LIKE_REDUCER_ACTIONS: LikeReducerActionType;
};

const ProductDetail = memo(({
  currentItem,
  cartDispatch,
  CART_REDUCER_ACTIONS,
  likeDispatch,
  LIKE_REDUCER_ACTIONS,
}: PropsType) => {
  const { cart } = useCart();
  const { likes } = useLiked();

  const inLikes: boolean = likes.some((item: LikeItemType) => item.id === currentItem.id);
  const inCart: boolean = cart.some((item: CartItemType) => item.id === currentItem.id);

  const handleLikes = useCallback(() => {
    inLikes
      ? likeDispatch({
          type: LIKE_REDUCER_ACTIONS.REMOVE,
          payload: { ...currentItem, qty: 0 },
        })
      : likeDispatch({
          type: LIKE_REDUCER_ACTIONS.ADD,
          payload: { ...currentItem, qty: 1 },
        });
  }, [inLikes, likeDispatch, LIKE_REDUCER_ACTIONS, currentItem]);

  const handleCart = useCallback(() => {
    inCart
      ? cartDispatch({
          type: CART_REDUCER_ACTIONS.REMOVE,
          payload: { ...currentItem, qty: 0 },
        })
      : cartDispatch({
          type: CART_REDUCER_ACTIONS.ADD,
          payload: { ...currentItem, qty: 1 },
        });
  }, [inCart, cartDispatch, CART_REDUCER_ACTIONS, currentItem]);

  const cartButtonText: string = inCart ? "Remove From Cart" : "Add To Cart";
  const likeButtonText: string = inLikes ? "Remove From Likes" : "Add To Likes";

  const content: ReactElement | null = currentItem ? (
    <div className="flex lg:flex-row flex-col gap-2">
      <div className="flex flex-col items-center lg:flex-row lg:justify-between gap-2 shadow-custom p-8 rounded-md mx-4">
        <img src={currentItem.image} alt={currentItem.title} width={250} />
        <div className="">
          <h1 className="">{currentItem.title}</h1>
          <RatingSpan rating={currentItem.rating} />
          <h2 className="underline">Description</h2>
          <Details currentItem={currentItem} />
        </div>
      </div>
      <div className="flex flex-col gap-4 mx-4 shadow-custom p-8 rounded-md">
        <p className="font-bold text-xl">{formatCurrency(currentItem.price)}</p>
        <Button onClick={handleCart} text={cartButtonText} size="lg" />
        <Button
          onClick={handleLikes}
          text={likeButtonText}
          size="lg"
          variant="outlined-dark"
        />
      </div>
    </div>
  ) : (
    <p>loading...</p>
  );

  return content;
}, (prevProps, nextProps) => {
  // Custom comparison function to determine if component should update
  return (
    prevProps.currentItem.id === nextProps.currentItem.id &&
    prevProps.currentItem.price === nextProps.currentItem.price &&
    prevProps.currentItem.title === nextProps.currentItem.title
  );
});

ProductDetail.displayName = 'ProductDetail'; // For better debugging

export default ProductDetail;