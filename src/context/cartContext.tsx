import { createContext, ReactNode, useState } from "react"
import { IProduct } from "../hooks/useProducts"
import { useContext } from "react";

interface IProductCart{
    id: number,
    title: string,
    description: string,
    price: number,
    image: string,
    category: string,
    amount: number
}


interface ICartContext{
    cartProducts: IProductCart[];
    addToCart: (product: IProduct) => void;
    deleteFromCart: (id: number) => void;
    deleteAllProducts: () => void;

    decreaseAmount: (product: IProduct) => void;
    increaseAmount: (product: IProduct) => void;
    countTotalPrice: () => number,

    isInCart: (id: number) => boolean;
    
}

const initialValue: ICartContext = {
    cartProducts: [], 
    addToCart: (product: IProduct) => {}, 
    deleteFromCart: (id: number) => {},
    deleteAllProducts: () => {},
    decreaseAmount: (product: IProduct) => {},
    increaseAmount: (product: IProduct) => {},
    countTotalPrice: () => 0,
    isInCart: (id: number) => false,
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
    const [cartProducts, setCartProducts] = useState<IProductCart[]>([])

    function addToCart(product: IProduct){
        console.log("TRUE")
        if (!cartProducts.some(cartProduct => cartProduct.id === product.id)){
            console.log('asdokasodkasodklas')
            let productWithAmount = {...product, amount: 1}
            let array = [...cartProducts, productWithAmount]
            setCartProducts(array)
        } else {
            let updatedCartProducts = cartProducts.map(cartProduct => 
                cartProduct.id === product.id ? {...cartProduct, amount: cartProduct.amount + 1} : cartProduct
            )
            console.log(updatedCartProducts)
            setCartProducts(updatedCartProducts)
        }
    }

    function increaseAmount(product: IProduct){
        let increasedArray = cartProducts.map((cartProduct) => {
            return cartProduct.id === product.id
            ? {...cartProduct, amount: cartProduct.amount + 1}
            : cartProduct
        })
        setCartProducts(increasedArray)
    }

    function decreaseAmount(product: IProduct){
        let decreasedArray = cartProducts.map((cartProduct) => {
            return cartProduct.id === product.id
            ? {...cartProduct, amount: cartProduct.amount - 1}
                
            : cartProduct
        }).filter(cartProduct => cartProduct.amount !== 0)
        setCartProducts(decreasedArray)
    }

    function deleteFromCart(id: number) {
        const filterProducts = cartProducts.filter((product)=>{
            return product.id !== id
        })
        setCartProducts(filterProducts)
    }

    function deleteAllProducts() {
        setCartProducts([])
    }

    function countTotalPrice() {
        let newArray = cartProducts.map((cartProduct) => {
            return cartProduct.price * cartProduct.amount
        })
        let sum: number = 0
        newArray.forEach((price) => {
            sum += price
        })
        return sum
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

    return(
        <cartContext.Provider 
            value={{
                cartProducts: cartProducts,
                addToCart: addToCart,
                deleteFromCart: deleteFromCart,
                deleteAllProducts: deleteAllProducts,
                decreaseAmount: decreaseAmount,
                increaseAmount: increaseAmount,
                countTotalPrice: countTotalPrice,
                isInCart: isInCart
            }}>
                { children }
        </cartContext.Provider>
    )
}