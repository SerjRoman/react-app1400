import { useState, useEffect } from 'react'
import { IProduct } from './useProducts'

// https://fakestoreapi.com/products/id
export function useProductById(id: number) {
    const [product, setProduct] = useState<IProduct>()

    useEffect(() => {
        async function getProduct() {
            const response = await fetch(`https://fakestoreapi.com/products/${id}`)
            const product = await response.json()
            setProduct(product)
        }
        getProduct()
    }, [id])

    return {product: product}
}