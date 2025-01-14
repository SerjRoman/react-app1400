import { useState, useRef, ReactNode, useEffect } from "react"
import "./Modal.css"
import { createPortal } from "react-dom"


// интерфейс с пропсами для модального окна
interface IModalProps {
    children: ReactNode,
    allowModalCloseOutside: boolean,
    onClose: ()=> void,
    container?: Element
}


// создание и экспорт функционального компонента модального окна
export function Modal(props: IModalProps){
    // деструктуризация пропсов для упрощения использования
    let {children, allowModalCloseOutside, onClose, container=document.body} = props

    // функция обрабатывающая клик вне модального окна
    function handleClickOutside(event: MouseEvent){
    
        console.log(event.target)
        console.log(modalRef.current)

        // проверка на то, что клик был совершен вне модального окна и его содержимого
        if (modalRef.current !== event.target && !modalRef.current?.contains(event.target as Node)){
            // setIsModalOpened(false)
            onClose()

        }
        
    }

    // обработчик события для закрытия модального окна при клике вне его содержимого
    useEffect(() => {
        if (!allowModalCloseOutside){
            return
        }

        document.addEventListener("click", handleClickOutside)
        return () => {
            document.removeEventListener("click", handleClickOutside)
        }
    }, [])

    
    // ссылка на модальное окна с использованием хука useRef
    const modalRef = useRef<HTMLDivElement | null>(null)

    // отображение модального окна в указанном позже контейнере с помощью createPortal
    return createPortal(
        <div ref={modalRef} className="modal">{children}</div>,
        container
    )
        // <div ref={modalRef} className="modal">{children}</div>    
}