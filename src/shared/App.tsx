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
    removeFromCart: (id: number) => void; 
}

const initialValue: ICartContext = {
    cartProducts: [], 
    addToCart: (product: IProduct) => {},
    removeFromCart: () => {} 
    }

export const cartContext = createContext< ICartContext >(initialValue) //експортуємо контекст нашого кошика 

export function App(){
    const [cartProducts, setCartProducts] = useState<IProduct[]>([])

    function addToCart(product: IProduct){
        cartProducts.push()
        let updatedCart = [...cartProducts, product]
        setCartProducts(updatedCart)
    }
    //для видалення товару із кошика ми просто прибираємо значення id, за рахунок чого ми його і видаляємо, бо id це база 🍉 на якій все тримається 
    function removeFromCart(id: number) { //створюємо функцію removeFromCart, яка приймає id із типом number
        const updatedCart = cartProducts.filter((product) => product.id !== id); //створюємо константу updatedCart, яка приймає масив cartProducts і використовуємо метод filter, який приймає в себе параметр product і якщо ми знаходимо product, то беремо його id  і порівнюємо його із id, який ми прийняли на початку
        setCartProducts(updatedCart); //даємо setCartProduct значення updatedCart
    }

    return(
        <div>
            <cartContext.Provider 
            value={{
                    cartProducts: cartProducts, 
                    addToCart: addToCart, 
                    removeFromCart: removeFromCart
                }}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Layout></Layout>}>
                            <Route path="/" element={<MainPage></MainPage>}></Route>
                            <Route path="/products" element={<ProductListPage></ProductListPage>}></Route>
                            <Route path="/product/:id" element={<ProductPage></ProductPage>}></Route>
                            <Route path="/cart" element={<CartPage></CartPage>}></Route> {/* створюємо маршрут /cart за яким у нас буде відображатися сторінка CartPage */}
                        </Route>
                    </Routes>
                </BrowserRouter>
            </cartContext.Provider>
        </div>
    )
}