import React, { ReactElement, memo, useCallback, useMemo } from "react";
import { ProductType } from "@/utils";
import {
  CartReducerActionType,
  CartReducerAction,
} from "@/reducers/CartReducer";
import {
  LikeReducerAction,
  LikeReducerActionType,
} from "@/reducers/LikesReducer";
import { Link } from "react-router-dom";
import { Button } from "@/components/Button";
import LikesIcon from "@/components/LikesIcon";
import RatingSpan from "@/components/RatingSpan";
import { cn, formatCurrency } from "@/utils/utilities";
import { useScreenSize } from "@/hooks/useScreenSize";

type PropsType = {
  product: ProductType;
  cartDispatch: React.Dispatch<CartReducerAction>;
  CART_REDUCER_ACTIONS: CartReducerActionType;
  inCart: boolean;
  inLikes: boolean;
  likeDispatch: React.Dispatch<LikeReducerAction>;
  LIKE_REDUCER_ACTIONS: LikeReducerActionType;
};

const Product = memo(
  ({
    product,
    cartDispatch,
    CART_REDUCER_ACTIONS,
    inCart,
    inLikes,
    likeDispatch,
    LIKE_REDUCER_ACTIONS,
  }: PropsType): ReactElement => {
    const { isMobile } = useScreenSize();
    const img: string = useMemo(
      () => new URL(product.image, import.meta.url).href,
      [product.image]
    );

    const toggleCart = useCallback(() => {
      const action = {
        type: inCart ? CART_REDUCER_ACTIONS.REMOVE : CART_REDUCER_ACTIONS.ADD,
        payload: { ...product, qty: inCart ? 0 : 1 },
      };
      cartDispatch(action);
    }, [inCart, cartDispatch, CART_REDUCER_ACTIONS, product]);

    const toggleLike = useCallback(() => {
      const action = {
        type: inLikes ? LIKE_REDUCER_ACTIONS.REMOVE : LIKE_REDUCER_ACTIONS.ADD,
        payload: { ...product, qty: inLikes ? 0 : 1 },
      };
      likeDispatch(action);
    }, [inLikes, likeDispatch, LIKE_REDUCER_ACTIONS, product]);

    const button = useMemo(
      () => (!inCart ? "+ To Cart" : "- From Cart"),
      [inCart]
    );

    return (
      <article
        className={cn(
          "max-w-1/5 flex min-w-56 flex-col gap-4 items-center relative group hover:cursor-pointer px-4 py-6 shadow-custom rounded-md",
          { "min-w-38": isMobile }
        )}
      >
        <button
          className="absolute top-0 right-0 p-2 cursor-pointer"
          onClick={toggleLike}
        >
          <LikesIcon inLikes={inLikes} />
        </button>
        <Link
          to={`/products/${product.id}`}
          className="w-full flex flex-col gap-2"
        >
          <div className="p-2">
            <img
              src={img}
              alt={product.title}
              width={170}
              className="aspect-[3/2] object-contain block transition-transform duration-300 group-hover:scale-110"
            />
          </div>
          <p className="w-full line-clamp-1 overflow-hidden text-left mt-4">
            {product.title}
          </p>
          <p className="w-full font-semibold text-left">
            {formatCurrency(product.price)}
          </p>
          <RatingSpan rating={product.rating} />
        </Link>
        {!isMobile && <Button text={button} size="md" onClick={toggleCart} />}
      </article>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.product.id === nextProps.product.id &&
      prevProps.inCart === nextProps.inCart &&
      prevProps.inLikes === nextProps.inLikes &&
      prevProps.product.price === nextProps.product.price &&
      prevProps.product.title === nextProps.product.title
    );
  }
);

Product.displayName = "Product";

export default Product;
