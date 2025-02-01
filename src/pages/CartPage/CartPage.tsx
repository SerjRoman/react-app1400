import { useContext, useState } from "react";
import { cartContext } from "../../context/cartContext";
import "./CartPage.css"
import { Product } from "../../shared/Product/Product";

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
    
    return (
    <div>
        {cartProducts.map(product =>{
            return (
            <div className="productDiv">
                <div className="imageDiv">
                    <img src={product.image} alt="" className="cartImage"/>
                </div>
            <div className="mainDiv">
                <div className="contentDiv">
                    <p>Description:{product.description}</p>
                    <p>Category: {product.category}</p>
                    <p>Price: {product.price}$</p>
                    <p>Number of items: {amount}</p>
                </div>
                <div>
                    <button onClick={incrementAmount}>Add 1</button>
                    <button onClick={decrementAmount} >Remove 1</button>
                </div>
            </div>
                <div className="buttDiv">
                    <button className="cartButt">Buy</button>
                    <button className="cartButt">Go to</button>
                    <button className="cartButt deleteButt" onClick={() => {deleteFromCart(product.id)}}>Delete</button>
                </div>
            </div>
            )
        })}
        <div className="cart-footer">
            <p className="cart-footer-total-price">Total price: {totalPrice}</p>
            <div className="cart-footer-buttons">
                <button className="cart-footer-buy-all">Buy all</button>
                <button className="cartFooter-delete-all" onClick={() => {deleteAllFromCart()}}>Delete all</button>
            </div>
        </div>
    </div>)
}