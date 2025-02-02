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
        <div className="CartPage">
            <div className="CartProducts">
                {cartProducts.map(product =>{
                    return (
                        <div className="CartProduct">
                            <img className="CartProductImg" src={product.image} alt="" />
                            <div className="CartProductInfo">
                                <p>Опис: <b>{product.description}</b></p>
                                <p>Категорія: <b>{product.category}</b></p>
                                <p>Ціна: <b>{product.price}</b></p>
                                <p>Кількість: <b>{product.amount}</b></p>
                                <div className="AmountChangeButtons">
                                    <button onClick={() => changeAmount(product.id, "+")} className="PlusMinusButtons"><img src="https://w7.pngwing.com/pngs/100/522/png-transparent-computer-icons-plus-and-minus-signs-symbol-plus-miscellaneous-cross-sign-thumbnail.png" alt="" className="PlusMinusImg"/></button>
                                    <button onClick={() => changeAmount(product.id, "-")} className="PlusMinusButtons"><img src="https://cdn-icons-png.flaticon.com/512/1828/1828901.png" alt="" className="PlusMinusImg"/></button>
                                </div>
                            </div>
                            <div className="CartButtons">
                                <button className="CartButton" >Купити</button>
                                <button className="CartButton" style={{color: "red"}} onClick={()=>{deleteFromCart(product.id)}}>Видалити</button>
                            </div>
                        </div>
                    )
                })}
                
            </div>
            <div className="CartBottom">
                <p className="FinalPrice">Загальна ціна: {finalPrice}$</p>
                <button style={{color: "red"}} className="CartButton" onClick={() => {deleteAll()}}>Видалити все</button>
            </div>
        </div>
    )
}
