import { useEffect, useState } from "react"
import { Product } from "../Product/Product"
import './ProductsList.css'

const products = [
    {id: 0, category: 'Chat-Bot', name: 'Daniel', image: 'https://th-thumbnailer.cdn-si-edu.com/faJoWtc8qjIHuCadMQ2MKjt6xmo=/1000x750/filters:no_upscale()/https://tf-cmsv2-smithsonianmag-media.s3.amazonaws.com/filer/6a/fa/6afa4efa-3f5a-4ea7-90ea-e47173217d59/42-29316901.jpg', price: -15},
    {id: 1, category: 'Floppa', name: 'Ilia Bulkin', image: 'https://s7d2.scene7.com/is/image/TWCNews/AP21286725279031_crop?wid=767&hei=431&$wide-bg$', price: -30},
    {id: 2, category: 'Cats', name: 'Vanya', image: 'https://www.thewildlifediaries.com/wp-content/uploads/2018/11/Snapseed-1-768x512.jpg', price: -45},
    {id: 3, category: 'Cats', name: 'Фатуев Михайло', image: 'https://www.thewildlifediaries.com/wp-content/uploads/2018/04/Siberian-tiger-768x512.jpg', price: 52},
    {id: 4, category: 'Chat-Bot', name: 'Daniel4', image: 'https://www.thewildlifediaries.com/wp-content/uploads/2020/01/leopard-walking-768x512.jpg', price: -60}
]

export function ProductsList(){
    const [filteredProducts, setFilteredProducts] = useState(products)
    const [selectedCategory, setSelectedCategory] = useState('All')

    useEffect(()=>{
        if(selectedCategory === 'All'){
            setFilteredProducts(products)
        } else{
            setFilteredProducts(products.filter( (product)=>{
                return product.category === selectedCategory
            }))
        }
        console.log(selectedCategory)
    }, [selectedCategory])

    useEffect(()=>{
        async function getProducts(){
            const response = await fetch('https://fakestoreapi.com/products')
            const products = await response.json()
            setFilteredProducts(products)
        }
        getProducts()
    },[])

    return <div className="product-list">
        <select onChange={(event)=>{
            setSelectedCategory(event.target.value)
        }
        }>
            <option value = 'All'>All</option>
            <option value = 'Floppa'>Floppa</option>
            <option value = 'Chat-Bot'>Chat-Bot</option>
            <option value = 'Cats'>Cats</option>
        </select>
            {filteredProducts.map( (product) => {
                // key - уникальный ключ используется при рендере массивов
                // нужен для идентифицирования reactом элементов которые отображаются
                    // <img src="" alt="" />
                
                return <Product key = {product.id} id={product.id} name = {product.name} price = {product.price} img = {product.image}></Product>
            }
            )}
    </div>
}