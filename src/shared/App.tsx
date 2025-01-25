import { Layout } from "./Layout/Layout"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ProductListPage } from "../pages/ProductListPage/ProductListPage"
import { ProductPage } from "../pages/ProductPage/ProductPage"
import { MainPage } from "../pages/MainPage/MainPage"
import { createContext, useState } from "react"
import { IProduct } from "../hooks/useProducts"

export interface ICartContext{
    cartProducts: IProduct[];

    isInCart: (product: IProduct) => boolean

    addToCart: (product: IProduct) => void
}

const initialValue: ICartContext = {cartProducts: [], isInCart: (product: IProduct ) => false, addToCart: (product: IProduct ) => {},}
export const cartContext = createContext< ICartContext >(initialValue)

export function App(){
    const [cartProducts, setCartProducts] = useState<IProduct[]>([])

    function isInCart(product: IProduct){
        if (cartProducts.includes(product)){
            return true
        }else{
            return false
        }
    }

    function addToCart(product: IProduct ){
        const isInCartResult = isInCart(product)
        if (isInCartResult === false){
            let array = [...cartProducts, product]
            setCartProducts(array)
        }
        else{
            return
        }

        

        // let array = [...cartProducts, product]
        // setCartProducts(array)
    }

    return(
        <div>
            <cartContext.Provider value={{cartProducts: cartProducts, addToCart: addToCart, isInCart:isInCart}}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Layout></Layout>}>
                            <Route path="/" element={<MainPage></MainPage>}></Route>
                            <Route path="/products" element={<ProductListPage></ProductListPage>}></Route>
                            <Route path="/product/:id" element={<ProductPage></ProductPage>}></Route>
                        </Route>
                        {/* <Route path="/" element={<Layout></Layout>}> */}
                        
                        {/* </Route> */}
                        
                    </Routes>
                </BrowserRouter>
            </cartContext.Provider>
        </div>
    )
}
