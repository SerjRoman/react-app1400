import { useRef, ReactNode, useEffect } from "react"
import "./Modal.css"
import { createPortal } from "react-dom"


// интерфейс с пропсами для модального окна
interface IModalProps {
    children: ReactNode,
    allowModalCloseOutside: boolean,
    onClose: ()=> void,
    container?: Element
    className: string,
}


// создание и экспорт функционального компонента модального окна
export function Modal(props: IModalProps){
    let {children, allowModalCloseOutside, onClose, container=document.body, className} = props

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

    
    const classModal = "modal "
    const classNames = classModal + className
    const modalRef = useRef<HTMLDivElement | null>(null)

    // отображение модального окна в указанном позже контейнере с помощью createPortal
    return createPortal(
        <div ref={modalRef} className = {classNames} >{children}</div>,
        container
    )
        // <div ref={modalRef} className="modal">{children}</div>    
}