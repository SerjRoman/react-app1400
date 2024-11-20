import { Product } from "./Product"

export function App(){
    const name = 'Diana'
    const products = [
        {id: 0, name: 'Daniel', price: -15},
        {id: 1, name: 'Daniel2', price: -30},
        {id: 2, name: 'Daniel3', price: -45},
        {id: 3, name: 'Daniel4', price: -60},
        {id: 4, name: 'Daniel4', price: -60}
    ]
    
    return(
        <div>
            <h1>Чем гуще лес скибиди доп доп ес ес</h1>
            <h1>Hello naprimer {name}</h1>
            {products.map( (product) => {
                // key - уникальный ключ используется при рендере массивов
                // нужен для идентифицирования reactом элементов которые отображаются
                    // <img src="" alt="" />
                return <Product name = {product.name} price = {product.price}></Product>
            }
            )}
            
        </div>
    )
}