import { useContext } from 'react'
import LikesContext, { UseLikeContextStateType } from '../context/LikeProvider'

export const useLiked = (): UseLikeContextStateType => {
  return useContext(LikesContext)
}

