import { useState, useRef } from "react"
import "./SearchBar.css"
import { Modal } from "../Modal/Modal"

export function SearchBar(){
    // isModalOpen указывает, открыто ли модальное окно
    // setIsModalOpened для обновления состояния модального окна тип boolean true или false
    // Изначальное значение модального окна false = модальное окно не открытое 
    const [isModalOpen, setIsModalOpened] = useState <boolean>(false)

    // Функция вызывается при фокусировке на input устанавливая состояние isModalOpen = true, открывая модальное окно
    function inputOnFocus(){
        setIsModalOpened(true)
    }

    // Мы обращяемся к элементам DOM в модальном окне чтобы определить, 
    // был ли клик по элементам модального окна
    const modalContainerRef = useRef<HTMLDivElement | null>(null)


    return(
        // ref={modalContainerRef} связывает div с modalRef 
        <div ref={modalContainerRef}>
            {/* onFocus={inputOnFocus}  при фокусировке вызывает функцию inputOnFocus открывая модальное окно 
            onClick={(event) => {event.stopPropagation()} событие которое предотвращает закрытие модального окна при клике на то что в мальном окне */}
            <input className="input" type="text" placeholder="Пошук продуктів..." onFocus={inputOnFocus} onClick={(event) => {event.stopPropagation()}}/>
            { isModalOpen === true 
                ? 
                // allowModalCloseOutside={true} разрешено закрытие модального окна при клике вне его
                <Modal allowModalCloseOutside={true} onClose={() => 
                    {setIsModalOpened(false)}} 
                    // Если элемент отсутствует в DOM, то undefined
                    // current используется для хранения ссылки на DOM-элемент
                    container={(modalContainerRef.current) 
                        ? 
                        modalContainerRef.current 
                        : 
                        undefined}>
                    <button>opened</button>
                </Modal>
                : 
                undefined
            }
        </div>
    )
}