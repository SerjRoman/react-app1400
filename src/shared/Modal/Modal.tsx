import { useState, useRef, ReactNode, useEffect } from "react"
import "./Modal.css"
import { createPortal } from "react-dom"

// Створюємо інтерфейс для пропсів
interface IModalProps {
    children: ReactNode, // Дочірні елементи в модальному вікні
    allowModalCloseOutside: boolean, // Дозвіл закривати модалку ззовні
    onClose: ()=> void, // Функція закриття модалки
    container?: Element // Елемент в якому буде відображатися модалка
}



export function Modal(props: IModalProps){
    // Деструктуризуємо пропс
    let {children, allowModalCloseOutside, onClose, container=document.body} = props

    // Створюємо функцію для обробки кліку за межами модалки
    function handleClickOutside(event: MouseEvent){
    
        console.log(event.target)
        console.log(modalRef.current)
        
        // Перевіряємо що клікнуто не на модалку і не на її дочерній елемент
        if (modalRef.current !== event.target && !modalRef.current?.contains(event.target as Node)){
            // setIsModalOpened(false)
            // Викликаємо функцію закриття модалки
            onClose()
        }
        
    }

    useEffect(() => {
        // Якщо не дозволено закриття модалки - нічого не робимо
        if (!allowModalCloseOutside){
            return
        }
        
        // Інакше додаємо обробник кліку на документ з функцією обробки
        document.addEventListener("click", handleClickOutside)
        return () => {
            // При розмонтуванні - знімаємо обробник
            document.removeEventListener("click", handleClickOutside)
        }
    }, [])

    
    // Використовуємо useRef для збереження модалки в ref
    const modalRef = useRef<HTMLDivElement | null>(null)

    // Повертаємо функцію createPortal, що рендерить модалку в container
    return createPortal(
        <div ref={modalRef} className="modal">{children}</div>,
        container
    )
        // <div ref={modalRef} className="modal">{children}</div>    
}