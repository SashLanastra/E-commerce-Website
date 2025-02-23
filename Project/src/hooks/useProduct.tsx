import {useContext} from 'react'
import ProductContext, { UseProductsContextType } from '@/providers/ProductProvider'

export const useProduct = (): UseProductsContextType => {
  return useContext(ProductContext);
}
