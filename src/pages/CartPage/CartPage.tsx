import { useContext, useEffect, useState } from "react";
import { cartContext } from "../../context/cartContext";

import { CartProduct } from "../../shared/CartProduct/CartProduct";

import "./CartPage.css"

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