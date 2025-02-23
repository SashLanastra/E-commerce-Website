import { useContext } from 'react'
import { LikesContext, UseLikeContextStateType } from '@/context/LikesContext'

export const useLiked = (): UseLikeContextStateType => {
  return useContext(LikesContext)
}

