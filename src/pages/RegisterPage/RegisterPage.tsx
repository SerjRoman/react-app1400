import { useForm } from "react-hook-form"
import { useUserContext } from "../../context/userContext"

interface IRegisterForm {
    username: string,
    email: string,
    password: string,
    image: string,
}

// yup validation
export function RegisterPage (){
    const {user, register} = useUserContext();
    // Пишем скобки, которые отвечают за то, что мы будем деструктуризировать
    const {register: registerUser, handleSubmit, formState} = useForm <IRegisterForm>({
        mode: 'onSubmit'
    })
    
    function onSubmit(data: IRegisterForm){
        console.log(data)
        register(data.email, data.username, data.image, data.password)
    }
    
    
    return(
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="text" placeholder="Enter your username"{...registerUser('username', {
                    required: {value: true, message: 'Field is required'}, 
                    minLength: {value: 7, message: 'This field should be more than 7 symbols'}, 
                    maxLength: {value: 100, message: 'This field should be less than 100 symbols'}, })} />

                <p>{formState.errors.username?.message}</p>

                <input type="text" placeholder="Enter your email"{...registerUser('email', {
                    required: {value: true, message: 'Field is required'}, 
                    minLength: {value: 7, message: 'This field should be more than 7 symbols'}, 
                    maxLength: {value: 100, message: 'This field should be less than 100 symbols'}, })} />

                <p>{formState.errors.email?.message}</p>

                <input type="password" placeholder="Enter your password"{...registerUser('password', {
                    required: {value: true, message: 'Field is required'}, 
                    minLength: {value: 7, message: 'This field should be more than 7 symbols'}, 
                    maxLength: {value: 100, message: 'This field should be less than 100 symbols'}, })} />
                
                <p>{formState.errors.password?.message}</p>
                <input type="url" placeholder="image"{...registerUser('image', {
                    required: {value: true, message: 'Field is required'}})} />

                <p>{formState.errors.image?.message}</p>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}
