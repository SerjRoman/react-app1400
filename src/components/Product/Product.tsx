import { useState } from "react"
import './Product.css'
import { Link } from "react-router-dom"

interface IProductProps {
    id: number,
    name: string,
    img: string,
    price: number,
}

export function Product(props:IProductProps){
    return (
        <div className="product">
        <Link to={`/product/${props.id}`}>
            <div className="prodInfo">
                <h1>{props.name}</h1>
                <img className="prodImg" src={props.img} alt="" id="img"/>
                <h2 className="Price">Цена: {props.price}</h2>
            </div>
            <button className="buy">Купить</button>
        </Link>
            
        </div>
    )
}
