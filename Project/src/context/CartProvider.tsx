import { useReducer, useMemo, createContext, ReactElement } from "react"


export type CartItemType = {
    id: number,
    title: string,
    category: string,
    description: string,
    image: string,
    price: number,
    qty: number,
    rating: {
        rate: number,
        count: number
    }
}

type CartStateType = {
    cart: CartItemType[]
}

const InitCartState: CartStateType = {
    cart: []
}

const CART_REDUCER_ACTION_TYPE = {
    ADD: 'ADD',
    REMOVE: 'REMOVE',
    QUANTITY: 'QUANTITY',
    SUBMIT: 'SUBMIT'
}

export type CartReducerActionType = typeof CART_REDUCER_ACTION_TYPE

export type CartReducerAction = {
    type: string,
    payload?: CartItemType
}

const reducer = (state: CartStateType, action: CartReducerAction): CartStateType => {
    switch(action.type) {
        case CART_REDUCER_ACTION_TYPE.ADD: {
            if(!action.payload) {
                throw new Error('action.payload is missing from the ADD action')
            }

            const{ id, title, description, category, image, price, rating} = action.payload

            const filteredCart: CartItemType[] = state.cart.filter(item => item.id !== id)

            const itemExists: CartItemType | undefined = state.cart.find(item => item.id === id)

            const qty: number = itemExists ? itemExists.qty + 1 : 1

            return{...state, cart: [...filteredCart, {id, title, description, category, image, price, rating, qty}]}
        }

        case CART_REDUCER_ACTION_TYPE.REMOVE: {
            if(!action.payload) {
                throw new Error('action.payload is missing from the REMOVE action')
            }

            const{ id } = action.payload

            const filteredCart: CartItemType[] = state.cart.filter(item => item.id !== id)

            return{...state, cart:[...filteredCart]}
        }

        case CART_REDUCER_ACTION_TYPE.QUANTITY: {
            if(!action.payload) {
                throw new Error('action.payload is missing from the QUANTITY action')
            }

            const {id, qty} = action.payload

            const itemExists: CartItemType | undefined = state.cart.find(item => item.id === id)

            if(!itemExists) {
                throw new Error('Item needs to exist in order to update the quantity')
            }

            const updatedItem = {...itemExists, qty}

            const filteredCart: CartItemType[] = state.cart.filter(item => item.id !== id)

            return{...state, cart: [...filteredCart, updatedItem]}
        }

        case CART_REDUCER_ACTION_TYPE.SUBMIT: {
            return {...state, cart: []}
        }
        default:
            throw new Error()
    }
}

export const useCartContext = (InitCartState: CartStateType) => {
    const [state, cartDispatch] = useReducer(reducer, InitCartState)

    

    const CART_REDUCER_ACTIONS = useMemo(() => {
        return CART_REDUCER_ACTION_TYPE
    },[])

    const totalItems: number = state.cart.reduce((total, cartItem) => {
        return total + cartItem.qty
    },0)

    const totalPrice: string = Intl.NumberFormat('en-US',{style:'currency', currency:'ZAR'}).format(state.cart.reduce((total, cartItem) => {
        return total + (cartItem.price * cartItem.qty)
    },0))

    const cart = state.cart.sort((a,b) => a.id - b.id)

    return{cartDispatch, CART_REDUCER_ACTIONS, totalItems, totalPrice, cart}
}

export type UseCartContextType = ReturnType<typeof useCartContext>

const InitCartContextState: UseCartContextType = {
    cartDispatch: () => {},
    CART_REDUCER_ACTIONS: CART_REDUCER_ACTION_TYPE,
    totalItems: 0,
    totalPrice: '',
    cart: []
}

export const CartContext = createContext<UseCartContextType>(InitCartContextState)

type ChildrenType = {
    children?: ReactElement | ReactElement []
}

export const CartProvider = ({children}: ChildrenType): ReactElement => {
    return <CartContext.Provider value={useCartContext(InitCartState)}>
        {children}
    </CartContext.Provider>
}

export default CartContext