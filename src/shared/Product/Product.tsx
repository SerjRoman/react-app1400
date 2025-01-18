import { useState } from "react"
import './Product.css'
import { Link } from "react-router-dom"

export interface IProductProps {
    id: number,
    name: string,
    img: string,
    price: number,
}

export function Product(props:IProductProps){
    // String.prototype.slice(1, 50)
    return (
        <Link className="product" to={`/product/${props.id}`}>
            <div className="prodInfo">
                <h1>{props.name.slice(0,18)}...</h1>
                <img className="prodImg" src={props.img} alt="" id="img"/>
                <h2 className="Price">Цена: {props.price}</h2>
            </div>
            <button className="buy">Купить</button>
        </Link>
    )
}
