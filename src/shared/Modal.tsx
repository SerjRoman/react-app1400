
import { useRef, ReactNode, useEffect, useState } from "react";
import "./Modal.css";
import { createPortal } from "react-dom";

interface IModalProps {
    children: ReactNode,
    allowModalCloseOutside: boolean,
    onClose: () => void,
    container?: Element,
    className: string,
}

export function Modal(props: IModalProps) {
    let { children, allowModalCloseOutside, onClose, container = document.body, className } = props;

    const [filteredItems, setFilteredItems] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const modalRef = useRef<HTMLDivElement | null>(null);

    function handleClickOutside(event: MouseEvent) {
        if (modalRef.current !== event.target && !modalRef.current?.contains(event.target as Node)) {
            onClose();
        }
    }

    useEffect(() => {
        if (!allowModalCloseOutside) {
            return;
        }

        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        }
    }, []);

    useEffect(() => {
        // Фильтрация товаров по введенному тексту
        const items = ["item1", "item2", "item3"]; // Замените на ваш массив товаров
        const filtered = items.filter(item => item.toLowerCase().includes(searchTerm.toLowerCase()));
        setFilteredItems(filtered);
    }, [searchTerm]);

    const classModal = "modal ";
    const classNames = classModal + className;

    return createPortal(
        <div ref={modalRef} className={classNames}>
            <input
                type="text"
                placeholder="Поиск товаров"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <ul>
                {filteredItems.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
            {children}
        </div>,
        container
    );
}


