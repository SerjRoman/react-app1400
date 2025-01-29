import { Layout } from "./Layout/Layout"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ProductListPage } from "../pages/ProductListPage/ProductListPage"
import { ProductPage } from "../pages/ProductPage/ProductPage"
import { MainPage } from "../pages/MainPage/MainPage"
import { createContext, useState } from "react"
import { IProduct } from "../hooks/useProducts"
import { CartPage } from "../pages/CartPage/CartPage"

interface ICartContext{
    cartProducts: IProduct[];
    addToCart: (product: IProduct) => void;
    deleteFromCart: (id: number) => void; 
}
// 
const initialValue: ICartContext = {cartProducts: [], addToCart: (product: IProduct) => {}, deleteFromCart: (id: number) => {}};
export const cartContext = createContext< ICartContext >(initialValue)

export function App(){

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
        // 😭😭😁😁 plaki plaki chinazes na verande ou yes
    return(
        <div>
            <cartContext.Provider value={{cartProducts: cartProducts, addToCart: addToCart, deleteFromCart: deleteFromCart}}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Layout></Layout>}>
                            <Route path="/" element={<MainPage></MainPage>}></Route>
                            <Route path="/products" element={<ProductListPage></ProductListPage>}></Route>
                            <Route path="/product/:id" element={<ProductPage></ProductPage>}></Route>
                            <Route path='/cart' element={<CartPage></CartPage>}></Route>
                        </Route>
                        {/* <Route path="/" element={<Layout></Layout>}> */}
                        
                        {/* </Route> */}
                        
                    </Routes>
                </BrowserRouter>
            </cartContext.Provider>
        </div>
    )
}
