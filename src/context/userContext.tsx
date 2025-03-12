import { createContext, useContext, ReactNode, useState } from "react"
import { Response } from '../shared/types/response'

// Типизация информации о пользователе
interface IUser {
    email: string
    username: string
    image: string
    role: string
}

// Типизация контекста в котором будет хранится информация о пользователе и функции входа, регистрации и проверки аунтификации ()
interface IUserContext{
    user: IUser | null
    login: (email: string, password: string) => void
    register: (email: string, username: string, image: string, password: string) => void
    isAuthenticated: () => boolean
}

// Изначальное значение контекста с начальными значениями как в IUserContext
const initialValue: IUserContext = {
    user: null,
    login: (email: string, password: string) => {},
    register: (email: string, username: string, image: string, password: string) => {},
    isAuthenticated: () => false,
}

// Создание контекста с указанием типа и изнчального значения
const userContext = createContext<IUserContext>(initialValue)

// Экспорт контекста
export function useUserContext(){
    return useContext(userContext)
}

// Типизация для пропсов компонента UserContextProvider
interface IUserContextProviderProps{
    children?: ReactNode
}

// Компонент для рендера контекста
export function UserContextProvider(props: IUserContextProviderProps){
    // Создаем состояние в котором будет хранится пользователь
    const [user, setUser] = useState<IUser | null>(null)

    // Функция отправляет токен (id пользователя), от сервера получает данные позьзователя (чей айди был в токене) и записывает в состояние
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

    // Функция входа в аккаунт для страницы входа. Принимает почту и пароль, затем отправляет на сервер. Если состояние ответа от сервера будет succes, то записываем пользователя в состояние
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
    
    // Функция регистрации нового пользователя на странице регистрации. Принимает юзернейм, почту, пароль и аватарку, затем отправляет на сервер. А дальше та же концовка, что и в фунции входа
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

    // Возвращаем провайдера контекста принимающий чилдрен, для принятия роутеров в Routers.tsx 
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