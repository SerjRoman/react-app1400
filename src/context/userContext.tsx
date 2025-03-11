import { createContext, useContext, ReactNode, useState } from "react"
import { Response } from '../shared/types/response'

interface IUser { //створення інтерфейсу для типізації даних користувача
    email: string
    username: string
    image: string
    role: string
}

interface IUserContext{ // створення інтерфейсу для типізації даних контексту користувача
    user: IUser | null
    login: (email: string, password: string) => void
    register: (email: string, username: string, image: string, password: string) => void
    isAuthenticated: () => boolean
}

const initialValue: IUserContext = { //створення початкового значення для контексту користувача
    user: null,
    login: (email: string, password: string) => {},
    register: (email: string, username: string, image: string, password: string) => {},
    isAuthenticated: () => false,
}
const userContext = createContext<IUserContext>(initialValue) //створення контексту користувача

export function useUserContext(){ //створення хука для використання контексту користувача
    return useContext(userContext)
}

interface IUserContextProviderProps{ //створення інтерфейсу для пропсів провайдера контексту користувача
    children?: ReactNode
}

export function UserContextProvider(props: IUserContextProviderProps){ //створення провайдера контексту користувача
    const [user, setUser] = useState<IUser | null>(null) //створення стейту для користувача

    async function getData(token: string){ //створення асинхронної функції для отримання даних користувача
        try{
            const response = await fetch('http://localhost:8000/api/user/me', { //відправлення запиту на сервер для отримання даних користувача
                headers: {'Authorization': `Bearer ${token}`}
            })
            const result: Response<IUser> = await response.json() //отримання результату відповіді від сервера
            if (result.status === 'error'){
                console.log(result.message) 
                return
            }
            setUser(result.data) //збереження даних користувача в стейт
        } catch(error){

        }
    }

    async function login(email: string, password: string){ //створення асинхронної функції для входу користувача
        try{
            const response = await fetch('http://localhost:8000/api/user/login', {  //відправлення запиту на сервер для входу користувача
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({'email': email, 'password': password})
            })
            const result: Response<string> = await response.json() //отримання результату відповіді від сервера
            if (result.status === 'error'){
                console.log(result.message)
                return
            }
            getData(result.data) //виклик функції для отримання даних користувача
        } catch(error){

        }
    }
    
    async function register(email: string, username: string, image: string, password: string){ //створення асинхронної функції для реєстрації користувача
        try {
            const response = await fetch('http://localhost:8000/api/user/register', { // відправлення запиту на сервер для реєстрації користувача
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({'email': email, 'username': username, 'image': image, 'password': password}) //відправлення даних користувача на сервер
            })

            const result: Response<string> = await response.json() //отримання результату відповіді від сервера
            if (result.status === 'error'){
                console.log(result.message)
                return
            }
            getData(result.data)

        } catch(error){

        }
    }

    return <userContext.Provider // заповнення контексту користувача даними
    value={{
        user: user,
        login: login,
        register: register,
        isAuthenticated: () => false
    }}>

    {props.children} {/*відображення дочірніх елементів */}
    </userContext.Provider> 
}