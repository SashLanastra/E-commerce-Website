import { ReactElement } from "react"
import { CartContext, useCartContext } from "@/context/CartContext"
import { CartStateType } from "@/utils"

const InitCartState: CartStateType = {
    cart: []
}

type ChildrenType = {
    children?: ReactElement | ReactElement []
}

export const CartProvider = ({children}: ChildrenType): ReactElement => {
    return <CartContext.Provider value={useCartContext(InitCartState)}>
        {children}
    </CartContext.Provider>
}

