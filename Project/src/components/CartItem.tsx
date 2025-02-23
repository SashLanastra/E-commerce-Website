import { Link } from "react-router-dom";
import {
  CartReducerActionType,
  CartReducerAction,
} from "@/reducers/CartReducer";
import { CartItemType } from "@/utils";
import { ReactElement, ChangeEvent, useState, useRef, useEffect } from "react";
import { Button } from "@/components/Button";
import { cn, formatCurrency } from "@/utils/utilities";
import { useScreenSize } from "@/hooks/useScreenSize";

type PropsType = {
  item: CartItemType;
  cartDispatch: React.Dispatch<CartReducerAction>;
  CART_REDUCER_ACTIONS: CartReducerActionType;
};

// Extracted helper functions
const createOptions = (highestQty: number): ReactElement[] => {
  const optVal = [...Array(highestQty).keys()].map((i) => i + 1);
  return optVal.map((val) => (
    <option key={`opt${val}`} value={val}>
      {val}
    </option>
  ));
};

const createMobileQtys = (
  optVal: number[],
  item: CartItemType,
  cartDispatch: React.Dispatch<CartReducerAction>,
  CART_REDUCER_ACTIONS: CartReducerActionType,
  setQtyMenu: (value: boolean) => void
): ReactElement[] => {
  return optVal.map((val) => (
    <Link to="/cart" key={`opt${val}`} className="w-full">
      <button
        className={cn(
          "w-full py-4 text-lg rounded-lg transition-colors duration-200",
          "hover:bg-cyan-800 hover:text-white",
          "focus:outline-none focus:ring-2 focus:ring-cyan-800 focus:ring-offset-2",
          "active:bg-cyan-900",
          val === item.qty && "bg-cyan-800 text-white"
        )}
        onClick={() => {
          cartDispatch({
            type: CART_REDUCER_ACTIONS.QUANTITY,
            payload: { ...item, qty: val },
          });
          setQtyMenu(false);
        }}
      >
        {val}
      </button>
    </Link>
  ));
};

const CartItem = ({ item, cartDispatch, CART_REDUCER_ACTIONS }: PropsType) => {
  const [qtyMenu, setQtyMenu] = useState<boolean>(false);
  const qtyDrawerMenu = useRef<HTMLDivElement>(null);
  const { isMobile } = useScreenSize();
  const img: string = new URL(item.image, import.meta.url).href;
  const lineTotal: number = item.qty * item.price;
  const highestQty: number = item.qty < 10 ? 10 : item.qty;
  const optVal: number[] = [...Array(highestQty).keys()].map((i) => i + 1);

  useEffect(() => {
    document.body.style.overflow = qtyMenu ? "hidden" : "auto";
  }, [qtyMenu]);

  useEffect(() => {
    const clickOutsideDrawerMenu = (e: MouseEvent) => {
      if (!qtyDrawerMenu.current?.contains(e.target as Node)) {
        setQtyMenu(false);
      }
    };
    document.addEventListener("mousedown", clickOutsideDrawerMenu);
    return () => document.removeEventListener("mousedown", clickOutsideDrawerMenu);
  }, []);

  const onChangeQty = (e: ChangeEvent<HTMLSelectElement>) => {
    cartDispatch({
      type: CART_REDUCER_ACTIONS.QUANTITY,
      payload: { ...item, qty: Number(e.target.value) },
    });
  };

  const onRemoveItem = () => cartDispatch({
    type: CART_REDUCER_ACTIONS.REMOVE,
    payload: item,
  });

  const options = createOptions(highestQty);
  const mobileQtys = createMobileQtys(optVal, item, cartDispatch, CART_REDUCER_ACTIONS, setQtyMenu);

  const mobileQtyHandler = () => {
    setQtyMenu(!qtyMenu);
    console.log(qtyMenu);
  };

  const pageContent = (
    <>
      <li className="flex flex-col sm:flex-row lg:justify-between lg:gap-8 shadow-custom rounded-md lg:items-center lg:p-4">
        <div className="flex flex-col items-center sm:items-start sm:flex-row sm:justify-between gap-4 p-4 min-w-[350px] w-full">
          <img
            src={img}
            alt={item.title}
            width={170}
            className="aspect-[3/2] object-contain block transition-transform duration-300 group-hover:scale-110"
          />
          <div className="flex flex-col sm:flex-row sm:justify-between gap-4 w-full">
            <div className="flex flex-col gap-2 items-start">
              <h3 className="max-w-xs">{item.title}</h3>
              <div
                aria-label="Line Item Subtotal"
                className="flex items-center gap-2"
              >
                <p className="font-semibold">Subtotal:</p>
                <p className="text-lg font-bold">{formatCurrency(lineTotal)}</p>
              </div>
            </div>
            {!isMobile && (
              <div className="flex sm:flex-col gap-4">
                <div className="flex flex-col items-center relative">
                  <label
                    htmlFor="itemQty"
                    className="bg-slate-500 text-white w-full text-center rounded-t-md"
                  >
                    Qty:
                  </label>
                  <select
                    name="itemQty"
                    id="itemQty"
                    value={item.qty}
                    onChange={onChangeQty}
                    className="select-box"
                  >
                    {options}
                  </select>
                  <span className="custom-arrow"></span>
                </div>
                <Button
                  text="Remove Item"
                  size="md"
                  variant={"outlined-cancel"}
                  onClick={onRemoveItem}
                />
              </div>
            )}
          </div>
        </div>
        {isMobile && (
          <div className="flex w-full">
            <button
              className="flex items-center justify-center w-1/2 border-2 rounded-bl-md text-slate-500 border-slate-300 hover:border-slate-500 py-3 cursor-pointer"
              onClick={mobileQtyHandler}
            >
              Qty: {item.qty}
            </button>
            <button
              className="flex items-center justify-center rounded-br-md w-1/2 text-red-500 border-red-500 hover:border-red-700 hover:text-red-700 border-2 py-3 cursor-pointer"
              onClick={onRemoveItem}
            >
              Remove Item
            </button>
          </div>
        )}
      </li>
      <div
        className={cn(
          "fixed inset-0 bg-black/50 z-10 backdrop-blur-sm transition-all duration-300",
          qtyMenu ? "opacity-100 visible" : "opacity-0 invisible"
        )}
      >
        <div
          ref={qtyDrawerMenu}
          className={cn(
            "fixed bottom-0 left-0 w-full bg-white rounded-t-xl transition-transform duration-300 ease-out max-h-1/2 overflow-y-auto",
            qtyMenu ? "translate-y-0" : "translate-y-full"
          )}
        >
          <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto my-3" />
          <div className="px-4 pb-8">
            <ul className="flex flex-col gap-2 items-center">{mobileQtys}</ul>
          </div>
        </div>
      </div>
    </>
  );
  return pageContent;
};

export default CartItem;
