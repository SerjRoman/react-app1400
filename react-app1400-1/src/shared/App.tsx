import { Layout } from "./Layout/Layout"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ProductListPage } from "../pages/ProductListPage/ProductListPage"
import { ProductPage } from "../pages/ProductPage/ProductPage"
import { MainPage } from "../pages/MainPage/MainPage"


export function App(){
    return(
        <div>
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
        </div>
    )
}