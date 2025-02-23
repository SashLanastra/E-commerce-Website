import { createContext, useMemo, useReducer, useEffect } from "react";
import { LikeItemType, LikeStateType } from "@/utils";
import { LIKE_REDUCER_ACTION_TYPE, reducer } from "@/reducers/LikesReducer";

export const initLikeState: LikeStateType = {
  likes: [],
};

const getLocalState = () => {
  const localData = localStorage.getItem("state");
  return localData ? JSON.parse(localData) : initLikeState;
};

export const useLikeContext = (initLikeState: LikeStateType) => {
  const [state, likeDispatch] = useReducer(
    reducer,
    initLikeState,
    getLocalState
  );

  useEffect(() => {
    localStorage.setItem("state", JSON.stringify(state));
  }, [state]);

  const totalLikedItems = useMemo(() => 
    state.likes.reduce((total, likedItem) => total + likedItem.qty, 0)
  , [state.likes]);

  const likes = useMemo(() => 
    state.likes.slice().sort((a: LikeItemType, b: LikeItemType) => a.id - b.id)
  , [state.likes]);

  return { 
    likeDispatch, 
    LIKE_REDUCER_ACTIONS: LIKE_REDUCER_ACTION_TYPE,
    totalLikedItems, 
    likes 
  };
};

export type UseLikeContextStateType = ReturnType<typeof useLikeContext>;

const initLikeContextState: UseLikeContextStateType = {
  likeDispatch: () => undefined,
  LIKE_REDUCER_ACTIONS: LIKE_REDUCER_ACTION_TYPE,
  totalLikedItems: 0,
  likes: [],
};

export const LikesContext = 
  createContext<UseLikeContextStateType>(initLikeContextState); 