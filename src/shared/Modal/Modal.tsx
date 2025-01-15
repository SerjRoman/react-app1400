import { useState, useRef, ReactNode, useEffect } from "react"
import "./Modal.css"
import { createPortal } from "react-dom"

// Создаем интерфейс IModalProps для передачи properties модального окна
interface IModalProps {
    children: ReactNode, // ребенок для бесполезной инфы) 
    allowModalCloseOutside: boolean, // проверка статуса клика вне модального окна
    onClose: ()=> void, // обработка события закрытия 
    container?: Element // необязательный контейнер нашего модального окна, который мы передаем в конце
}

export function Modal(props: IModalProps){
    let {children, allowModalCloseOutside, onClose, container=document.body} = props
    // Функция, которая занимается отслеживание клика вне модального окна
    function handleClickOutside(event: MouseEvent){
    
        console.log(event.target)
        console.log(modalRef.current)

        if (modalRef.current !== event.target && !modalRef.current?.contains(event.target as Node)){
            // setIsModalOpened(false)
            onClose()

        }
        
    }
    // отслеживаем ИЗМИНЕНИЕ состояния(для себя) 
    useEffect(() => {
        // если окно true, то возвращаем ничего( знак ! означает, что объект не null и не undefined), нужен для проверки, куда пользователь нажал
        if (!allowModalCloseOutside){
            return
        }
        // проверяем клик вне модального окна, и удаляем это событие, после его работы
        document.addEventListener("click", handleClickOutside)
        return () => {
            document.removeEventListener("click", handleClickOutside)
        }
    }, [])

    const modalRef = useRef<HTMLDivElement | null>(null)

    // контейнер модального окна, для инфы модального окна
    return createPortal(
        <div ref={modalRef} className="modal">{children}</div>,
        container
    )
        // <div ref={modalRef} className="modal">{children}</div>    
}