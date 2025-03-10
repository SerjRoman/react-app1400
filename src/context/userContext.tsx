import { createContext, useContext, ReactNode, useState } from "react"
import { Response } from '../shared/types/response'

// оределяет структуру объекта пользователя
interface IUser {
    email: string
    username: string
    image: string
    role: string
}

// определяет какие данные и функции будут доступны в контексте
interface IUserContext{
    user: IUser | null
    login: (email: string, password: string) => void
    register: (email: string, username: string, image: string, password: string) => void
    isAuthenticated: () => boolean
}

// создаем пустой контекст
const initialValue: IUserContext = {
    user: null,
    login: (email: string, password: string) => {},
    register: (email: string, username: string, image: string, password: string) => {},
    isAuthenticated: () => false,
}
const userContext = createContext<IUserContext>(initialValue)

// хук для доступа к контексту
export function useUserContext(){
    return useContext(userContext)
}

interface IUserContextProviderProps{
    children?: ReactNode
}

// провайдер контекста
export function UserContextProvider(props: IUserContextProviderProps){
    const [user, setUser] = useState<IUser | null>(null)

    async function getData(token: string){
        try{
            // делает запрос в наше апи, и если с токеном всё норм, то обновляет состояние юзера
            const response = await fetch('http://localhost:8000/api/user/me', {
                headers: {'Authorization': `Bearer ${token}`}
            })
            const result: Response<IUser> = await response.json()
            if (result.status === 'error'){
                console.log(result.message) 
                return
            }
            // обновляет вот тут 
            setUser(result.data)
        } catch(error){

        }
    }

    async function login(email: string, password: string){
        try{
            // отпрявляет имеил и пароль на сервер, после чего вызывает предыдущую функцию getData
            const response = await fetch('http://localhost:8000/api/user/login', {
                // отправляет вот тут 
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({'email': email, 'password': password})
            })
            const result: Response<string> = await response.json()
            if (result.status === 'error'){
                console.log(result.message)
                return
            }
            // вызывает отута
            getData(result.data)
        } catch(error){

        }
    }
    
    async function register(email: string, username: string, image: string, password: string){
        try {
            // тоже отправляет данные на сервак, но плюсом юзернейм и аватарку пользователя 
            const response = await fetch('http://localhost:8000/api/user/register', { 
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({'email': email, 'username': username, 'image': image, 'password': password})
            })

            const result: Response<string> = await response.json();
            // проверяет статус результата, если ошибка, то ваи плоха усё
            if (result.status === 'error'){
                console.log(result.message);
                return;
            }
            getData(result.data)

        } catch(error){

        }
    }
    // ретурнит данные если всё норм
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