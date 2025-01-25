import { Layout } from "./Layout/Layout"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ProductListPage } from "../pages/ProductListPage/ProductListPage"
import { ProductPage } from "../pages/ProductPage/ProductPage"
import { MainPage } from "../pages/MainPage/MainPage"
import { createContext, useState } from "react"
import { IProduct } from "../hooks/useProducts"

export interface ICartContext{
    cartProducts: IProduct[];
    // cartProducts: string
    addToCart: (product: IProduct) => void
}

const initialValue: ICartContext = {cartProducts: [], addToCart: (product: IProduct ) => {}}
export const cartContext = createContext< ICartContext >(initialValue)

export function App(){

    const [cartProducts, setCartProducts] = useState<IProduct[]>([])

    function checkProduct(product: IProduct , currentProduct: IProduct){
        if (product.id === currentProduct.id){
            alert('Товар вже додано до у корзину')
        }else{
            return
        }
    }

    function addToCart(product: IProduct ){
        cartProducts.push()// -> [все старые эелменты, новый]

        cartProducts.filter((prod) => checkProduct(prod, product)  )
            // alert(product.id)
        // cartProducts.filter((prod) => prod === product)
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
