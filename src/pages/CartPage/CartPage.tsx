import { useContext, useEffect, useState } from "react";
import { cartContext } from "../../context/cartContext";

import { CartProduct } from "../../shared/CartProduct/CartProduct";

import "./CartPage.css"

// (●'◡'●)
export function CartPage(){
    const [cartPrice, setCartPrice] = useState< number >()
    const {cartProducts} = useContext(cartContext)

    useEffect(() => {
        let result: number = cartProducts.reduce((price, product) => price + product.price, 0);
        setCartPrice(result)
    }, [cartProducts])


    return (
        <div className="cartPage">
            <h1 className="cartTitle">Корзина</h1>
            <div className="cartProducts">
                {cartProducts.map(product => {
                    return (
                        <CartProduct
                            key = {product.id}
                            id={product.id}
                            title = {product.title}
                            description = {product.description}
                            price = {product.price}
                            image = {product.image}
                        ></CartProduct>
                    )
                })}
            </div>
            <div className="cartTotal">
                <h1>Итого: {cartPrice}$</h1>
            </div>
        </div>
    )
}