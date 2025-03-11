import { CartList } from '../../shared/CartList/CartList'
import './CartPage.css'
import { useCartContext } from '../../context/cartContext'
import { useEffect } from 'react'

// (●'◡'●)
export function CartPage(){
    const {cartProducts, deleteFromCart} = useContext(cartContext)
    return (<div>
        {cartProducts.map(product =>{
            return <div>
                <h1>{product.name}</h1>
                <p>{product.description}</p>
                <p>{product.price}</p>
                <img src={product.src} alt="" />
                <button onClick={()=>{deleteFromCart(product.id)}}>Delete</button>
            </div>
        })}
    </div>)
}