import { useState, useRef } from "react"
import "./SearchBar.css"

export function SearchBar(){
    const [isModalOpen, setIsModalOpened] = useState <boolean>(false)

    function inputOnFocus(){
        setIsModalOpened(true)
        
    }

    document.addEventListener("click", (event)=>{
        console.log(event.target)
        console.log(modalRef.current)

        if (modalRef.current != event.target && event.target != inputRef.current){
            setIsModalOpened(false)
        }
    })  

    const modalRef = useRef<HTMLDivElement | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);

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