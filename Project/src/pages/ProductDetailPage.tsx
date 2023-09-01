import { ReactElement, useState, useEffect } from 'react'
import { useCart } from '../hooks/useCart'
import { useParams } from 'react-router-dom'
import ProductDetail from '../components/ProductDetail'
import ImageCarousel from '../components/ImageCarousel'
import {useLiked} from '../hooks/useLiked'


const ProductDetailPage = () => {
    const params = useParams()
    const [currentItem, setCurrentItem] = useState(null)
    const {cartDispatch, CART_REDUCER_ACTIONS} = useCart()
    const { likeDispatch, LIKE_REDUCER_ACTIONS} = useLiked()

    useEffect(() => {
    const fetchProduct = async() => {
      const data = await fetch(`https://fakestoreapi.com/products/${params.id}`)
        .then(res => res.json())
        .catch(err => {
          if(err instanceof Error) console.log(err.message)
        })
        return data
    }
    fetchProduct().then(data => setCurrentItem(data))
    
  }, [params.id]);
  console.log(currentItem)

  const content: ReactElement | null = currentItem ?
    <>
      <ProductDetail 
      currentItem={currentItem}
      cartDispatch={cartDispatch}
      CART_REDUCER_ACTIONS={CART_REDUCER_ACTIONS}
      likeDispatch={likeDispatch}
      LIKE_REDUCER_ACTIONS={LIKE_REDUCER_ACTIONS}
      />
      <ImageCarousel
        currentItem={currentItem}   
      />
    </>
    :<p>Loading...</p>
 
  return <div className='product-detail-page'>{content}</div>
}

export default ProductDetailPage