import { useState } from "react"
import './Product.css'
import { Link } from "react-router-dom"
import { useContext } from "react";
import { cartContext } from "../../context/cartContext";

interface IProductProps {
    id: number,
    name: string,
    img: string,
    price: number,
}

export function Product(props:IProductProps){
    const { addToCart } = useContext(cartContext); //використовуємо хук useContext
    return (
        <Link className="product" to={`/product/${props.id}`}>
            <div className="prodInfo">
                <h1>{props.name.slice(0,18)}...</h1>
                <img className="prodImg" src={props.img} alt="" id="img"/>
                <h2 className="Price">Цена: {props.price}</h2>
            </div>
            <button 
                className="buy"
                onClick={() => addToCart({ //на подію кліку ми додаємо товар до кошику за допомогою функції addToCart
                    id: props.id,
                    title: props.name,
                    image: props.img,
                    price: props.price,
                    description: "",
                    category: ""
                })}

                >Купить
            </button>
        </Link>
    )
}
