import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "../shared/Layout/Layout";
import { MainPage } from "../pages/MainPage/MainPage";
import { CartPage } from "../pages/CartPage/CartPage";
import { ProductPage } from "../pages/ProductPage/ProductPage";
import { ProductListPage } from "../pages/ProductListPage/ProductListPage";


export function AppRoutes(){
    return (
    <BrowserRouter>
       <Routes>
           <Route path="/" element={<Layout></Layout>}>
               <Route path="/" element={<MainPage></MainPage>}></Route>
               <Route path="/products" element={<ProductListPage></ProductListPage>}></Route>
               <Route path="/product/:id" element={<ProductPage></ProductPage>}></Route>
               <Route path='/cart' element={<CartPage></CartPage>}></Route>
           </Route>
       </Routes>
    </BrowserRouter>)
}