import { useContext, useEffect, useState } from "react";
import { cartContext } from "../../context/cartContext";

import "./CartPage.css"
import { Link } from "react-router-dom";

export function CartPage(){
    const {cartProducts, deleteFromCart, changeAmount, deleteAll} = useContext(cartContext)
    const [finalPrice, setFinalPrice] = useState<number>(0)

    useEffect(() => {
        let sum = cartProducts.reduce((sum, product) => sum += product.price * product.amount, 0);
        setFinalPrice(sum)
    }, [cartProducts])


    return (
        <div className="cartPage">
            <h1>Cart</h1>
            <div className="cartProducts">
                {cartProducts.map(product =>{
                    return (
                        <div className="cartProduct">
                            <img className="cartProductImg" src={product.image} alt="" />
                            <div className="cartProductInfo">
                                <p>Description:{product.description}</p>
                                <p>Category:{product.category}</p>
                                <p>Price:{product.price}</p>
                                <p>Number of items:{product.amount}</p>
                                <div className="changeAmountButs">
                                    <button onClick={() => changeAmount(product.id, "+")} className="plusMinusButs"><img src="/static/image/plus.png" alt="" className="plusMinusImg"/></button>
                                    <button onClick={() => changeAmount(product.id, "-")} className="plusMinusButs"><img src="/static/image/minus.png" alt="" className="plusMinusImg"/></button>
                                </div>
                            </div>
                            <div className="cartButs">
                                <button className="cartBut" >Buy</button>
                                <Link to={`/product/${product.id}`}>
                                    <button className="cartBut" >Go To</button>
                                </Link>
                                <button className="cartBut" style={{color: "red"}} onClick={()=>{deleteFromCart(product.id)}}>Delete</button>
                            </div>
            
                        </div>
                        
                    )
                })}
                
            </div>
            <div className="cartBottom">
                <p className="finalPrice">Total Price: {finalPrice} $$$</p>
                <button className="cartBut">Buy All</button>
                <button style={{color: "red"}} className="cartBut" onClick={() => {deleteAll()}}>Delete All</button>
            </div>
        </div>
    )
}