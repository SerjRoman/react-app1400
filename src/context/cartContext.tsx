import { createContext, ReactNode, useState } from "react"
import { IProduct } from "../hooks/useProducts"
import { useContext } from "react";

interface ICartContext{
    cartProducts: IProduct[];
    addToCart: (product: IProduct) => void;
    deleteFromCart: (id: number) => void; 
    isInCart: (id: number) => boolean;
    deleteAllFromCart: () => void;
}

const initialValue: ICartContext = {
    cartProducts: [], 
    addToCart: (product: IProduct) => {}, 
    deleteFromCart: (id: number) => {},
    isInCart: (id: number) => false,
    deleteAllFromCart: () => {},
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

    function deleteAllFromCart() {
        setCartProducts([])
    }
    // function incrementAmount(){
    //     setAmount(amount+1)
    // }

    // function decrementAmount() {
    //     if(amount > 1) {
    //     setAmount(amount-1)
    // }

    return(
        <cartContext.Provider 
            value={{
                cartProducts: cartProducts,
                addToCart: addToCart,
                deleteFromCart: deleteFromCart,
                isInCart: isInCart,
                deleteAllFromCart: deleteAllFromCart,
                // incrementAmount: incrementAmount,

            }}>
                { children }
        </cartContext.Provider>
    )
}