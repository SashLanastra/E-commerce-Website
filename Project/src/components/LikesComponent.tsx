import { Link } from "react-router-dom";
import { LikeItemType } from "@/utils";
import {
  LikeReducerAction,
  LikeReducerActionType,
} from "@/reducers/LikesReducer";
import {
  CartReducerAction,
  CartReducerActionType,
} from "@/reducers/CartReducer";
import { Button } from "@/components/Button";
import { formatCurrency } from "@/utils/utilities";
import RatingSpan from "@/components/RatingSpan";

type PropsType = {
  item: LikeItemType;
  likeDispatch: React.Dispatch<LikeReducerAction>;
  LIKE_REDUCER_ACTIONS: LikeReducerActionType;
  cartDispatch: React.Dispatch<CartReducerAction>;
  CART_REDUCER_ACTIONS: CartReducerActionType;
  inCart: boolean;
};

const LikesComponent = ({
  item,
  likeDispatch,
  LIKE_REDUCER_ACTIONS,
  cartDispatch,
  CART_REDUCER_ACTIONS,
  inCart,
}: PropsType) => {
  const img: string = new URL(item.image, import.meta.url).href;

  const button: string = inCart ? "Remove From Cart" : "Add To Cart";

  const onRemoveItemFromLikes = () => {
    likeDispatch({
      type: LIKE_REDUCER_ACTIONS.REMOVE,
      payload: item,
    });
  };

  const handleItemToCart = () => {
    inCart
      ? cartDispatch({
          type: CART_REDUCER_ACTIONS.REMOVE,
          payload: { ...item, qty: 0 },
        })
      : cartDispatch({
          type: CART_REDUCER_ACTIONS.ADD,
          payload: { ...item, qty: 1 },
        });
    console.log("clicked");
  };

  const pageConent = (
    <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between shadow-custom rounded-md p-4 ">
      <Link to={`/products/${item.id}`} className="flex flex-col items-center gap-4 md:flex-row md:justify-between">
          <img
            src={img}
            alt={item.title}
            className="aspect-[3/2] object-contain block mx-auto"
            width={170}
          />
        <div className="">
          <h3 className="max-w-[256px] text-wrap">{item.title}</h3>
          <RatingSpan rating={item.rating} />
          <p className="font-bold mt-2">{formatCurrency(item.price)}</p>
        </div>
      </Link>

      <div className="flex gap-4 md:flex-col">
        <Button text={button} size="md" onClick={handleItemToCart} />
        <Button
          text="Remove from Likes"
          size="md"
          variant="outlined-cancel"
          onClick={onRemoveItemFromLikes}
        />
      </div>
    </div>
  );

  const content = <div className="">{pageConent}</div>;
  return content;
};

export default LikesComponent;
