import { createContext, useContext, ReactNode, useState } from "react"
import { Response } from '../shared/types/response'
//створення інтерфейсів
interface IUser {
    email: string
    username: string
    image: string
    role: string
}

interface IUserContext{
    user: IUser | null
    login: (email: string, password: string) => void
    register: (email: string, username: string, image: string, password: string) => void
    isAuthenticated: () => boolean
}

const initialValue: IUserContext = {
    user: null,
    login: (email: string, password: string) => {},
    register: (email: string, username: string, image: string, password: string) => {},
    isAuthenticated: () => false,
}
//створення контексту
const userContext = createContext<IUserContext>(initialValue)
//створення функції, яка використовує наш контекст
export function useUserContext(){
    return useContext(userContext)
}
// пишемо інтерфейс для пропсів 
interface IUserContextProviderProps{
    children?: ReactNode
}

export function UserContextProvider(props: IUserContextProviderProps){
    const [user, setUser] = useState<IUser | null>(null)//юзер або є або немає

    async function getData(token: string){//функція отримання даних яка приймає в себе токен
        try{
            const response = await fetch('http://localhost:8000/api/user/me', { //беремо інформацію з бекенду
                headers: {'Authorization': `Bearer ${token}`}
            })
            const result: Response<IUser> = await response.json() // формуємо результат
            if (result.status === 'error'){//обробка помилки
                console.log(result.message) 
                return
            }
            setUser(result.data)
        } catch(error){

        }
    }

    async function login(email: string, password: string){
        try{
            const response = await fetch('http://localhost:8000/api/user/login', { //беремо інформацію з бекенду
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({'email': email, 'password': password})
            })
            const result: Response<string> = await response.json() // формуємо результат
            if (result.status === 'error'){//обробка помилки
                console.log(result.message)
                return
            }
            getData(result.data)
        } catch(error){

        }
    }
    
    async function register(email: string, username: string, image: string, password: string){
        try {
            const response = await fetch('http://localhost:8000/api/user/register', {  //беремо інформацію з бекенду
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({'email': email, 'username': username, 'image': image, 'password': password})
            })

            const result: Response<string> = await response.json(); // формуємо результат
            if (result.status === 'error'){ //обробка помилки
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