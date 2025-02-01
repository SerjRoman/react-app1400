import { useContext, useState } from "react";
import { cartContext } from "../../context/cartContext";

import "./CartPage.css"
import { Link } from "react-router-dom";

export function CartPage(){
    const {cartProducts, deleteFromCart, plus, minus, deleteAll} = useContext(cartContext)

    const totalProduct = totalPrice(cartProducts).toFixed(2)

    function totalPrice(cartProducts: any[]) {
        return cartProducts.reduce((total, product) => {
          return total + product.price * product.amount;
        }, 0)
    };

    return (
        <div className="cart-page">
            <h1>Cart</h1>
            <div className="cart-products">
                {cartProducts.map(product =>{
                    return (
                        <div className="cart-product" key={product.id}>
                            <img id="cart-img" src={product.image} alt="" />
                            <div className="cart-product-info">
                                <p>Description:{product.description}</p>
                                <p>Category:{product.category}</p>
                                <p>Price:{product.price}</p>
                                <p>Number of items:{product.amount}</p>
                                <div style={{ display: "flex", gap: "10px" }}>
                                    <button onClick={() => plus(product.id)} className="button-plus"><svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 20C0 8.95431 8.95431 0 20 0C31.0457 0 40 8.95431 40 20C40 31.0457 31.0457 40 20 40C8.95431 40 0 31.0457 0 20Z" fill="#96FA99"/><path d="M10.4191 20.614C10.1397 20.472 10 20.2715 10 20.0125C10 19.7536 10.1397 19.553 10.4191 19.411H19.3963V14.8997L19.4276 10.3885C19.6278 10.1295 19.8175 10 19.9969 10C20.2596 10 20.4598 10.1504 20.5974 10.4511V19.411H29.5496C29.8499 19.5698 30 19.7703 30 20.0125C30 20.2548 29.8499 20.4553 29.5496 20.614H20.5974V29.5739C20.4598 29.858 20.2596 30 19.9969 30C19.7383 30 19.5381 29.858 19.3963 29.5739V20.614H10.4191Z" fill="#404040"/></svg></button>
                                    <button onClick={() => minus(product.id)} className="button-plus"><svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 20C0 8.95431 8.95431 0 20 0C31.0457 0 40 8.95431 40 20C40 31.0457 31.0457 40 20 40C8.95431 40 0 31.0457 0 20Z" fill="#F88686"/><path d="M10.4577 21C10.1525 20.7639 10 20.4306 10 20C10 19.5694 10.1525 19.2361 10.4577 19H29.5082C29.8361 19.2639 30 19.5972 30 20C30 20.4028 29.8361 20.7361 29.5082 21H10.4577Z" fill="#404040"/></svg></button>
                                </div>
                            </div>
                            <div className="cart-buttons">
                                <button className="cart-button" >Buy</button>
                                <Link to={`/product/${product.id}`}>
                                    <button className="cart-button" >Go To</button>
                                </Link>
                                <button className="cart-button" id="del" onClick={()=>{deleteFromCart(product.id)}}>Delete</button>
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className="cart-total">
                <h1>Total Price: {totalProduct} UA</h1>
                <button className="cart-button">Buy All</button>
                <button className="cart-button" id="del" onClick={() => {deleteAll()}}>Delete All</button>
            </div>
        </div>
    )
}