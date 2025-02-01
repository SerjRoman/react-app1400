import { CartItem } from "../../shared/CartItem/CartItem";
import { useContext } from "react";
import { cartContext } from "../../context/cartContext";
import './CartList.css'
export function CartList(){
    const {cartProducts} = useContext(cartContext)
    return (
        <div className="cart-list">
            {cartProducts.map(product =>{
                return <CartItem key = {product.id} id={product.id} category = {product.category} description = {product.description} price = {product.price} image = {product.image}></CartItem>
            })}
        </div>
    )
}