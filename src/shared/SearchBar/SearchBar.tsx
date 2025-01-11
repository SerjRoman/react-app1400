import { useState, useRef } from "react"
import "./SearchBar.css"

export function SearchBar(){
    // создаен состояние открыто ли модальное окно
    const [isModalOpen, setIsModalOpened] = useState <boolean>(false)
    // создаем функцию, которая будет работать при событии онФокус для инпута
    function inputOnFocus(){
        // открываем модальное окно
        setIsModalOpened(true)
        
    }
    // события клика на любой элемент
    document.addEventListener("click", (event)=>{
        console.log(event.target)
        console.log(modalRef.current)
        // если элемент на который мы нажали это не модальное окно и не инпут, закрывает модальное окно
        if (modalRef.current != event.target && event.target != inputRef.current){
            setIsModalOpened(false)
        }
    })  
    // записываем див модального окна в переменную
    const modalRef = useRef<HTMLDivElement | null>(null);
    // записываем инпут в переменную
    const inputRef = useRef<HTMLInputElement | null>(null);

    return(
        <div>
            {/* инпут элемент в котором указываем в реф переменную и по событию он фокус вызываем функцию  */}
             <input className="input" type="text" ref={inputRef} placeholder="Пошук продуктів..." onFocus={inputOnFocus}/>
             {/* условие открытие модалки */}
             { isModalOpen === true 
                    ? 
                    // модалка с рефом в котором переменная, куда записан этот див
                    <div ref={modalRef}><button>opened</button></div>
                    : 
                    undefined
            }

        </div>
    )
}