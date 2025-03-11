import { createContext, ReactNode, useState, useContext } from "react"
import { IProduct } from "../hooks/useProducts"

interface ICartContext{
    cartProducts: IProduct[];
    addToCart: (product: IProduct) => void;
    deleteFromCart: (id: number) => void; 
    isInCart: (id: number) => boolean;
    plus: (id: number) => void;
    minus: (id: number) => void;
    deleteAll: () => void;
}

const initialValue: ICartContext = {
    cartProducts: [], 
    addToCart: (product: IProduct) => {}, 
    deleteFromCart: (id: number) => {},
    isInCart: (id: number) => false,
    plus: (id: number) => {},
    minus: (id: number) => {},
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

    function plus(id: number) {
        const newCartProducts = cartProducts.map((product)=>{
            if(product.id === id){
                product.amount += 1
                // product.price += product.price
            }
            return product
        })
        setCartProducts(newCartProducts)
    }

    function minus(id: number) {
        const newCartProducts = cartProducts.map((product)=>{
            if(product.id === id){
                product.amount -= 1
                // product.price -= product.price
                if(product.amount < 1){
                    product.amount = 1
                }
            }
            return product
        })
        setCartProducts(newCartProducts)
    }

    function deleteAll(){
        setCartProducts([])
    }

    function isInCart(id: number) {
        const result = cartProducts.some((product)=>{
            return product.id === id 
        });
        return result //😲
    }

    return(
        <cartContext.Provider 
            value={{
                cartProducts: cartProducts,
                addToCart: addToCart,
                deleteFromCart: deleteFromCart,
                isInCart: isInCart,
                plus: plus,
                minus: minus,
                deleteAll: deleteAll
            }}>
                { children }
        </cartContext.Provider>
    )
}