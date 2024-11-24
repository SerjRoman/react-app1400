import { Product } from "./Product"

export function ProductsList(){
    const products = [
        {id: 0, name: 'Daniel', price: -15},
        {id: 1, name: 'Daniel2', price: -30},
        {id: 2, name: 'Daniel3', price: -45},
        {id: 3, name: 'Daniel4', price: -60},
        {id: 4, name: 'Daniel4', price: -60}
    ]
    return <div>
            {products.map( (product) => {
                // key - уникальный ключ используется при рендере массивов
                // нужен для идентифицирования reactом элементов которые отображаются
                    // <img src="" alt="" />
                
                return <Product key = {product.id} name = {product.name} price = {product.price}></Product>
            }
            )}
    </div>
}