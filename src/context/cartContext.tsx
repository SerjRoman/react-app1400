import { createContext, ReactNode, useState } from "react"
import { IProduct } from "../hooks/useProducts"
import { useContext } from "react";

interface ICartContext{
    cartProducts: IProduct[]
    addToCart: (product: IProduct) => void
    deleteFromCart: (id: number) => void
    isInCart: (id: number) => boolean
    changeAmount: (id: number, symbol: string) => void
    deleteAll: () => void
}

const initialValue: ICartContext = {
    cartProducts: [], 
    addToCart: (product: IProduct) => {}, 
    deleteFromCart: (id: number) => {},
    isInCart: (id: number) => false,
    changeAmount: (id: number, symbol: string) => {},
    deleteAll: () => {},

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
        product.amount = 1
        let array = [...cartProducts, product]
        setCartProducts(array)
    }

    function deleteFromCart(id: number) {
        const filterProducts = cartProducts.filter((product)=>{
            return product.id !== id
        })
        setCartProducts(filterProducts)
    }
    function changeAmount(id: number, symbol: string) {
        const changedCart = cartProducts.map((product)=>{
            if(product.id === id){
                if (symbol === "+"){
                    product.amount += 1
                }
                if (symbol === "-"){
                    if (product.amount > 0){
                        product.amount -= 1
                    }
                    
                }
            }
            return product
        })
        setCartProducts(changedCart)
    }

    function deleteAll(){
        setCartProducts([])
    }

    function isInCart(id: number) {
        const result = cartProducts.some((product)=>{
            return product.id === id 
        });
        return result 
    }

    return(
        <cartContext.Provider 
            value={{
                cartProducts: cartProducts,
                addToCart: addToCart,
                deleteFromCart: deleteFromCart,
                isInCart: isInCart,
                changeAmount: changeAmount,
                deleteAll: deleteAll,
            }}>
                { children }
        </cartContext.Provider>
    )
}