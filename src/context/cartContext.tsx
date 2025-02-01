import { createContext, ReactNode, useState } from "react"
import { IProduct } from "../hooks/useProducts"
import { useContext } from "react";

interface ICartContext{
    cartProducts: IProduct[];
    addToCart: (product: IProduct) => void;
    deleteFromCart: (id: number) => void; 
    isInCart: (id: number) => boolean;
    clearCart: () => void;
    totalPriceCounter: () => void;
    totalPrice: number
}

const initialValue: ICartContext = {
    cartProducts: [], 
    addToCart: (product: IProduct) => {}, 
    deleteFromCart: (id: number) => {},
    isInCart: (id: number) => false,
    clearCart: () => {},
    totalPriceCounter: () => {},
    totalPrice: 0
};

export const cartContext = createContext< ICartContext >(initialValue)

export function useCartContext() {
    return useContext(cartContext)
}



interface ICartContextProviderProps{
    children: ReactNode
}

export function CartContextProvider(props: ICartContextProviderProps) {
    const { children } = props
    const [cartProducts, setCartProducts] = useState<IProduct[]>([])
    const [totalPrice, setTotalPrice] = useState<number>(0)

    function addToCart(product: IProduct){
        let array = [...cartProducts, product]
        setCartProducts(array)
    }

    function deleteFromCart(id: number) {
        const filterProducts = cartProducts.filter((product)=>{
            return product.id !== id
        })
        setCartProducts(filterProducts)
    }

    function isInCart(id: number) {
        // id = 4
        // [{id: 1}, {id: 2}, {id: 3},{id: 4}]
        // {id: 1} -> 1 !== 4 -> true
        // {id: 2} -> 2 !== 4 -> true
        // {id: 3} -> 3 !== 4 -> true
        // {id: 4} -> 4 !== 4 -> false
        const result = cartProducts.some((product)=>{
            return product.id === id 
        });
        return result //😲
    }

    function totalPriceCounter() {
        const allPrices = cartProducts.map((product)=> product.price)
        const sumPrice = allPrices.reduce((sum, product)=> {return sum + product}, totalPrice)
        setTotalPrice(sumPrice)
    }

    function clearCart(){
        setCartProducts([])
    }

    return(
        <cartContext.Provider 
            value={{
                cartProducts: cartProducts,
                addToCart: addToCart,
                deleteFromCart: deleteFromCart,
                isInCart: isInCart,
                clearCart: clearCart,
                totalPriceCounter: totalPriceCounter,
                totalPrice: totalPrice
            }}>
                { children }
        </cartContext.Provider>
    )
}