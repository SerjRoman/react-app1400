import { CartList } from '../../shared/CartList/CartList'
import './CartPage.css'
import { useCartContext } from '../../context/cartContext'
import { useEffect } from 'react'

// (●'◡'●)
export function CartPage(){
    const { clearCart, totalPrice, totalPriceCounter} = useCartContext()
    useEffect(() => {totalPriceCounter()},
    [])
    return (
    <div className="cart-page">
        <h1>Cart</h1>
        <CartList></CartList>
        <div className='cart-page-menu'>
            <p>Total price: {totalPrice}$</p>
            <div className='cart-page-menu-button'>Buy All</div>
            <div className='cart-page-menu-button delete' onClick={clearCart}>Delete All</div>
        </div>
    </div>
    )
}