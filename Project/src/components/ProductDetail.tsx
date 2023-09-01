import { NavLink, Outlet } from 'react-router-dom'
import { ReactElement } from 'react'
import { ProductType } from '../context/ProductProvider'
import { CartReducerAction, CartReducerActionType } from '../context/CartProvider'
import { LikeReducerAction, LikeReducerActionType } from '../context/LikeProvider'
import { useCart } from '../hooks/useCart'
import {useLiked} from '../hooks/useLiked'
import { AiFillHeart, AiOutlineHeart, AiFillStar } from "react-icons/ai";

type PropsType = {
  currentItem: ProductType,
  cartDispatch: React.Dispatch<CartReducerAction>,
  CART_REDUCER_ACTIONS: CartReducerActionType,
  likeDispatch: React.Dispatch<LikeReducerAction>,
  LIKE_REDUCER_ACTIONS: LikeReducerActionType,
  
}

const ProductDetail = ({currentItem, cartDispatch, CART_REDUCER_ACTIONS, likeDispatch, LIKE_REDUCER_ACTIONS }: PropsType)=> {
  const {cart} = useCart()
  const { likes } = useLiked()

  const inLikes: boolean = likes.some(item => item.id === currentItem.id)

  const inCart: boolean = cart.some(item => item.id === currentItem.id)

  const handleLikes = () => {
    inLikes
      ?likeDispatch({
        type:LIKE_REDUCER_ACTIONS.REMOVE,
        payload: {...currentItem,qty:0}
      })
      :likeDispatch({
        type:LIKE_REDUCER_ACTIONS.ADD,
        payload: {...currentItem,qty:1}
      })
  }

  const handleCart = () => {
    inCart 
      ? cartDispatch({type: CART_REDUCER_ACTIONS.REMOVE, payload:{...currentItem,qty:0}}) 
      :cartDispatch({type: CART_REDUCER_ACTIONS.ADD, payload:{...currentItem,qty: 1}})
      console.log('clicked')
  }

  const likeIcon = inLikes ? <AiFillHeart color="red"/> : <AiOutlineHeart color="red"/>
  
  const itemInCart: string = inCart ? 'Remove From Cart': 'Add To Cart'


  const buttonStyle = !inCart ? {backgroundImage: 'linear-gradient(to right, #a44849, #7F2D41, #350929)', color: '#fff'} : {backgroundColor: 'rgba(20,20,20,0.250)', color: '#000'}

  const activeStyle = {
    fontWeight: "bold",
    textDecoration: "none",
    color: "#A44849"
}


  const content: ReactElement | null = currentItem ? 
  <div className='product-detail-wrapper'>
    <img src={currentItem.image} alt={currentItem.title} className='product-detail-img'/>
    
    <div className='details-wrapper'>
      <div className='detail-headings'>
        <h1 className='detail-heading'>{currentItem.title}</h1>
        <span className='product-detail-rating'>
          <i><AiFillStar color='#7F2D41'/></i> 
          <p className='rating'>{currentItem.rating.rate}</p>
          <p className='rating'>{`(${currentItem.rating.count})`}</p>
        </span>
        <h2>{new Intl.NumberFormat('en-US',{style:'currency',currency:'ZAR'}).format(currentItem.price)}</h2>
      </div>
      <div className='detail-toggle-wrapper'>
        <div className='detail-navbar active'>
          <NavLink 
            to={`/${currentItem.id}`}
            style={({isActive}) => isActive ? activeStyle : undefined }
            end
          >Description</NavLink>
          <NavLink
            to={`/${currentItem.id}/reviews`}
            style={({isActive}) => isActive ? activeStyle : undefined }
          >Reviews</NavLink>
        </div>
        <Outlet />
      </div>
    </div>
    <div className='product-detail-btns'>
      <button 
        onClick={handleCart} 
        style={buttonStyle}
        className='detail-cart-btn'
        >
          {itemInCart}
      </button>
      <button className="product-detail-like-btn" onClick={handleLikes}>{likeIcon}</button>
    </div>
  </div>
  :<p>loading...</p>
  
 
  
  return content
}

export default ProductDetail