import { useForm } from "react-hook-form"
import { useUserContext } from "../../context/userContext"

interface ILoginForm {
    email: string,
    password: string,
}

export function LoginPage (){

    const {user, login} = useUserContext() //виклик хука для використання контексту користувача
    const {register: register, handleSubmit, formState} = useForm <ILoginForm>({
        mode: 'onSubmit'
    })
    
    function onSubmit(data: ILoginForm){
        console.log(data)
        login(data.email, data.password) //виклик функції для входу користувача
    }
    
    
    return(
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="text" placeholder='email' {...register('email', {
                    required: {value: true, message: 'Field is required'}, 
                    minLength: {value: 7, message: 'This field should be more than 7 symbols'}, 
                    maxLength: {value: 100, message: 'This field should be less than 100 symbols'}, })} />

                <p>{formState.errors.email?.message}</p>

                <input type="password" placeholder='password' {...register('password', {
                    required: {value: true, message: 'Field is required'}, 
                    minLength: {value: 7, message: 'This field should be more than 7 symbols'}, 
                    maxLength: {value: 100, message: 'This field should be less than 100 symbols'}, })} />
                
                <p>{formState.errors.password?.message}</p>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}
