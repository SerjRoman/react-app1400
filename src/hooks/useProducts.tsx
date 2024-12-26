import { useEffect, useState } from "react"

export interface IProduct{
    id: number,
    title: string,
    description: string,
    price: number,
    image: string,
    category: string,
}

export function useProducts(){
    const [products, setProducts] = useState<IProduct[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | undefined>()

    useEffect(()=>{
        async function getProducts(){
            try{
                setIsLoading(true)
                const response = await fetch('https://fakestoreapi.com/products')
                if (!response.ok) {
                    throw new Error("Failed to fetch products")
                }
                const products = await response.json()
                setProducts(products)
            }
            catch(error: any){
                const err = error as string
                setError(`${err}`)
            }
            finally{
                setIsLoading(false)
            }
        }
        getProducts()
        
    },[])
    return {products: products, isLoading: isLoading, error: error}
}
