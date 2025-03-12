import { useContext, useState } from "react";
import { cartContext } from "../../context/cartContext";
import "./CartPage.css"

// (●'◡'●)
export function CartPage(){
    const {cartProducts, deleteFromCart, deleteAllFromCart} = useContext(cartContext)
    const [amount, setAmount] = useState(1)

    const totalPrice = cartProducts.reduce((total, product) => total + product.price, 0);

    function incrementAmount() {
        setAmount(amount+1)
    }

    function decrementAmount() {
        if (amount > 1)
            setAmount(amount-1)
    }

    return (<div className="cart-main-div">
        <div className="cart-title">
            <h1>Cart</h1>
        </div>

        <div className="cart-footer">
            <p className="cart-footer-total-price">Total price: {totalPrice}</p>
            <div className="cart-footer-buttons">
                <button className="cart-footer-buy-all">Buy all</button>
                <button className="cart-footer-delete-all" onClick={() => {deleteAllFromCart()}}>Delete all</button>
            </div>
        </div>
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