import { ReactElement, createContext, useEffect, useMemo, useState } from "react"


export type ProductType = {
    id: number,
    title: string,
    description: string,
    category: string,
    price: number,
    image: string,
    rating: {
        rate: number,
        count: number
    }
}

const initProductState: ProductType[] = []

export type UseProductsContextType = {products: ProductType[]}

const initProductsContextType: UseProductsContextType = {products: []}

const ProductContext = createContext<UseProductsContextType>(initProductsContextType)

type ChildrenType = {
    children?: ReactElement | ReactElement[]
}

export const ProductProvider = ({children}: ChildrenType): ReactElement => {
    const[products, setProducts] = useState<ProductType[]>(initProductState)

    useEffect(() => {
        const fetchProducts = async (): Promise<ProductType[]> => {
            const data = await fetch('https://fakestoreapi.com/products')
                .then(res => res.json())
                .catch(err => {
                    if(err instanceof Error) console.log(err.message)
                })
                return data
        } 
        fetchProducts().then(products => setProducts(products))
        
    },[])
    console.log(products)

    const value = useMemo(() => ({ products }), [products])

    return (
        <ProductContext.Provider value={value}>
            {children}
        </ProductContext.Provider>
    )
}

export default ProductContext