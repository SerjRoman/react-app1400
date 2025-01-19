import { useRef, ReactNode, useEffect } from "react"
import "./Modal.css"
import { createPortal } from "react-dom"

// робимо інтерфейс для типізації props у компоненті.
// onClose - функція, яка повертає void, тобто нічого
interface IModalProps {
    children: ReactNode,
    allowModalCloseOutside: boolean,
    onClose: ()=> void,
    container?: Element
    className: string,
}



export function Modal(props: IModalProps){
    let {children, allowModalCloseOutside, onClose, container=document.body, className} = props

    // створюємо функцію, яка відповідає за закриття вікошка
    function handleClickOutside(event: MouseEvent){
    
        console.log(event.target)
        console.log(modalRef.current)
        // якщо ми не натиснули на модалку та якщо ми не натиснули на якийсь об'єкт у модалці
        if (modalRef.current !== event.target && !modalRef.current?.contains(event.target as Node)){
            // setIsModalOpened(false)
            console.log(123123123)
            onClose()
        }
    }

    useEffect(() => {
        // якщо модалку не можна закривати кліком ззовні, то виходимо з useEffect
        if (!allowModalCloseOutside){
            return
        }
        // додаємо обработчік кліка на document, якщо клікаємо на документ викликається функція handleClickOutside
        document.addEventListener("click", handleClickOutside)
        // при розмонтіровкє компонента видаляємо обработчік кліка на document
        return () => {
            document.removeEventListener("click", handleClickOutside)
        }
    }, [])

    
    const classModal = "modal "
    const classNames = classModal + className
    const modalRef = useRef<HTMLDivElement | null>(null)

    return createPortal(
        <div ref={modalRef} className = {classNames} >{children}</div>,
        container
    )
        // <div ref={modalRef} className="modal">{children}</div>    
}