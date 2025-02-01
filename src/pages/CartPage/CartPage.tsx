import { useContext, useEffect } from "react";
import { cartContext } from "../../context/cartContext";
import './CartPage.css'


// (●'◡'●)
export function CartPage(){
    const {cartProducts, deleteFromCart, clearCart, totalPrice, totalPriceFunc} = useContext(cartContext)

    useEffect(() => {totalPriceFunc()},
    [])

    // useEffect(() => {totalPriceFunc()},[totalPrice])

    return (<div className="CartPage">
        <h1>Cart</h1>
        <div className="AllCartItems">  
            {cartProducts.map(product =>{
                return <div className="CartItem">
                    <img src={product.image} alt="" className="CartItemImg"/>
                    <div className="CartItemText">
                        <p>{product.description}</p>
                        <p>{product.category}</p>
                        {/* <h1>{product.title}</h1> */}
                        <p>{product.price}</p>
                        <p>Number of items: 1</p>
                        <div className="CountButtons">
                            <button className="Plus">+</button>
                            <button className="Minus">-</button>
                        </div>
                    </div>
                    <div className="CartItemButtons">
                        <button>Buy</button>
                        <button>Go To</button>
                        <button onClick={()=>{deleteFromCart(product.id)}} className="DeleteButton">Delete</button>
                    </div>
                </div>
            })}
        </div>
        <div className="TotalCart">
            <p className="TotalPrice">Total price:  {totalPrice}$</p>
            <button className="BuyAll">Buy All</button>
            <button className="DeleteAll" onClick={()=>{clearCart()}}>Delete All</button>
        </div>
    </div>)
}