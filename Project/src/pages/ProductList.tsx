import { ReactElement, useState } from 'react'
import {useCart} from '@/hooks/useCart'
import {useProduct} from '@/hooks/useProduct'
import Product from '@/components/Product'
import {useLiked} from '@/hooks/useLiked'
import SearchBar from '@/components/SearchBar'
import { CartItemType, LikeItemType, ProductType } from '@/utils'
import { ProductListSkeleton } from '@/components/SuspenseSkeletons/ProductList'
import SiteError from './SiteError'
const ProductList = () => {
    const { cartDispatch, CART_REDUCER_ACTIONS, cart } = useCart()
    const{ products, isLoading, isError, error } = useProduct()
    const { likes, likeDispatch, LIKE_REDUCER_ACTIONS } = useLiked()
    const [searchResults, setSearchResults] = useState<ProductType[]>([])

    let pageContent: ReactElement | ReactElement[] | null = null

    const productsToDisplay = searchResults.length > 0 ? searchResults : products

    if (isError) {
        return (
            <SiteError errorMessage={error?.message ?? 'An unknown error occurred'} />
        )
    }

    if (isLoading) {
        return (
            <ProductListSkeleton />
        )
    }

    if (productsToDisplay?.length) {
        pageContent = productsToDisplay.map(product => {
            const inCart : boolean = cart.some((item: CartItemType) => item.id === product.id)
            const inLikes: boolean = likes.some((item: LikeItemType) => item.id === product.id)

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

    return (
        <div className="flex flex-col items-center justify-center gap-4">
            <SearchBar setSearchResults={setSearchResults} />
            <div className="max-w-5xl flex flex-wrap justify-center gap-4">
                {pageContent}
            </div>
        </div>
    )
}

export default ProductList