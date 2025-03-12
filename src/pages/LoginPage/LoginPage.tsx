import { useForm } from "react-hook-form"
import { useUserContext } from "../../context/userContext"

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
