import { useCart } from "@/hooks/useCart";
import { useLiked } from "@/hooks/useLiked";
import LikesComponent from "@/components/LikesComponent";
import { Button } from "@/components/Button";
import { CartItemType, LikeItemType } from "@/utils";

const LikesPage = () => {
  const { likeDispatch, LIKE_REDUCER_ACTIONS, likes, totalLikedItems } =
    useLiked();
  const { CART_REDUCER_ACTIONS, cartDispatch, cart } = useCart();

  const onClearPage = () => {
    likeDispatch({ type: LIKE_REDUCER_ACTIONS.CLEAR });
  };

  const pageContent = (
    <ul className="flex flex-col gap-4">
      {likes.map((item: LikeItemType) => {
        const inCart: boolean = cart.some((product: CartItemType) => product.id === item.id);
        return (
          <LikesComponent
            key={item.id}
            item={item}
            likeDispatch={likeDispatch}
            LIKE_REDUCER_ACTIONS={LIKE_REDUCER_ACTIONS}
            inCart={inCart}
            CART_REDUCER_ACTIONS={CART_REDUCER_ACTIONS}
            cartDispatch={cartDispatch}
          />
        );
      })}
    </ul>
  );

  const content = (
    <div className="flex flex-col lg:flex-row gap-4">
      {pageContent}
      <div className="shadow-custom rounded-md p-4 md:max-h-40">
        <p className="w-full mb-4">
          Total likes: <b>{totalLikedItems}</b>
        </p>
        {totalLikedItems > 0 && (
          <Button text="Clear likes" size="lg" variant="outlined-cancel" onClick={onClearPage} />
        )}
      </div>
    </div>
  );

  return content;
};

export default LikesPage;
