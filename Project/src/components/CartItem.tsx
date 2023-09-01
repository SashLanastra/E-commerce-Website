import { Link } from "react-router-dom"
import { CartReducerActionType } from "../context/CartProvider"
import { CartReducerAction } from "../context/CartProvider"
import { CartItemType } from "../context/CartProvider"
import { ReactElement, ChangeEvent, useState, useRef, useEffect} from 'react'


type PropsType = {
    item: CartItemType,
    cartDispatch: React.Dispatch<CartReducerAction>,
    CART_REDUCER_ACTIONS: CartReducerActionType
}

const CartItem = ({ item, cartDispatch, CART_REDUCER_ACTIONS}: PropsType) => {
    const[qtyMenu, setQtyMenu] = useState<boolean>(false)
    const qtyDrawerMenu = useRef<HTMLDivElement>(null)

    qtyMenu ? document.body.style.overflow = "hidden" : document.body.style.overflow = "auto"
    useEffect(() => {
        let clickOutsideDrawerMenu = (e: MouseEvent | any) => {
            if(!qtyDrawerMenu.current?.contains(e.target)) {
                setQtyMenu(false)
            }
        }
        document.addEventListener("mousedown", clickOutsideDrawerMenu)

        return () => {
            document.removeEventListener("mousedown", clickOutsideDrawerMenu)
        }
    },[])
    

    const img: string = new URL (item.image, import.meta.url).href

    const lineTotal: number = (item.qty * item.price)

    const highestQty: number = item.qty < 10 ? 10 : item.qty

    const optVal: number[] = [...Array(highestQty).keys()].map(i => i + 1)

    const options: ReactElement[] = optVal.map(val => {
        return <option key={`opt${val}`} value={val} className="opt-box">{val}</option>
    })

    const mobileQtys: ReactElement[] = optVal.map(val=> {
        return <Link to="/cart"><li key={`opt${val}`}  className="mobile-qty" onClick={()=>{
            cartDispatch({
                type:CART_REDUCER_ACTIONS.QUANTITY,
                payload:{...item,qty:val}
            });
            setQtyMenu(false)
        }}>{val}</li></Link>
        
    })

    const onChangeQty = (e: ChangeEvent<HTMLSelectElement>) => {
        cartDispatch({
            type: CART_REDUCER_ACTIONS.QUANTITY,
            payload: {...item, qty: Number(e.target.value)}
        })
        console.log(e.target)
    }

    const onRemoveItem = () => cartDispatch({
        type: CART_REDUCER_ACTIONS.REMOVE,
        payload: item
    })

    const mobileQtyHandler = () => {
        setQtyMenu(!qtyMenu)
        console.log(qtyMenu)
        
    }

    const pageContent = (
        <>
            <li className="cart-item-wrapper">
                <img src={img} alt={item.title} className="cart-item-img"/>
                <div className="cart-item-details">
                    <h3 className="cart-item-title">{item.title}</h3>
                    <div aria-label="Line Item Subtotal" className="cart-item-subtotal">
                        <p className="cart-item-subtotal-label">
                            Subtotal: 
                        </p>
                        <p className="item-subtotal">
                            {new Intl.NumberFormat('en-US',{style:'currency',currency:'ZAR'}).format(lineTotal)}
                        </p>
                    </div>
                </div>
                <div className="cart-item-summary">
                    <div className="cart-item-qty-handler">
                        <label htmlFor="itemQty">Qty:</label>
                        <select 
                            name="itemQty" 
                            id="itemQty"
                            value={item.qty}
                            onChange={onChangeQty}
                            className="select-box"
                        >
                            {options}
                        </select>
                        <span className="custom-arrow"></span>
                    </div>
                    <button
                        aria-label="Remove item from cart"
                        title="Remove item from cart"
                        onClick={onRemoveItem}
                        className="remove-item-btn"
                    >Remove Item</button>
                    <button
                        className="mobile-qty-handler"
                        onClick={mobileQtyHandler}
                    >Qty: {item.qty}</button>
                </div>
            </li>
            {
                qtyMenu ?
                <div className="qty-drawer-bg">
                    <div 
                        ref={qtyDrawerMenu}
                        className="mobile-qty-drawer"
                    >
                        <p>Please select a quantity</p>
                        <ul>{mobileQtys}</ul>
                    </div>
                </div>
                   
                : null 
            }
            
        </>
           
    )
  return pageContent

}

export default CartItem