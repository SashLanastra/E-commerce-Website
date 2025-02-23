import { CartItemType, CartStateType } from "@/utils"

export const CART_REDUCER_ACTION_TYPE = {
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

export const reducer = (state: CartStateType, action: CartReducerAction): CartStateType => {
    switch(action.type) {
        case CART_REDUCER_ACTION_TYPE.ADD: {
            if(!action.payload) {
                throw new Error('action.payload is missing from the ADD action')
            }

            const{ id, title, description, category, image, price, rating} = action.payload

            const filteredCart: CartItemType[] = state.cart?.filter(item => item.id !== id) || []

            const itemExists: CartItemType | undefined = state.cart?.find(item => item.id === id)

            const qty: number = itemExists ? itemExists.qty + 1 : 1

            return{...state, cart: [...filteredCart, {id, title, description, category, image, price, rating, qty}]}
        }

        case CART_REDUCER_ACTION_TYPE.REMOVE: {
            if(!action.payload) {
                throw new Error('action.payload is missing from the REMOVE action')
            }

            const{ id } = action.payload

            const filteredCart: CartItemType[] = state.cart?.filter(item => item.id !== id) || []

            return{...state, cart:[...filteredCart]}
        }

        case CART_REDUCER_ACTION_TYPE.QUANTITY: {
            if(!action.payload) {
                throw new Error('action.payload is missing from the QUANTITY action')
            }

            const {id, qty} = action.payload

            const itemExists: CartItemType | undefined = state.cart?.find(item => item.id === id)

            if(!itemExists) {
                throw new Error('Item needs to exist in order to update the quantity')
            }

            const updatedItem = {...itemExists, qty}

            const filteredCart: CartItemType[] = state.cart?.filter(item => item.id !== id) || []

            return{...state, cart: [...filteredCart, updatedItem]}
        }

        case CART_REDUCER_ACTION_TYPE.SUBMIT: {
            return {...state, cart: []}
        }
        default:
            throw new Error()
    }
}