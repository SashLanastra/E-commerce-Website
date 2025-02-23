import { useCart } from '@/hooks/useCart'
import { useParams } from 'react-router-dom'
import ProductDetail from '@/components/ProductDetail'
import ImageCarousel from '@/components/ImageCarousel'
import { useLiked } from '@/hooks/useLiked'
import { useProduct } from '@/hooks/useProduct'

const ProductDetailPage = () => {
    const { id } = useParams()
    const { cartDispatch, CART_REDUCER_ACTIONS } = useCart()
    const { likeDispatch, LIKE_REDUCER_ACTIONS } = useLiked()
    const { singleProduct, isLoading, isError, error } = useProduct()
    
    const product = singleProduct(Number(id))

    if (isLoading) return <div className='product-detail-page'><p>Loading...</p></div>
    
    if (isError) return <div className='product-detail-page'>
        <p>Error: {error instanceof Error ? error.message : 'An error occurred'}</p>
    </div>

    if (!product) return <div className='product-detail-page'><p>No product found</p></div>

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