import React, { createContext, useState, ReactNode } from 'react';

interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
}

interface CartContextProps {
    cartItems: CartItem[];
    clearCart: () => void;
    totalPrice: number;
    totalItems: number;
}

export const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    const clearCart = () => {
        setCartItems([]);
    };

    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

    return (
        <CartContext.Provider value={{ cartItems, clearCart, totalPrice, totalItems }}>
            {children}
        </CartContext.Provider>
    );
};
