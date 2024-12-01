import { ProductsList } from "./ProductsList/ProductsList"
import { Layout } from "./Layout/Layout"
import { Header } from "./Header/Header"
import { Footer } from "./Footer/Footer"

export function App(){
    return(
        <div>
            <Layout>
                <Header></Header>
                <ProductsList></ProductsList>
                <Footer></Footer>
            </Layout>
        </div>
    )
}