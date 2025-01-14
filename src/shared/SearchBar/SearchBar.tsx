import { useState, useRef } from "react"
import "./SearchBar.css"
import { Modal } from "../Modal/Modal"

export function SearchBar(){
    const [isModalOpen, setIsModalOpened] = useState <boolean>(false)

    // Функция что показывает модалку
    function inputOnFocus(){
        setIsModalOpened(true)
    }

    // Сохраняем сюда модалку
    const modalContainerRef = useRef<HTMLDivElement | null>(null)


    return(
        <div ref={modalContainerRef}>
            {/* Создаем инпут про нажатии на который будет показываться модалка и останавливаться всплитие */}
             <input className="input" type="text" placeholder="Пошук продуктів..." onFocus={inputOnFocus} onClick={(event) => {event.stopPropagation()}}/>
             {/* Условие на то включена модалка или нет если нет то она ровна undefined */}
             { isModalOpen === true 
                    ? 
                    // Сама модалка
                    <Modal allowModalCloseOutside={true} onClose={() => {setIsModalOpened(false)}} container={(modalContainerRef.current) ? modalContainerRef.current : undefined}><button>opened</button></Modal>
                    : 
                    undefined
            }
        </div>
    )
}