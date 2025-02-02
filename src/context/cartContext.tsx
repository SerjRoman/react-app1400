import { createContext, ReactNode, useEffect, useState } from "react"
import { IProduct } from "../hooks/useProducts"
import { useContext } from "react";

interface ICartContext{
    cartProducts: IProduct[];
    totalPrice: number;
    addToCart: (product: IProduct) => void;
    deleteFromCart: (id: number) => void; 
    deleteFirstElementFromCart: (id: number) => void;
    isInCart: (id: number) => boolean;
    numberOfItemsInCart: (id: number) => number;
    calcTotalPrice: () => void,
    deleteAllItems: () => void,
}

const initialValue: ICartContext = {
    cartProducts: [], 
    totalPrice: 0,
    addToCart: (product: IProduct) => {}, 
    deleteFromCart: (id: number) => {},
    deleteFirstElementFromCart: (id: number) => {},
    isInCart: (id: number) => false,
    numberOfItemsInCart: (id: number) => 1,
    calcTotalPrice: () => {},
    deleteAllItems: () => {},
};

export const cartContext = createContext< ICartContext >(initialValue)

export function useCartContext() {
    return useContext(cartContext)
}

interface ICartContextProviderProps{
    children: ReactNode
}

export function CartContextProvider(props: ICartContextProviderProps) {
    const { children } = props;
    const [ cartProducts, setCartProducts ] = useState<IProduct[]>([]);
    const [ totalPrice, setTotalPrice ] = useState(0);

    useEffect(() => console.log(12354), [cartProducts])

    function addToCart(product: IProduct){
        let array = [...cartProducts, product]
        setCartProducts(array)
    }

    function deleteFirstElementFromCart(id: number){
        const filterProducts = cartProducts;
        
        console.log(filterProducts);
    
        for (let product of filterProducts){
            if ( product.id === id){
                const index = filterProducts.indexOf(product);
                filterProducts.splice(index, 1);
                break;
            }
        }
        setCartProducts(filterProducts);    
    }

    function deleteFromCart(id: number) {
        // console.log(filterProducts);

        const filterProducts = cartProducts.filter((product)=>{
            return product.id !== id;
        })

        setCartProducts(filterProducts);
        // console.log(cartProducts);
    }

    function isInCart(id: number) {
        // id = 4
        // [{id: 1}, {id: 2}, {id: 3},{id: 4}]
        // {id: 1} -> 1 !== 4 -> true
        // {id: 2} -> 2 !== 4 -> true
        // {id: 3} -> 3 !== 4 -> true
        // {id: 4} -> 4 !== 4 -> false
        const result = cartProducts.some((product)=>{
            return product.id === id; 
        });
        return result //😲
    }

    function numberOfItemsInCart(id: number){
        const result = cartProducts.filter((product) => {
            return product.id === id;
        })
        return result.length;
    }

    function calcTotalPrice(){
        let total = 0;
        for (let product of cartProducts){
            total += product.price;
        }
        setTotalPrice(total);
    }

    function deleteAllItems(){
        setCartProducts([]);
    }

    return(
        <cartContext.Provider 
            value={{
                cartProducts: cartProducts,
                totalPrice: totalPrice,
                addToCart: addToCart,
                deleteFromCart: deleteFromCart,
                deleteFirstElementFromCart: deleteFirstElementFromCart,
                isInCart: isInCart,
                numberOfItemsInCart: numberOfItemsInCart,
                calcTotalPrice: calcTotalPrice,
                deleteAllItems: deleteAllItems
            }}>
            { children }
        </cartContext.Provider>
    )
}