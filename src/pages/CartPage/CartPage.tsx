import { useContext } from "react";
import { cartContext } from "../../shared/App";

// (●'◡'●)
export function CartPage(){
    const {cartProducts, deleteFromCart} = useContext(cartContext)
    return (<div>
        {cartProducts.map(product =>{
            return <div>
                <h1>{product.title}</h1>
                <p>{product.description}</p>
                <p>{product.price}</p>
                <img src={product.image} alt="" />
                <button onClick={()=>{deleteFromCart(product.id)}}>Delete</button>
            </div>
        })}
    </div>)
}