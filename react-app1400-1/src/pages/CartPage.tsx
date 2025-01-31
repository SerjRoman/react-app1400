import React, { useContext } from 'react';
import { CartContext } from './CartContext';
import './CartPage.css';

const CartPage = () => {
    const { cartItems, clearCart, totalPrice, totalItems } = useContext(CartContext);

    return (
        <div className="cart-page">
            <h1>Shopping Cart</h1>
            <button onClick={clearCart}>Delete All</button>
            <div>Total Items: {totalItems}</div>
            <div>Total Price: ${totalPrice.toFixed(2)}</div>
            <ul>
                {cartItems.map(item => (
                    <li key={item.id}>
                        {item.name} - ${item.price} x {item.quantity}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CartPage;
