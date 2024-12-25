import { useState, useEffect } from 'react'
import { IProduct } from './useProducts'

export function useProductById(id: number) {
    const [product, setProduct] = useState<IProduct>()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>()

    useEffect(() => {
        async function getProduct() {
            try {
                const response = await fetch(`https://fakestoreapi.com/products/${id}`)
                const product = await response.json()
                setProduct(product)
            }
            catch (error) {
                const err = error as string
                setError(`${err}`)
            }
            finally {
                setIsLoading(true)
            }
        }
        getProduct()
    }, [id])
    return {product: product, isLoading: isLoading, error: error}
}