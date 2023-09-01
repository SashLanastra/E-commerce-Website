import {ReactElement} from 'react'
import { useProduct } from '../hooks/useProduct'
import { ProductType } from '../context/ProductProvider'
import { useCart } from '../hooks/useCart'
import Product from './Product'
import {useLiked} from '../hooks/useLiked'

type PropsType = {
    currentItem: ProductType
}
const ImageCarousel = ({currentItem}:PropsType): ReactElement => {
    const { products } = useProduct()
    const {cartDispatch, CART_REDUCER_ACTIONS, cart } = useCart()
    const { likes, likeDispatch, LIKE_REDUCER_ACTIONS } = useLiked()

    const inCarousel = products.filter(product => product.category === currentItem.category )

    const filteredCarousel = inCarousel.filter(product => product.id !== currentItem.id)

    let componentContent: ReactElement | ReactElement[]= <p>Loading...</p>

    if(products?.length ) {
        componentContent = filteredCarousel.map(product => {
            const inCart: boolean = cart.some(item => item.id === product.id)
            const inLikes: boolean = likes.some(item => item.id === product.id)
            
            return(
                <Product 
                    key={product.id}
                    product={product}
                    cartDispatch={cartDispatch}
                    CART_REDUCER_ACTIONS={CART_REDUCER_ACTIONS}
                    inCart={inCart}
                    inLikes={inLikes}
                    likeDispatch={likeDispatch}
                    LIKE_REDUCER_ACTIONS={LIKE_REDUCER_ACTIONS}
                />
            )
        })
    }

    const content = (
        <div>
            <p className='carousel-heading'>Items You Might Like</p>
            <br />
            <div className='product-carousel'>
            {componentContent}
            </div>
        </div>
        
    )

    
  return content
}

export default ImageCarousel