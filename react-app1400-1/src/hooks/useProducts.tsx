import { useEffect, useState } from "react"

// Интерфейс для продукта
export interface IProduct{
    id: number, // Идентификатор продукта
    title: string, // Название продукта
    description: string, // Описание продукта
    price: number, // Цена продукта
    image: string, // Ссылка на изображение продукта
    category: string, // Категория продукта
}

// Хук для получения продуктов
export function useProducts(){
    const [products, setProducts] = useState<IProduct[]>([]) // Состояние для хранения продуктов
    const [isLoading, setIsLoading] = useState<boolean>(false) // Состояние для отслеживания загрузки
    const [error, setError] = useState<string>() // Состояние для хранения ошибок

    useEffect(()=>{
        // Асинхронная функция для получения продуктов
        async function getProducts(){
            try{
                setIsLoading(true) // Устанавливаем состояние загрузки в true
                const response = await fetch('https://fakestoreapi.com/products') // Запрос к API
                const products = await response.json() // Преобразуем ответ в JSON
                setProducts(products) // Сохраняем продукты в состояние
            }
            catch(error){
                const err = error instanceof Error ? error.message : undefined // Обработка ошибок
                setError(`${err}`) // Сохраняем ошибку в состояние
            }
            finally{
                setIsLoading(false) // Устанавливаем состояние загрузки в false
            }
        }
        getProducts() // Вызываем функцию получения продуктов
    },[])

    return {products: products, isLoading: isLoading, error: error} // Возвращаем состояние
}
