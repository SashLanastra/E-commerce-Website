import { useState } from 'react'
import { useCart } from '../hooks/useCart'
import CartItem from '../components/CartItem'

const Cart = () => {
    
    const[confirm, setConfirm] = useState<boolean>(false)
    
    const{ cartDispatch, CART_REDUCER_ACTIONS, totalItems, totalPrice, cart } = useCart()

    const onSubmitOrder = () => {
        cartDispatch({type: CART_REDUCER_ACTIONS.SUBMIT})
        setConfirm(true)
    }
    
    const pageContent = confirm
        ?<h2>Thank you for your purchase.</h2>
        :<>
            <h2 className='cartpage-heading'>Your Items</h2>
            <div className='cartpage-contents'>
                <ul className='cart-items-list'>
                    {cart.map(item => {
                        return (
                            <CartItem 
                                key={item.id}
                                item={item}
                                cartDispatch={cartDispatch}
                                CART_REDUCER_ACTIONS={CART_REDUCER_ACTIONS}
                            />
                        )
                    })}
                </ul>
                <div className='cart-summary'>
                    <p className='cart-item-total'>Total Items: <b>{totalItems}</b></p>
                    <p className='cart-price-total'>Total Price: <b>{totalPrice}</b></p>
                    <button onClick={onSubmitOrder} disabled={!totalItems} className='place-order-btn'>Place Order</button>
                </div>
            </div>      
        </>
  return (
    <div 
        className='cartpage-wrapper'
    >
        {pageContent}
    </div>
  )
}

export default Cart