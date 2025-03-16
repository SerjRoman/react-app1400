import { useForm } from "react-hook-form"
import { useUserContext } from "../../context/userContext"
import { Link } from "react-router-dom";
import "./LoginPage.css"

interface ILoginForm {
    email: string,
    password: string,
}

// yup validation

export function LoginPage (){
    // Пишем скобки, которые отвечают за то, что мы будем деструктуризировать
    const {user, login} = useUserContext()
    const {register: register, handleSubmit, formState} = useForm <ILoginForm>({
        mode: 'onSubmit'
    })
    
    function onSubmit(data: ILoginForm){
        console.log(data)
        login(data.email, data.password)
    }
    
    return(
        <div className="allLogin">
            <div className="badysLogin">
                    
                <form className="badyLogin" onSubmit={handleSubmit(onSubmit)}>

                    <div className="badysLogin">
                        <h1>Авторизация</h1>
                    </div>
                    <label className="label">
                        Логин:
                        <input className="input" type="text" placeholder='email' {...register('email', {
                            required: {value: true, message: 'Field is required'}, 
                            minLength: {value: 7, message: 'This field should be more than 7 symbols'}, 
                            maxLength: {value: 100, message: 'This field should be less than 100 symbols'}, })} />
                    </label>
                    <p className="error">{formState.errors.email?.message}</p>

                    <label className="label">
                        Пароль:
                        <input className="input" type="password" placeholder='password' {...register('password', {
                            required: {value: true, message: 'Field is required'}, 
                            minLength: {value: 7, message: 'This field should be more than 7 symbols'}, 
                            maxLength: {value: 100, message: 'This field should be less than 100 symbols'}, })} />
                    </label>
                    <p className="error">{formState.errors.password?.message}</p>
                    <div className="divButoon">
                        <button className="button" type="submit">Войти</button>
                        <Link to={"/register"}>
                        <p>Нет аккаунта? Регистрация</p>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}
