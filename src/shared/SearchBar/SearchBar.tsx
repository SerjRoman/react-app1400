import { useState, useRef } from "react"
import "./SearchBar.css"

export function SearchBar(){
    // Встановлюємо стан для дозволення відкриття модального вікна
    const [isModalOpen, setIsModalOpened] = useState <boolean>(false)

    // При події focus, дозволити відкриття модального вікна
    function inputOnFocus(){
        setIsModalOpened(true)
        
    }

    // Додаємо обробник кліку на документ
    document.addEventListener("click", (event)=>{
        console.log(event.target)
        console.log(modalRef.current)

        // Якщо клікнуто не на модалку, і не на поле пошуку - дозволити закриття модалки
        if (modalRef.current != event.target && event.target != inputRef.current){
            setIsModalOpened(false)
        }
    })  
    
    // Використовуємо хук useRef, для запису елемента в ref
    const modalRef = useRef<HTMLDivElement | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);

    return(
        <div>
             <input className="input" type="text" ref={inputRef} placeholder="Пошук продуктів..." onFocus={inputOnFocus}/>
             {/* Якщо є дозвіл відкривати модальне вікно: */}
             { isModalOpen === true 
                    ? 
                    // Відкриваємо модалку
                    <div ref={modalRef}><button>opened</button></div>
                    : 
                    // Інакше не відкриваємо(
                    undefined
            }

        </div>
    )
}