import { useState, useRef } from "react"
import "./SearchBar.css"
import { Modal } from "../Modal/Modal"

export function SearchBar(){
    // Встановлюємо стан для дозволення відкриття модального вікна
    const [isModalOpen, setIsModalOpened] = useState <boolean>(false)

    // При події focus, дозволити відкриття модального вікна
    function inputOnFocus(){
        setIsModalOpened(true)
    }

    // Використовуємо хук useRef, для запису елемента в ref
    const modalContainerRef = useRef<HTMLDivElement | null>(null)


    return(
        <div ref={modalContainerRef}>
             <input className="input" type="text" placeholder="Пошук продуктів..." onFocus={inputOnFocus} onClick={(event) => {event.stopPropagation()}}/>
                {/* Якщо є дозвіл на відкриття */}
                { isModalOpen === true 
                    ? 
                    // Рендеримо модалку, передаємо props
                    <Modal allowModalCloseOutside={true} onClose={() => {setIsModalOpened(false)}} container={(modalContainerRef.current) ? modalContainerRef.current : undefined}><button>opened</button></Modal>
                    : 
                    // Інакше не відкриваємо(
                    undefined
                }
        </div>
    )
}