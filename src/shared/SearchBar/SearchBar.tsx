import { useState, useRef } from "react"
import "./SearchBar.css"

export function SearchBar(){
    //стейт для визначення чи відкрито модалка
    const [isModalOpen, setIsModalOpened] = useState <boolean>(false)
    //функція яка буде працювати при події onFocus
    function inputOnFocus(){
        //відкриття модалки
        setIsModalOpened(true)
    }
    //додаємо обробник на подію кліку
    document.addEventListener("click", (event)=>{
        console.log(event.target)
        console.log(modalRef.current)
        //умова, якщо було натиснуто куди завгодно але не в модалку, то ми її закриваємо
        if (modalRef.current != event.target && event.target != inputRef.current){
            setIsModalOpened(false)
        }
    })  

    const modalRef = useRef<HTMLDivElement | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);

    return(
        <div>
            {/*при події фокуса викликаємо функцію*/}
            <input className="input" type="text" ref={inputRef} placeholder="Пошук продуктів..." onFocus={inputOnFocus}/>
            { isModalOpen === true 
                ? 
                <div ref={modalRef}><button>opened</button></div>
                : 
                undefined
            }
        </div>
    )
}