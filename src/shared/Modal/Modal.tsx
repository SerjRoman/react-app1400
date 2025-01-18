import { useRef, ReactNode, useEffect } from "react"
import "./Modal.css"
import { createPortal } from "react-dom"


// Создаем Интерфей для модалки куда передаем:
// children - Оно будет хранить модалку
// allowModalCloseOutside - открывает и закрывает модалку true
// onClose - Скрывает полностью модалку при ее выводе
// container - Оно хранит DOM дерево
interface IModalProps {
    children: ReactNode,
    allowModalCloseOutside: boolean,
    onClose: ()=> void,
    container?: Element
    className: string,
}



export function Modal(props: IModalProps){
    let {children, allowModalCloseOutside, onClose, container=document.body, className} = props

    function handleClickOutside(event: MouseEvent){
    
        console.log(event.target)
        console.log(modalRef.current)
        // При нажатии на любое место кроме модалки она будет закрываться
        if (modalRef.current !== event.target && !modalRef.current?.contains(event.target as Node)){
            // setIsModalOpened(false)
            onClose()
        }
    }

    // Еффект который при налачии модалки добавляет функцию handleClickOutside при клике на document

    useEffect(() => {
        if (!allowModalCloseOutside){
            return
        }

        document.addEventListener("click", handleClickOutside)
        return () => {
            document.removeEventListener("click", handleClickOutside)
        }
    }, [])

    
        // Тут мы будем хранить самуу модалку
    const classModal = "modal "
    const classNames = classModal + className
    const modalRef = useRef<HTMLDivElement | null>(null)
    // Создаем портал который мы перенесем на уровень ниже body
    return createPortal(
        <div ref={modalRef} className = {classNames} >{children}</div>,
        container
    )
        // <div ref={modalRef} className="modal">{children}</div>    
}