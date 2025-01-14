import { useState, useRef } from "react"
import "./SearchBar.css"
import { Modal } from "../Modal/Modal"

// создание и експорт функционального компонента
export function SearchBar(){
    // использование useState для хранения состояния модального окна
    const [isModalOpen, setIsModalOpened] = useState <boolean>(false)

    // функция, обрабатывающая фокус на инпут и отображающая модальное окно
    function inputOnFocus(){
        setIsModalOpened(true)
    }

    // переменная которая хранит контейнер, в котором будет модальное окно
    const modalContainerRef = useRef<HTMLDivElement | null>(null)


    
    return(
        <div ref={modalContainerRef}>
             <input className="input" type="text" placeholder="Пошук продуктів..." onFocus={inputOnFocus} onClick={(event) => {event.stopPropagation()}}/>
             { isModalOpen === true 
                    ? 
                    <Modal allowModalCloseOutside={true} onClose={() => {setIsModalOpened(false)}} container={(modalContainerRef.current) ? modalContainerRef.current : undefined}><button>opened</button></Modal>
                    : 
                    undefined
            }
        </div>
    )
}