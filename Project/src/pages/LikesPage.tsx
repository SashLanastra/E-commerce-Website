import {useState} from 'react'
import { useCart } from '../hooks/useCart'
import { useLiked } from '../hooks/useLiked'
import LikesComponent from '../components/LikesComponent'

const LikesPage = () => {
    const [clear, setClear] = useState<boolean>(false)
    const { likeDispatch, LIKE_REDUCER_ACTIONS, likes, totalLikedItems} = useLiked()
    const { CART_REDUCER_ACTIONS, cartDispatch, cart } = useCart()

    const onClearPage = () => {
      likeDispatch({type: LIKE_REDUCER_ACTIONS.CLEAR})
      setClear(true)
    }
    
    const pageContent = 
      <>
        <ul className='likes-list'>
          {likes.map(item => {
            const inCart: boolean = cart.some(product => product.id === item.id)
            return (
              <LikesComponent 
                key={item.id}
                item={item}
                likeDispatch={likeDispatch}
                LIKE_REDUCER_ACTIONS={LIKE_REDUCER_ACTIONS}
                inCart={inCart}
                CART_REDUCER_ACTIONS={CART_REDUCER_ACTIONS}
                cartDispatch={cartDispatch}
              />
            )
          })}
        </ul>
      </>

    const content = (
      <div className='likes-wrapper'>
        <h2 className='like-page-heading'>Your liked items</h2>
        <div className='likes-page' >
          {pageContent}
          <div className='likes-summary'>
            <p className='like-total'>Total likes: <b>{totalLikedItems}</b></p>
            {!clear && 
            <button 
              onClick={onClearPage} 
              disabled={!totalLikedItems}
              className='clear-likes-btn'
              >Clear likes
            </button>
            }
            
          </div>
        </div>
      </div>
      
    )
    
    
  return content
}

export default LikesPage