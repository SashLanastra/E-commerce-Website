import React, { ReactElement } from 'react'
import { ProductType } from '../context/ProductProvider'
import { CartReducerActionType, CartReducerAction } from '../context/CartProvider'
import { LikeReducerAction, LikeReducerActionType } from '../context/LikeProvider'
import { Link } from 'react-router-dom'
import { AiFillHeart, AiOutlineHeart, AiFillStar } from "react-icons/ai";

type PropsType = {
    product: ProductType,
    cartDispatch: React.Dispatch<CartReducerAction>,
    CART_REDUCER_ACTIONS: CartReducerActionType,
    inCart: boolean,
    inLikes: boolean,
    likeDispatch: React.Dispatch<LikeReducerAction>,
    LIKE_REDUCER_ACTIONS: LikeReducerActionType
}

const Product = ({ product, cartDispatch, CART_REDUCER_ACTIONS, inCart, inLikes, likeDispatch, LIKE_REDUCER_ACTIONS }: PropsType): ReactElement => {


    const img: string = new URL( product.image, import.meta.url).href

    const onAddToCart = () => {
        inCart 
            ?cartDispatch({
                type: CART_REDUCER_ACTIONS.REMOVE,
                payload: {...product,qty: 0}
            })
            :cartDispatch({
                type: CART_REDUCER_ACTIONS.ADD,
                payload: {...product, qty: 1}
            })
    }

    const handleLike = () => {
        inLikes 
            ?likeDispatch({
                type: LIKE_REDUCER_ACTIONS.REMOVE,
                payload:{...product,qty:0}
            })
            :likeDispatch({
                type: LIKE_REDUCER_ACTIONS.ADD,
                payload:{...product,qty:1}
            })
            console.log('first')
    }

    const likeIcon = !inLikes ? <AiOutlineHeart color="red"/> : <AiFillHeart color="red" />

    const button = !inCart ? '+ To Cart' : '- From Cart'

    const buttonStyle = !inCart ? {backgroundImage: 'linear-gradient(to right, #a44849, #7F2D41, #350929)', color: '#fff'} : {backgroundColor: 'rgba(20,20,20,0.250)', color: '#000'}


    const content = (
        <article>
            <div className='image-title'>
                <Link to={`/${product.id}`}>
                    <img src={img} alt={product.title} className='product-img' width={200}/>
                    <p className='product-title'>{product.title}</p>
                </Link>
            </div>
            <div className='price-rating-button'>
                <Link to={`/${product.id}`}>
                    <p>
                        <b>
                            {new Intl.NumberFormat('en-US', {style: 'currency',currency: 'ZAR'}).format(product.price)}
                        </b>
                    </p>
                    <span className='productpage-rating'>
                        <i><AiFillStar color='#7F2D41'/></i> {`${product.rating.rate} (${product.rating.count})`}
                    </span>
                </Link>
                
                <div className='button-icon-container'>
                    <button onClick={onAddToCart} className='add-to-cart-btn' style={buttonStyle}>{button}</button>
                    <button className='like-icon' onClick={handleLike}>{likeIcon}</button>
                </div>
            </div>
        </article>
    )

  return (

    <>
        {content}
    </>

    )
  
}

export default Product