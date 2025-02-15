import { useContext } from "react";
import { cartContext } from "../../context/cartContext";
import "./CartPage.css"
import { Link } from "react-router-dom";

// (●'◡'●)
export function CartPage(){
    const {cartProducts, deleteFromCart, decreaseAmount, increaseAmount, deleteAllProducts, countTotalPrice} = useContext(cartContext)
    return (
    <div id="cartContainer">
        <div id="cartTitleContainer">
            <h1 id="cartTitle">Cart</h1>
        </div>

        <div id="cartProducts">
            {cartProducts.map(product =>{
                return <div className="productCardInCart">
                    <img className="productImageInCart" src={product.image} alt="" />
                    <div className="productCard">
                        <h2>{product.title}</h2>
                        <p>Description: {product.description}</p>
                        <p>Amount: {product.amount}</p>
                        <p>Price: {product.price * product.amount}</p>
                        <div className="countButtonsContainer">
                            <button id="increaseAmountCart" onClick={() => {increaseAmount(product)}}>+</button>
                            <button id="decreaseAmountCart" onClick={() => {decreaseAmount(product)}}>-</button>
                        </div>
                        
                    </div>
                    
                    
                    <div id="productCartButtons">
                        <button className="buttonOfProductInCart">Buy</button>
                        <button className="buttonOfProductInCart"><Link id="linkToProductFromCart" to={`/product/${product.id}`}>Go To</Link></button>
                        <button className="buttonOfProductInCart" id="deleteProductFromCart" onClick={()=>{deleteFromCart(product.id)}}>Delete</button>
                    </div>
                    

                </div>
            })}
        </div>
        

        <div id="fixedMenuCart">
            <h2>Total price: {countTotalPrice()}</h2>
            <button className="buttonOfProductInCart">Buy all</button>
            <button id="deleteProductFromCart" className="buttonOfProductInCart" onClick={()=>{deleteAllProducts()}}>Delete all</button>

        </div>
    </div>
    )
}