import { useReducer, useMemo, createContext } from "react"
import { CartItemType, CartStateType } from "@/utils"
import { CART_REDUCER_ACTION_TYPE, reducer } from "@/reducers/CartReducer"
import { formatCurrency } from "@/utils/utilities"

const InitCartState: CartStateType = {
    cart: []
}

export const useCartContext = (InitCartState: CartStateType) => {
    const [state, cartDispatch] = useReducer(reducer, InitCartState)

    const totalItems = useMemo(() => 
        state.cart?.reduce((total, cartItem) => total + cartItem.qty, 0) ?? 0
    , [state.cart])

    const totalPrice = useMemo(() => 
        formatCurrency(
            state.cart?.reduce((total, cartItem) => 
                total + (cartItem.price * cartItem.qty)
            , 0) ?? 0
        )
    , [state.cart])

    const cart = useMemo(() => 
        state.cart?.slice().sort((a: CartItemType, b: CartItemType) => a.id - b.id) ?? []
    , [state.cart])

    return {
        cartDispatch,
        CART_REDUCER_ACTIONS: CART_REDUCER_ACTION_TYPE,
        totalItems,
        totalPrice,
        cart
    }
}

export type UseCartContextType = ReturnType<typeof useCartContext>

const InitCartContextState: UseCartContextType = {
    cartDispatch: () => undefined,
    CART_REDUCER_ACTIONS: CART_REDUCER_ACTION_TYPE,
    totalItems: 0,
    totalPrice: '',
    cart: []
}

export const CartContext = createContext<UseCartContextType>(InitCartContextState)

// Export the initial state if needed in other components
export default InitCartState