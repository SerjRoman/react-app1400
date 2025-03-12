import { useEffect, useState } from 'react'

export interface ICategory{
    id: number,
    name: string,
    description: string | null
    src: string
}

export function useCategories() {
    const [categories, setCategories] = useState<ICategory[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>()

    useEffect(()=>{
        async function getCategories(){
            try {
                setIsLoading(true)
                const response = await fetch('http://localhost:8000/api/category/all')
                const result = await response.json()
                if (result.status === 'success'){
                    setCategories(result.data)
                } else {
                    setError(result.message)
                }
            }
            catch (error) {
                const err = error instanceof Error ? error.message : undefined
                setError(`${err}`) 
            }
            finally {
                setIsLoading(false)
            }
        }
        getCategories()
    },[])
    return {categories: categories, isLoading: isLoading, error: error}
}


// ehhhhhhh yooooo shkra piu pau eshkere

// Как дела как дела ето новый кадилак. Делать деньги делать деньги вот так.