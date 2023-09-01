import { ReactElement, createContext, useMemo, useReducer, useEffect } from "react"


export type LikeItemType = {
    id: number,
    description: string,
    title: string,
    category: string,
    image: string,
    price: number,
    qty: number,
    rating: {
        rate: number,
        count: number
    }
}

type LikeStateType = {
    likes: LikeItemType[]
}

const initLikeState: LikeStateType = {
    likes:[]
}

const getLocalState = () => {
    const localData = localStorage.getItem("state");
    return localData ? JSON.parse(localData) : initLikeState
}


const LIKE_REDUCER_ACTION_TYPE = {
    ADD: 'ADD',
    REMOVE: 'REMOVE',
    CLEAR: 'CLEAR'
} 

export type LikeReducerActionType = typeof LIKE_REDUCER_ACTION_TYPE

export type LikeReducerAction = {
    type: string,
    payload?: LikeItemType
}

const reducer = (state: LikeStateType, action: LikeReducerAction): LikeStateType => {
    switch(action.type) {
        case LIKE_REDUCER_ACTION_TYPE.ADD: {
            if(!action.payload) {
                throw new Error('action. payload is missing from the ADD action')
            }

            const { id, description, title, category, image, price, rating } = action.payload

            const filteredCart: LikeItemType[] = state.likes.filter(item => item.id !== id)

            const itemExists: LikeItemType | undefined = state.likes.find(item => item.id === id)

            const qty: number = itemExists ? itemExists.qty + 1 : 1

            return{...state, likes: [...filteredCart, { id, description, category, title, image, price, rating, qty}]}
        }

        case LIKE_REDUCER_ACTION_TYPE.REMOVE: {
            if(!action.payload) {
                throw new Error('action.payload is missing from REMOVE action')
            }

            const { id } = action.payload
            
            const filteredCart: LikeItemType[] = state.likes.filter(item => item.id !== id)

            return{...state, likes: [...filteredCart]}
        }
        case LIKE_REDUCER_ACTION_TYPE.CLEAR: {
            return{...state, likes:[]}
        }
        default:
            throw new Error()
    }
}

export const useLikeContext = (initLikeState: LikeStateType) => {
    const[state, likeDispatch] =  useReducer(reducer, initLikeState, getLocalState)

    useEffect(() => {
        localStorage.setItem("state", JSON.stringify(state))
    }, [state])

   
    const LIKE_REDUCER_ACTIONS = useMemo(() => {
        return LIKE_REDUCER_ACTION_TYPE
    },[])

    const totalLikedItems: number = state.likes.reduce((total, likedItem) => { return total + likedItem.qty},0)

    const likes = state.likes.sort((a,b) => a.id -b.id)

    return { likeDispatch, LIKE_REDUCER_ACTIONS, totalLikedItems, likes}
}

export type UseLikeContextStateType = ReturnType<typeof useLikeContext>

const initLikeContextState: UseLikeContextStateType = {
    likeDispatch: () => {},
    LIKE_REDUCER_ACTIONS: LIKE_REDUCER_ACTION_TYPE,
    totalLikedItems: 0,
    likes: []
}

export const LikesContext = createContext<UseLikeContextStateType>(initLikeContextState) 

type ChildrenType = {
    children?: ReactElement | ReactElement[]
}

export const LikesProvider = ({children}: ChildrenType): ReactElement => {
    return <LikesContext.Provider value={useLikeContext(initLikeState)}>
        {children}
    </LikesContext.Provider>
    
}

export default LikesContext