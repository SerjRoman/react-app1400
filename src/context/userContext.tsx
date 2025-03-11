import { createContext, useContext, ReactNode, useState } from "react"
import { Response } from '../shared/types/response'

// создаем интерфейс для юзера
interface IUser {
    email: string
    username: string
    image: string
    role: string
}

// создаем интерфейс для контекста
interface IUserContext{
    user: IUser | null
    login: (email: string, password: string) => void
    register: (email: string, username: string, image: string, password: string) => void
    isAuthenticated: () => boolean
}

// создаем первозначальное значение для контекста
const initialValue: IUserContext = {
    user: null,
    login: (email: string, password: string) => {},
    register: (email: string, username: string, image: string, password: string) => {},
    isAuthenticated: () => false,
}

// создаем контекст
const userContext = createContext<IUserContext>(initialValue)

// создаем хук который получает контект вместо useContext
export function useUserContext(){
    return useContext(userContext)
}

// создаем интерфейс для пропсов контекста 
interface IUserContextProviderProps{
    children?: ReactNode
}

export function UserContextProvider(props: IUserContextProviderProps){
    // создаем стейт который хранит юзера
    const [user, setUser] = useState<IUser | null>(null)

    // создаем функцию для получания юзера по токену
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


    // создаем функцию для логина и получаем токен и сразу же его отправляем для того чтоб получить юзера
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
    
    // создаем функцию для регистрации и получаем токен и сразу же его отправляем для того чтоб получить юзера
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