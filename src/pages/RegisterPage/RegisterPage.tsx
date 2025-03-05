import { useForm } from "react-hook-form"

interface IForm {
    username: string,
    email: string,
    password: string,
    image: string,
}

// yup validation
export function RegisterPage (){
    // Пишем скобки, которые отвечают за то, что мы будем деструктуризировать
    const {register: register, handleSubmit, formState} = useForm <IForm>({
        mode: 'onSubmit'
    })
    
    function onSubmit(data: IForm){
        console.log(data)
        fetch('http://localhost:8000/api/user/register', { 
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        })
    }
    
    
    return(
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="text" {...register('username', {
                    required: {value: true, message: 'Field is required'}, 
                    minLength: {value: 7, message: 'This field should be more than 7 symbols'}, 
                    maxLength: {value: 100, message: 'This field should be less than 100 symbols'}, })} />

                <p>{formState.errors.username?.message}</p>

                <input type="text" {...register('email', {
                    required: {value: true, message: 'Field is required'}, 
                    minLength: {value: 7, message: 'This field should be more than 7 symbols'}, 
                    maxLength: {value: 100, message: 'This field should be less than 100 symbols'}, })} />

                <p>{formState.errors.email?.message}</p>

                <input type="password" {...register('password', {
                    required: {value: true, message: 'Field is required'}, 
                    minLength: {value: 7, message: 'This field should be more than 7 symbols'}, 
                    maxLength: {value: 100, message: 'This field should be less than 100 symbols'}, })} />
                
                <p>{formState.errors.password?.message}</p>
                <input type="url" {...register('image', {
                    required: {value: true, message: 'Field is required'}})} />

                <p>{formState.errors.image?.message}</p>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}
