import { Layout } from "./Layout/Layout"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ProductListPage } from "../pages/ProductListPage/ProductListPage"
import { ProductPage } from "../pages/ProductPage/ProductPage"
import { MainPage } from "../pages/MainPage/MainPage"
import { createContext, useState } from "react"
import { IProduct } from "../hooks/useProducts"

interface ICartContext{
    cartProducts: IProduct[];
    addToCart: (product: IProduct) => void
}

const initialValue: ICartContext = {cartProducts: [], addToCart: (product: IProduct) => {}}
const cartContext = createContext< ICartContext >(initialValue)

export function App(){

    const [cartProducts, setCartProducts] = useState<IProduct[]>([])

    function addToCart(product: IProduct){
        cartProducts.push()// -> [все старые эелменты, новый]
        let array = [...cartProducts, product]
        setCartProducts(array)
    }

    return(
        <div>
            <cartContext.Provider value={{cartProducts: cartProducts, addToCart: addToCart}}>
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
