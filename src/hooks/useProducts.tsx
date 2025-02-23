import { useEffect, useState } from "react"
import { ICategory } from "./useCategories"

export interface IProduct{
    id: number,
    name: string,
    description: string | null,
    price: number,
    src: string,
    categoryId: number,
    Category: ICategory
}

let data = {
    "status": "success",
    "data": [
        {
            "id": 1,
            "name": "Keyboard1",
            "src": "",
            "price": 5,
            "description": null,
            "categoryId": 1
        },
        {
            "id": 2,
            "name": "Keyboard1",
            "src": "",
            "price": 5,
            "description": null,
            "categoryId": 1
        },
        {
            "id": 3,
            "name": "Keyboard1",
            "src": "",
            "price": 5,
            "description": null,
            "categoryId": 2
        }
    ]
}

export function useProducts(){
    const [products, setProducts] = useState<IProduct[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>()
    useEffect(()=>{
        async function getProducts(){
            try{
                setIsLoading(true)
                const response = await fetch('http://localhost:8000/api/product/all')
                const result = await response.json()
                if (result.status === 'error') {
                    setError(result.message)
                } else {
                    setProducts(result.data)
                }
            }
            catch(error){
                const err = error instanceof Error ? error.message : undefined
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