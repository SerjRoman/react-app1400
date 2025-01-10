import { useState, useRef } from "react"
import "./SearchBar.css"

export function SearchBar(){
    // isModalOpen указывает, открыто ли модальное окно
    // setIsModalOpened для обновления состояния модального окна тип boolean true или false
    // Изначальное значение модального окна false = модальное окно не открытое 
    const [isModalOpen, setIsModalOpened] = useState <boolean>(false)

    // Функция вызывается при фокусировке на input устанавливая состояние isModalOpen = true, открывая модальное окно
    function inputOnFocus(){
        setIsModalOpened(true)
    }

    // addEventListener отслеживает клик по всему документу
    document.addEventListener("click", (event)=>{
        // event.target это элемент, по которому кликнули
        console.log(event.target)
        // modalRef.current модальное окно
        console.log(modalRef.current)

        // Условие сравнивает event.target с modalRef.current и inputRef.current (текстовое поле)
        // Если клик был не на модальное окно и текстовое поле, 
        // модальное окно закрывается
        if (modalRef.current != event.target && event.target != inputRef.current && event.target != modalButtonRef.current){
            setIsModalOpened(false)
            console.log(event.target)
        }
    })  

    // Мы обращяемся к элементам DOM елементам к div и input чтобы определить, 
    // был ли клик по модальному окну или input
    const modalRef = useRef<HTMLDivElement | null>(null);
    const modalButtonRef = useRef<HTMLButtonElement | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);

    return(
        <div>
            {/* ref={inputRef} связывает input с inputRef */}
            {/* onFocus={inputOnFocus} при фокусировке вызывает функцию inputOnFocus открывая модальное окно */}
            <input className="input" type="text" ref={inputRef} placeholder="Пошук продуктів..." onFocus={inputOnFocus}/>
            {/* если isModalOpen === true то отображаеться модальное окно*/}
            { isModalOpen === true 
                ? 
                // ref={modalRef} связывает div с modalRef 
                <div ref={modalRef} className="modalDiv">
                    <button ref={modalButtonRef} className="modalButton">opened</button>
                </div>
                : 
                // иначе undefined
                undefined
            }
        </div>
    )
}