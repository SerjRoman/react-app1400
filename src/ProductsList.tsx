import { Product } from "./Product"
import './ProductList.css'

export function ProductsList(){
    const products = [
        {id: 0, name: 'Daniel', img: 'https://th-thumbnailer.cdn-si-edu.com/faJoWtc8qjIHuCadMQ2MKjt6xmo=/1000x750/filters:no_upscale()/https://tf-cmsv2-smithsonianmag-media.s3.amazonaws.com/filer/6a/fa/6afa4efa-3f5a-4ea7-90ea-e47173217d59/42-29316901.jpg', price: -15},
        {id: 1, name: 'Ilia Bulkin', img: 'https://s7d2.scene7.com/is/image/TWCNews/AP21286725279031_crop?wid=767&hei=431&$wide-bg$', price: -30},
        {id: 2, name: 'Vanya', img: 'https://www.thewildlifediaries.com/wp-content/uploads/2018/11/Snapseed-1-768x512.jpg', price: -45},
        {id: 3, name: 'Фатуев Михайло', img: 'https://www.thewildlifediaries.com/wp-content/uploads/2018/04/Siberian-tiger-768x512.jpg', price: 52},
        {id: 4, name: 'Daniel4', img: 'https://www.thewildlifediaries.com/wp-content/uploads/2020/01/leopard-walking-768x512.jpg', price: -60}
    ]
    return <div className="product-list">
            {products.map( (product) => {
                // key - уникальный ключ используется при рендере массивов
                // нужен для идентифицирования reactом элементов которые отображаются
                    // <img src="" alt="" />
                
                return <Product key = {product.id} name = {product.name} price = {product.price} img = {product.img}></Product>
            }
            )}
    </div>
}