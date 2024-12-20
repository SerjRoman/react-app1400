import { ProductsList } from "./ProductsList/ProductsList"
import { Layout } from "./Layout/Layout"
import { Header } from "./Header/Header"
import { Main} from './Main/Main'
import { Footer } from "./Footer/Footer"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ProductPage } from "./ProductPage/ProductPage"


export function App(){
    return(
        <div>
            <BrowserRouter>
                <Routes>

                    <Route path="/" element={<Layout></Layout>}>
                        <Route path="/products" element={<ProductsList></ProductsList>}></Route>
                        <Route path="/product/:id" element={<ProductPage></ProductPage>}></Route>
                    </Route>
                    {/* <Route path="/" element={<Layout></Layout>}> */}

                    {/* </Route> */}
                    
                </Routes>
            </BrowserRouter>
        </div>
    )
}