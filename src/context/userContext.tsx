import { createContext, useContext, ReactNode, useState } from "react"
import { Response } from '../shared/types/response'

// интерфейс для типизации юзера
interface IUser {
    email: string
    username: string
    image: string
    role: string
}


// интерфейс для типизации контекста юзера
interface IUserContext{
    user: IUser | null
    login: (email: string, password: string) => void
    register: (email: string, username: string, image: string, password: string) => void
    isAuthenticated: () => boolean
}

// начальное значение для контекста юзера
const initialValue: IUserContext = {
    user: null,
    login: (email: string, password: string) => {},
    register: (email: string, username: string, image: string, password: string) => {},
    isAuthenticated: () => false,
}

// создание контекста юзера
const userContext = createContext<IUserContext>(initialValue)

// создание хука для получения контекста юзера
export function useUserContext(){
    return useContext(userContext)
}

// типизация для props провайдера контекста
interface IUserContextProviderProps{
    children?: ReactNode
}

// создание и экспорт компонента провайдера
export function UserContextProvider(props: IUserContextProviderProps){
    // стостояние для передачи данных юзера
    const [user, setUser] = useState<IUser | null>(null)

    // функция, которая отправляет запрос на сервер для получения данных о юзере по его токену
    async function getData(token: string){
        try{
            const response = await fetch('http://localhost:8000/api/user/me', {
                headers: {'Authorization': `Bearer ${token}`}
            })
            const result: Response<IUser> = await response.json()
            if (result.status === 'error'){
                console.log(result.message) 
                return
            }
            setUser(result.data)
        } catch(error){

        }
    }

    // функция, которая отправляет запрос на сервер для авторизации 
    async function login(email: string, password: string){
        try{
            const response = await fetch('http://localhost:8000/api/user/login', { 
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({'email': email, 'password': password})
            })
            const result: Response<string> = await response.json()
            if (result.status === 'error'){
                console.log(result.message)
                return
            }
            getData(result.data)
        } catch(error){

        }
    }
    
    // функция, которая отправляет запрос на сервер для регистрации 
    async function register(email: string, username: string, image: string, password: string){
        try {
            const response = await fetch('http://localhost:8000/api/user/register', { 
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({'email': email, 'username': username, 'image': image, 'password': password})
            })

            const result: Response<string> = await response.json();
            if (result.status === 'error'){
                console.log(result.message);
                return;
            }
            getData(result.data)

        } catch(error){

        }
    }

    // возвращаем провайдер контекста з указаным value и children
    return <userContext.Provider 
    value={{
        user: user,
        login: login,
        register: register,
        isAuthenticated: () => false
    }}>

    {props.children}
    </userContext.Provider> 
}