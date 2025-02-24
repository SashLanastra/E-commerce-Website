import { useCart } from '@/hooks/useCart'
import { useParams } from 'react-router-dom'
import ProductDetail from '@/components/ProductDetail'
import ImageCarousel from '@/components/ProductCarousel'
import { useLiked } from '@/hooks/useLiked'
import { useProduct } from '@/hooks/useProduct'
import SiteError from './SiteError'
import PageNotFound from './PageNotFound'

const ProductDetailPage = () => {
    const { id } = useParams()
    const { cartDispatch, CART_REDUCER_ACTIONS } = useCart()
    const { likeDispatch, LIKE_REDUCER_ACTIONS } = useLiked()
    const { singleProduct, isError, error } = useProduct()
    
    const product = singleProduct(Number(id))

    
    if (isError) return <SiteError errorMessage={error instanceof Error ? error.message : 'An error occurred'} />
    
    if (!product) return <PageNotFound />

    return (
        <div className='w-full'>
            <ProductDetail 
                currentItem={product}
                cartDispatch={cartDispatch}
                CART_REDUCER_ACTIONS={CART_REDUCER_ACTIONS}
                likeDispatch={likeDispatch}
                LIKE_REDUCER_ACTIONS={LIKE_REDUCER_ACTIONS}
            />
            <ImageCarousel
                currentItem={product}   
            />
        </div>
    )
}

export default ProductDetailPage