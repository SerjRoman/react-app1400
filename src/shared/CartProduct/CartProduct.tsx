// import { useContext } from "react";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";

import { cartContext } from "../../context/cartContext";

import "./CartProduct.css"

export interface ICartProduct{
    id: number,
    title: string,
    description: string,
    price: number,
    image: string,
}

export function CartProduct(props: ICartProduct) {
    const [count, setCount] = useState< number >(1)

    const { deleteFromCart } = useContext(cartContext)

    function addProductCount() {
        setCount(count + 1)
    }

    function removeProductCount() {
        if (count > 1) {
            setCount(count - 1)
        }
    }

    return (
        <div className="cartProduct">
            <div className="productDivImage">
                <img src={props.image} alt={props.title} className="productImage"/>
            </div>
            <div className="productDivDescription">
                <h1>{props.title}</h1>
                <p>{props.description}</p>
                <p>Цена: {props.price}$</p>
                <p>Количество: {count}</p>
                <div className="productCountButtons">
                    <button className="productCountButton productCountPlus" onClick={addProductCount}>+</button>
                    <button className="productCountButton productCountMinus" onClick={removeProductCount}>-</button>
                </div>
            </div>
            <div className="productButtons">
                <button className="productButton productBuy">Buy</button>
                <Link to={`/product/${props.id}`}>
                    <button className="productButton productGoto">Go To</button>
                </Link>
                <button className="productButton productDelete" onClick={()=>{deleteFromCart(props.id)}}>Delete</button>
            </div>
        </div>
    )
}