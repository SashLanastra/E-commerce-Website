import { ReactElement, useState } from 'react'
import {useCart} from '../hooks/useCart'
import {useProduct} from '../hooks/useProduct'
import Product from '../components/Product'
import {useLiked} from '../hooks/useLiked'

const ProductList = () => {
    const [scrollTop, setScrollTop] = useState(false)

    const { cartDispatch, CART_REDUCER_ACTIONS, cart } = useCart()
    const{ products } = useProduct()
    const { likes, likeDispatch, LIKE_REDUCER_ACTIONS } = useLiked()

    let pageConent: ReactElement | ReactElement[] = <p>Loading...</p>

    if (products?.length) {
        pageConent = products.map(product => {
            const inCart : boolean = cart.some(item => item.id === product.id)

            const inLikes: boolean = likes.some(item => item.id === product.id)

            return (
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
        <div className='homepage-wrapper'>
            <p className='home-heading'>P r o d u c t s</p>
            <div className="main main-products">
                {pageConent}
            </div>
        </div>
        
    )
  return content
}

export default ProductList