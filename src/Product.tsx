import { useState } from "react"

interface IProductProps {
    name: string,
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
        
        <div>
            <h1>{props.name}</h1>
            <h2>{props.price}</h2>
            <p>Amount: {amount}</p>
            <button onClick={incrementAmount}>+</button>
            <button onClick={decrementAmount}>-</button>
            <hr />
        </div>
    )
}
