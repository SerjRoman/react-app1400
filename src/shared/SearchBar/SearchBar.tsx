import { useState, useRef } from "react"
import "./SearchBar.css"

export function SearchBar(){
    // Испульзуем хук, контролирующий состояние, и сразу задаем тип boolean
    const [isModalOpen, setIsModalOpened] = useState <boolean>(false)

    function inputOnFocus(){
        setIsModalOpened(true)
        
    }

    document.addEventListener("click", (event)=>{
        console.log(event.target)
        console.log(modalRef.current)
        // Создаем функцию, которая проверяет, контактируем ли мы с нашим input`ом
        if (modalRef.current != event.target && event.target != inputRef.current){
            setIsModalOpened(false)
        }
    })  
    // Используем новый изученный нами хук useRef, который позволяет ссылаться на значение, которое не требуется для рендеринга.
    const modalRef = useRef<HTMLDivElement | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);

    return(
        <div>
                <input className="input" type="text" ref={inputRef} placeholder="Пошук продуктів..." onFocus={inputOnFocus}/>
                {/* Если isModalOpen == true, то рендерим кнопку с надписью opened */}
                { isModalOpen === true 
                    ? 
                    <div ref={modalRef}><button>opened</button></div>
                    : 
                    undefined
            }
        </div>
    )
}