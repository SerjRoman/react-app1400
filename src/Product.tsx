import { useState } from "react"
import './Product.css'

interface IProductProps {
    name: string,
    img: string,
    price: number,
}

export function Product(props:IProductProps){
    const [amount, setAmount] = useState(1)
    function incrementAmount() {
        setAmount(amount+1)
    }
    function decrementAmount() {
        if(amount > 1) {
        setAmount(amount-1)
    }
    }
    return (
        <div className="product">
            <h1>{props.name}</h1>
            <img src={props.img} alt="" id="img"/>
            <h2 className="Price">Цена</h2>
            <button className="buy">Купить</button>
        </div>
    )
}
