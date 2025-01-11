import { useState, useEffect } from 'react'
import { IProduct } from './useProducts'

// Хук для получения продукта по айдишке
export function useProductById(id: number) {
    // Стейт для хранения шары
    const [product, setProduct] = useState<IProduct>()
    // Стейт для отслеживания загрузки данных
    const [isLoading, setIsLoading] = useState(false)
    // Стейт для хранения ошибок
    const [error, setError] = useState<string>()

    useEffect(() => {
        // Асинхронная функция для получения данных продукта
        async function getProduct() {
            try {
                setIsLoading(true) // Устанавливаем состояние загрузки
                const response = await fetch(`https://fakestoreapi.com/products/${id}`) // Запрос к API
                const product = await response.json() // Преобразование ответа в JSON
                setProduct(product) // Сохранение данных продукта в состояние
            }
            catch (error) {
                // Проверка типа ошибки и установка сообщения об ошибке
                const err = error instanceof Error ? error.message : undefined
                setError(`${err}`)
            }
            finally {
                setIsLoading(false) // Завершение состояния загрузки
            }
        }
        getProduct() // Вызов функции получения данных продукта
    }, [id]) // Зависимость эффекта от ID продукта

    // Возвращаемые значения хука
    return {product: product, isLoading: isLoading, error: error}
}
