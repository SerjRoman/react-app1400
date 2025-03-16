import { useForm } from "react-hook-form"
import { useUserContext } from "../../context/userContext"
import './RegisterPage.css'

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
        <div className='mainDiv'>
            <div className='registerDiv'>
                <h1>Регистрация</h1>
                <form className="formReg" onSubmit={handleSubmit(onSubmit)}>
                    <label  className="labelReg">
                        Username:
                        <input type="text" className='inputForm' placeholder="Enter your username"{...registerUser('username', {
                            required: {value: true, message: 'Field is required'}, 
                            minLength: {value: 7, message: 'This field should be more than 7 symbols'}, 
                            maxLength: {value: 100, message: 'This field should be less than 100 symbols'}, })} />
                    </label>

                    <p>{formState.errors.username?.message}</p>

                    <label className='labelReg'>
                        Email:
                        <input type="text" className='inputForm' placeholder="Enter your email"{...registerUser('email', {
                            required: {value: true, message: 'Field is required'}, 
                            minLength: {value: 7, message: 'This field should be more than 7 symbols'}, 
                            maxLength: {value: 100, message: 'This field should be less than 100 symbols'}, })} />
                    </label>

                    <p>{formState.errors.email?.message}</p>

                    <label className="labelReg" >
                        Password:
                        <input type="password" className='inputForm' placeholder="Enter your password"{...registerUser('password', {
                            required: {value: true, message: 'Field is required'}, 
                            minLength: {value: 7, message: 'This field should be more than 7 symbols'}, 
                            maxLength: {value: 100, message: 'This field should be less than 100 symbols'}, })} />
                    </label>

                    <p>{formState.errors.password?.message}</p>

                    <label className="labelReg">
                        Image:
                        <input type="url" className='inputForm' placeholder="image"{...registerUser('image', {
                            required: {value: true, message: 'Field is required'}})} />
                    </label>

                    <p>{formState.errors.image?.message}</p>
                    
                    <button type="submit" className='formButton'>Submit</button>
                </form>
            </div>
        </div>
    )
}
