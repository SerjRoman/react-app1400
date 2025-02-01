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
            return <div className="cart-product-div">
                <img className="cart-product-image" src={product.image} alt="" />
                
                <div className="cart-description">
                    <h1 className="cart-product-title">Title: {product.title}</h1>
                    <p className="cart-product-description">Description: {product.description}</p>
                    <p className="cart-product-price">Price: {product.price}</p>
                    <p>Number of items: {amount}</p>
                    
                    <div className="cart-plus-minus-button">
                        <button onClick={incrementAmount} className="cart-plus-button">+</button>
                        <button onClick={decrementAmount} className="cart-minus-button">-</button>
                    </div>
                </div>
                
                <div className="cart-product-buttons">
                    <button className="cart-product-buy-button">Buy</button>
                    <button className="cart-product-goto-button">Go to</button>
                    <button className="cart-product-delete-button" onClick={()=>{deleteFromCart(product.id)}}>Delete</button>
                </div>
            </div>
            
        })}
    </div>)
}