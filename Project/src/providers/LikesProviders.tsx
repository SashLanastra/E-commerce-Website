import { ReactElement } from "react";
import { LikesContext, useLikeContext, initLikeState } from "@/context/LikesContext";

type ChildrenType = {
  children?: ReactElement | ReactElement[];
};

export const LikesProvider = ({ children }: ChildrenType): ReactElement => {
  return (
    <LikesContext.Provider value={useLikeContext(initLikeState)}>
      {children}
    </LikesContext.Provider>
  );
};