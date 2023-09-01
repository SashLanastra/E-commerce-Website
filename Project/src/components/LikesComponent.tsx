import { Link } from "react-router-dom"
import { LikeItemType } from "../context/LikeProvider"
import { LikeReducerAction, LikeReducerActionType } from "../context/LikeProvider"
import { CartReducerAction, CartReducerActionType } from "../context/CartProvider"

type PropsType = {

    item: LikeItemType,
    likeDispatch: React.Dispatch<LikeReducerAction>,
    LIKE_REDUCER_ACTIONS: LikeReducerActionType,
    cartDispatch: React.Dispatch<CartReducerAction>,
    CART_REDUCER_ACTIONS: CartReducerActionType,
    inCart: boolean

}

const LikesComponent = ({item, likeDispatch, LIKE_REDUCER_ACTIONS,cartDispatch, CART_REDUCER_ACTIONS, inCart}: PropsType) => {

  const img: string = new URL(item.image, import.meta.url).href

  const button: string = inCart ? 'Remove From Cart' : 'Add To Cart'

  const buttonStyle = !inCart ? {backgroundImage: 'linear-gradient(to right, #a44849, #7F2D41, #350929)', color: '#fff'} : {backgroundColor: 'rgba(20,20,20,0.250)', color: '#000'}

  const onRemoveItemFromLikes = () => {
    likeDispatch({
      type: LIKE_REDUCER_ACTIONS.REMOVE,
      payload: item
    })
  }

  const handleItemToCart = () => {
    
    inCart
    ?cartDispatch({
      type: CART_REDUCER_ACTIONS.REMOVE,
      payload:{...item,qty:0}
    })
    :cartDispatch({
      type: CART_REDUCER_ACTIONS.ADD,
      payload: {...item, qty:1}
    })
    console.log('clicked') 
    
  }

  const pageConent = 
   (<>
    <Link to={`/${item.id}`}>
    <div className="likes-img">
        <img src={img} alt={item.title}/>
    </div>
    </Link>
    <Link to={`/${item.id}`}>
      <div className="likes-details">
        <h3 className="detail-heading likes-product-heading">{item.title}</h3>
        <p>{item.category}</p>
        <p className="like-price">
          {new Intl.NumberFormat('en-US',{style:'currency', currency:'ZAR'}).format(item.price)}
        </p>
      </div>
    </Link>
    
    <div className="likes-btn-component">
      <button 
        onClick={handleItemToCart} 
        className="likes-cart-btn"
        style={buttonStyle}
      >{button}
      </button>
      <button 
        onClick={onRemoveItemFromLikes} 
        className="remove-like-btn"
      >Remove from Likes
      </button>
    </div>
    
        
    </>)

  const content = (
    <div className="likes-component">
      { pageConent }
    </div>
  )
  return content
}

export default LikesComponent

