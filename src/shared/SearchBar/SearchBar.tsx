import { useState, useRef } from "react"
import "./SearchBar.css"
import { Modal } from "../Modal/Modal"

export function SearchBar(){
    // Испульзуем хук, контролирующий состояние, и сразу задаем тип boolean
    const [isModalOpen, setIsModalOpened] = useState <boolean>(false)

    function inputOnFocus(){
        setIsModalOpened(true)
    }

    const modalContainerRef = useRef<HTMLDivElement | null>(null)

    return(
        <div ref={modalContainerRef}>
             <input className="input" type="text" placeholder="Пошук продуктів..." onFocus={inputOnFocus} onClick={(event) => {event.stopPropagation()}}/>
             {/* Если isModalOpen == true, то рендерим кнопку с надписью opened */}
             { isModalOpen === true 
                    ? 
                    <Modal allowModalCloseOutside={true} onClose={() => {setIsModalOpened(false)}} container={(modalContainerRef.current) ? modalContainerRef.current : undefined}><button>opened</button></Modal>
                    : 
                    undefined
            }
        </div>
    )
}