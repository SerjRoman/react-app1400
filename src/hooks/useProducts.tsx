import { useEffect, useState } from "react"

export interface IProduct{
    id: number,
    title: string,
    price: number,
    image: string,
    category: string,
}

export function useProducts(){
    const [products, setProducts] = useState<IProduct[]>([])

    useEffect(()=>{
        async function getProducts(){
            const response = await fetch('https://fakestoreapi.com/products')
            const products = await response.json()
            setProducts(products)
        }
        getProducts()
        
    },[])
    return {products: products}
}