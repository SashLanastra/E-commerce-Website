import { useState } from "react";
import { useCart } from "@/hooks/useCart";
import CartItem from "@/components/CartItem";
import { Button } from "@/components/Button";
import { CartItemType } from "@/utils";

const Cart = () => {
  const [confirm, setConfirm] = useState<boolean>(false);

  const { cartDispatch, CART_REDUCER_ACTIONS, totalItems, totalPrice, cart } =
    useCart();

  const onSubmitOrder = () => {
    cartDispatch({ type: CART_REDUCER_ACTIONS.SUBMIT });
    setConfirm(true);
  };

  const pageContent = confirm ? (
    <div className="flex flex-col justify-center h-full items-center gap-8">
      <h2>Thank you for your purchase.</h2>
      <Button text="Continue Shopping" size="lg" variant="primary" href="/products" />
    </div>
  ) : (
    <div className="flex flex-col gap-4 lg:flex-row lg:gap-8">
      <ul className="flex flex-col gap-4">
        {cart.map((item: CartItemType) => {
          return (
            <CartItem
              key={item.id}
              item={item}
              cartDispatch={cartDispatch}
              CART_REDUCER_ACTIONS={CART_REDUCER_ACTIONS}
            />
          );
        })}
      </ul>
      <div className="shadow-custom p-4 rounded-md flex flex-col gap-4">
        <p className="text-2xl">
          Total Items: <b>{totalItems}</b>
        </p>
        <p className="text-2xl">
          Total Price: <b>{totalPrice}</b>
        </p>
        <Button
          text="Place Order"
          size="md"
          variant="primary"
          onClick={onSubmitOrder}
          disabled={!totalItems}
        />
      </div>
    </div>
  );
  return <div className="">{pageContent}</div>;
};

export default Cart;
