import { ProductsList } from "./ProductsList"
import { Layout } from "./Layout"
import { Footer } from "./Footer"

export function App(){
    const name = 'Diana'
    return(
        <div>
            <Layout>
                <h1>Чем гуще лес скибиди доп доп ес ес</h1>
                <h1>Hello naprimer {name}</h1>
        
                <ProductsList></ProductsList>      
            </Layout>
            <Footer></Footer>
        </div>
    )
}