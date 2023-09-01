import {useState, useEffect, ReactElement} from 'react'
import { ProductType } from '../context/ProductProvider'
import { useParams } from 'react-router-dom'

const Details = () => {
    const[fullDetails, setFulldetails] = useState<boolean>(false)
    

    const[currentDetails, setCurrentDetails] = useState<ProductType | null>(null)

    const { id } = useParams()

    useEffect(() => {
        const fetchDetails = async():Promise<ProductType> => {
            const data = await fetch(`https://fakestoreapi.com/products/${id}`) 
                .then(res => res.json())
                .catch(err => {
                    if(err instanceof Error) console.log(err.message)
                })
                return data
        }
        fetchDetails().then(data => setCurrentDetails(data))
    }, [id]);

    

    const detailsTag: string = fullDetails ? "See Less" : "See More"

    const content: ReactElement | null = currentDetails ?
        <>
            <div className={!fullDetails ? "full-product-details" : ""}>
                {currentDetails.description}
            </div>
            <p className='details-tag' onClick={()=>setFulldetails(!fullDetails)} >{detailsTag}</p>
        </>
        
        : <p>Loading...</p>

  return content
}

export default Details