import { useState, useRef, ReactNode, useEffect } from "react"
import "./Modal.css"
import { createPortal } from "react-dom"

interface IModalProps {
    children: ReactNode,
    allowModalCloseOutside: boolean,
    onClose: ()=> void,
    container?: Element
}

export function Modal(props: IModalProps){ 

    // Деструктуризируем props в children, allowModalCloseOutside, onClose и container
    let {children, allowModalCloseOutside, onClose, container=document.body} = props

    // Функция которая проверяет, на что мы нажали при открытом модальном окне, если мы нажали на что-то, что не связано с модальным окном, то окно закроется
    function handleClickOutside(event: MouseEvent){
        console.log(event.target)
        console.log(modalRef.current)
        if (modalRef.current !== event.target && !modalRef.current?.contains(event.target as Node)){
            // setIsModalOpened(false)
            onClose()
        }
    }

    // Вмонтирует проверку, открыто ли модальное окно, если да, то к документу добавляется addEventListener
    // который при клике на что либо вызывает функцию handleClickOutside, также  useEffect возвращает стрелочную функцию которая убирает addEventListener с документа
    useEffect(() => {
        if (!allowModalCloseOutside){
            return
        }

        document.addEventListener("click", handleClickOutside)
        return () => {
            document.removeEventListener("click", handleClickOutside)
        }
    }, [])

    // Получаем "ссылку" на елемент модального окна
    const modalRef = useRef<HTMLDivElement | null>(null)

    // Возвращает портал с модальным окном, внутри которого находится children
    return createPortal(
        <div ref={modalRef} className="modal">{children}</div>,
        container
    )
}