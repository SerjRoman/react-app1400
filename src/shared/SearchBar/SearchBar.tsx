import { useState, useRef } from "react"
import "./SearchBar.css"

// создание и експорт функционального компонента
export function SearchBar(){
    // использование useState для хранения состояния модального окна
    const [isModalOpen, setIsModalOpened] = useState <boolean>(false)

    // функция, обрабатывающая фокус на инпут и отображающая модальное окно
    function inputOnFocus(){
        setIsModalOpened(true)
        
    }

    // обработчик события клик на document (самый главный тег html)
    document.addEventListener("click", (event)=>{
        // вывод в консоль цели клика и тега модального окна
        console.log(event.target)
        console.log(modalRef.current)


        // закрытие модального окна при клике вне его области или вне области инпута
        if (modalRef.current != event.target && event.target != inputRef.current){
            setIsModalOpened(false)
        }
    })  

    // ссылка на модальное окно с использованием хука useRef
    const modalRef = useRef<HTMLDivElement | null>(null);
    // ссылка на инпут поиска с использованием хука useRef
    const inputRef = useRef<HTMLInputElement | null>(null);

    // html код компонента который содержит инпут поиска и модальное окно, которое открывается при фокусе на инпут
    return(
        <div>
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