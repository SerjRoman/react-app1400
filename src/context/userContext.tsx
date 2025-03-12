import { createContext, useContext, ReactNode, useState } from "react"
import { Response } from '../shared/types/response'

// Создаем интерфейс юсера
interface IUser {
    email: string
    username: string
    image: string
    role: string
}

// Создаем интерфейс для контекста юсера
interface IUserContext{
    user: IUser | null
    login: (email: string, password: string) => void
    register: (email: string, username: string, image: string, password: string) => void
    isAuthenticated: () => boolean
}

// делаем начальное значение для контекста
const initialValue: IUserContext = {
    // пользователя изначально нет
    user: null,
    // функция логина, принимает почту и пароль
    login: (email: string, password: string) => {},
    // функция регестранции, принимает почту, юсернейм, картинку(аватар) и пароль
    register: (email: string, username: string, image: string, password: string) => {},
    // функция, которая проверяет авторизован ли пользователь
    isAuthenticated: () => false,
}
// создаем сам контекст и типизируем его как юсер контекст
const userContext = createContext<IUserContext>(initialValue)

// создаем хук useUserContext, который возвращает контекст юсер контекст
export function useUserContext(){
    return useContext(userContext)
}
// создаем пропсы для провайдера
interface IUserContextProviderProps{
    children?: ReactNode
}

// делаем функцию контекстного провайдера
export function UserContextProvider(props: IUserContextProviderProps){
    // создаем состояние юсера(изначально фолс)
    const [user, setUser] = useState<IUser | null>(null)

    // создаем асинхронную функцию, которая получает токен из апи
    async function getData(token: string){
        try{
            // кидаем запрос на бэк
            const response = await fetch('http://localhost:8000/api/user/me', {
                // из хедерсов, из Authorization получаем token
                headers: {'Authorization': `Bearer ${token}`}
            })
            //  указывает, что мы ожидаем, что result будет соответствовать типу Response<IUser> и преобразует тело HTTP-ответа (response) в объект JavaScript
            const result: Response<IUser> = await response.json()
            // проверка, если статус ответа ошибка
            if (result.status === 'error'){
                // выводим сообщение
                console.log(result.message) 
                // выходим из поверки
                return
            }
            // записываем полученый токен в состояние 
            setUser(result.data)
        } catch(error){

        }
    }
    // Функция для авторизации пользователя
    async function login(email: string, password: string){
        try{
             // Отправляем POST-запрос на сервер для входа пользователя
            const response = await fetch('http://localhost:8000/api/user/login', { 
                method: 'POST',
                // Указываем, что отправляем JSON
                headers: { 'Content-Type': 'application/json'}, 
                // Преобразуем данные в JSON
                body: JSON.stringify({'email': email, 'password': password})
            })
            // преобразуем ответ сервера в JSON-объект
            const result: Response<string> = await response.json()
            // Проверяем, есть ли ошибка в ответе сервера
            if (result.status === 'error'){
                // Выводим сообщение об ошибке
                console.log(result.message)
                // Завершаем выполнение функции
                return
            }
            // Записываем дату в состояние
            getData(result.data)
        } catch(error){

        }
    }
    // Функция для регистрации пользователя
    async function register(email: string, username: string, image: string, password: string){
        try {
            // Отправляем POST-запрос на сервер для регистрации пользователя
            const response = await fetch('http://localhost:8000/api/user/register', { 
                method: 'POST',
                // Указываем, что отправляем JSON
                headers: { 'Content-Type': 'application/json'},
                // Преобразуем данные в JSON
                body: JSON.stringify({'email': email, 'username': username, 'image': image, 'password': password})
            })
            // преобразуем ответ сервера в JSON-объект
            const result: Response<string> = await response.json()
            // Проверяем, есть ли ошибка в ответе сервера
            if (result.status === 'error'){
                console.log(result.message)
                // Завершаем выполнение функции
                return;
            }
            getData(result.data)

        } catch(error){

        }
    }
    // Возвращаем контекст пользователя с функциями аутентификации и регистрацией
    return <userContext.Provider 
    value={{
        user: user,
        login: login,
        register: register,
        isAuthenticated: () => false
    }}>

    {props.children} {/* Дочерние компоненты, получающие контекст */}
    </userContext.Provider> 
}