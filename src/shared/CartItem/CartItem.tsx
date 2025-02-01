import { useState } from "react";
import { useCartContext } from "../../context/cartContext";
import './CartItem.css'
import { Link } from "react-router-dom";

interface ICartItemProps {
    id: number
    description: string;
    price: number;
    image: string;
    category: string
}

export function CartItem(props: ICartItemProps){
    const {id, category, description, price, image} = props
    const { deleteFromCart } = useCartContext()
    const [productCount, setProductCount] = useState<number>(1)
    return (
        <div>
            <div className="cart-item">
                <img src={image} alt=""/>
                <div className="cart-item-info">
                    <p className="description">Description: {description.slice(0,250)}...</p>
                    <p>Category: {category}</p>
                    <p>Price: {price * productCount}$</p>
                    <p>Number of items: {productCount}</p>
                    <div className="add-buttons">
                        <div onClick={()=>{setProductCount(productCount + 1)}} className="plus-button">+</div>
                        <div onClick={() => productCount > 1 && setProductCount(productCount - 1)} className="minus-button">-</div>
                    </div>
                    
                </div>
                <div className="cart-item-buttons">
                    <div className="cart-item-button">Buy</div>
                    <div className="cart-item-button"><Link to={`/product/${props.id}`}>Go to</Link></div>
                    <div onClick={()=>{deleteFromCart(id)}} className="cart-item-button delete">Delete</div>
                </div>
            </div>
            <hr className="cart-hr"/>
        </div>
    )
    
}