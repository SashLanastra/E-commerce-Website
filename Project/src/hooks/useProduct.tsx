import {useContext} from 'react'
import ProductContext, { UseProductsContextType } from '../context/ProductProvider'

export const useProduct = (): UseProductsContextType => {
  return useContext(ProductContext);
}
