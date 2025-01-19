import { Layout } from "./Layout/Layout"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ProductListPage } from "../pages/ProductListPage/ProductListPage"
import { ProductPage } from "../pages/ProductPage/ProductPage"
import { MainPage } from "../pages/MainPage/MainPage"
import { createContext } from "react"

interface ICartItem{
    name: string;
    price: number
    // addItem: () =>
}

const initialValue: ICartItem[] = []
const cartContext = createContext< ICartItem[] >(initialValue)

export function App(){
    return(
        <div>
            <cartContext.Provider value={[{name:"product1",price:1423}]}>
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