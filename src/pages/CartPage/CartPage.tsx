import { useContext, useState } from "react";
import { cartContext } from "../../context/cartContext";

import "./CartPage.css"
import { Link } from "react-router-dom";

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