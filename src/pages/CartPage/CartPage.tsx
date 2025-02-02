import { useContext, useEffect, useState } from "react";
import { cartContext } from "../../context/cartContext";
import './CartPage.css';
import { IProduct } from "../../hooks/useProducts";
import { Link } from "react-router-dom";


// (●'◡'●)
export function CartPage(){
    const {cartProducts, totalPrice, deleteFromCart, deleteAllItems, deleteFirstElementFromCart, addToCart, numberOfItemsInCart, calcTotalPrice} = useContext(cartContext)
    const [products, setProducts] = useState(cartProducts);
    
    console.log(cartProducts);

    function addItem(product: IProduct){
        addToCart(product);
    }

    function removeItem(id: number){
        deleteFirstElementFromCart(id);
    }



    useEffect(() => {
        setProducts(cartProducts);
        calcTotalPrice();
    }, [cartProducts])

    return (<div className="cart-div">
        <h1 className="cart-h1">Cart</h1>
        <div className="products-in-cart">

            {products.map((product) => {
                return <div className="product-in-cart">
                    <img className="product-in-cart-img" src={product.image} alt="" />
                    <div className="cart-item-text">
                        <h2>Title: {product.title}</h2>
                        <p>Description: {product.description}</p>
                        <p>Category: {product.category}</p>
                        <p>Price: {product.price}$</p>
                        <p>Number of items: {numberOfItemsInCart(product.id)}</p>
                        <div className="amount-buttons">
                            <button onClick={() => {addItem(product)}} className="amount-button add-item-button">+</button>
                            <button onClick={() => {removeItem(product.id); numberOfItemsInCart(product.id)}} className="amount-button remove-item-button">-</button>
                        </div>
                    </div>
                    <div className="cart-item-buttons">
                        <button className="buy-button">Buy</button>
                        <Link to = {`/product/${product.id}`}>
                            <button className="go-to-button">Go To</button>
                        </Link>
                        <button className="delete-button" onClick={()=>{deleteFromCart(product.id); numberOfItemsInCart(product.id)}}>Delete</button>
                    </div>
                </div>
            })}
        </div>
        <div className="total-price">
            <h3>Total price: {totalPrice}$</h3>
            <button className="buy-button">Buy</button>
            <button className="delete-button" onClick={()=>{deleteAllItems()}}>Delete All</button>
        </div>
    </div>)
}