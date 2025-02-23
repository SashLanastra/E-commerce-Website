import { LikeStateType, LikeItemType } from "@/utils";

export const LIKE_REDUCER_ACTION_TYPE = {
  ADD: "ADD",
  REMOVE: "REMOVE",
  CLEAR: "CLEAR",
} as const;

export type LikeReducerActionType = typeof LIKE_REDUCER_ACTION_TYPE;

export type LikeReducerAction = {
  type: string;
  payload?: LikeItemType;
};

export const reducer = (
  state: LikeStateType,
  action: LikeReducerAction     
): LikeStateType => {
  switch (action.type) {
    case LIKE_REDUCER_ACTION_TYPE.ADD: {
      if (!action.payload) {
        throw new Error("action.payload is missing from the ADD action");
      }

      const { id, description, title, category, image, price, rating } =
        action.payload;

      const filteredCart: LikeItemType[] = state.likes.filter(
        (item) => item.id !== id
      );

      const itemExists: LikeItemType | undefined = state.likes.find(
        (item) => item.id === id
      );

      const qty: number = itemExists ? itemExists.qty + 1 : 1;

      return {
        ...state,
        likes: [
          ...filteredCart,
          { id, description, category, title, image, price, rating, qty },
        ],
      };
    }

    case LIKE_REDUCER_ACTION_TYPE.REMOVE: {
      if (!action.payload) {
        throw new Error("action.payload is missing from REMOVE action");
      }

      const { id } = action.payload;

      const filteredCart: LikeItemType[] = state.likes.filter(
        (item) => item.id !== id
      );

      return { ...state, likes: [...filteredCart] };
    }
    case LIKE_REDUCER_ACTION_TYPE.CLEAR: {
      return { ...state, likes: [] };
    }
    default:
      throw new Error();
  }
};