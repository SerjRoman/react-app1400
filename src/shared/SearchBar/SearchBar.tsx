import { useState, useRef, useEffect } from "react"
import "./SearchBar.css"

import { IProduct, useProducts } from "../../hooks/useProducts"
import { Link } from "react-router-dom"
import { Modal } from "../Modal/Modal"

export function SearchBar(){
    // создаен состояние открыто ли модальное окно
    const [isModalOpen, setIsModalOpened] = useState <boolean>(false)
    const [inputText, setInputText] = useState('')
    const [filteredSearch, setFilteredSearch] = useState<IProduct[]>([]);
    // создаем функцию, которая будет работать при событии онФокус для инпута
    function inputOnFocus(){
        // открываем модальное окно
        setIsModalOpened(true)
    }


    const modalContainerRef = useRef<HTMLDivElement | null>(null)
    const {products} = useProducts()

    setFilteredSearch(products)

    useEffect(() => { 
        const filteredProduct = products.filter((product) => product.title.toLowerCase().includes(inputText.toLowerCase()))
        setFilteredSearch(filteredProduct);
    }, [inputText, products])

    return(
        <div ref={modalContainerRef}>
             <input className="input" type="text" placeholder="Пошук продуктів..." onFocus={inputOnFocus} onChange={(event) => setInputText(event.target.value)} onClick={(event) => {event.stopPropagation()}}/>
             { isModalOpen === true 
                    ? 
                    <Modal className="SearchBarModal" 
                    allowModalCloseOutside={true} 
                    onClose={() => {setIsModalOpened(false)}} 
                    container={(modalContainerRef.current) ? modalContainerRef.current : undefined}>
                            <div className='SearchBarItems'>
                                {filteredSearch.map((product)=>{
                                    return (
                                        <div className='SearchBarItem'>
                                        
                                        <svg className='SearchItemIcon' width="25" height="25" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path opacity="0.7" d="M17.4167 18.875L10.8542 12.3125C10.3333 12.7292 9.73437 13.059 9.05729 13.3021C8.38021 13.5451 7.65972 13.6667 6.89583 13.6667C5.00347 13.6667 3.40191 13.0113 2.09115 11.7005C0.780382 10.3898 0.125 8.78819 0.125 6.89583C0.125 5.00347 0.780382 3.40191 2.09115 2.09115C3.40191 0.780382 5.00347 0.125 6.89583 0.125C8.78819 0.125 10.3898 0.780382 11.7005 2.09115C13.0113 3.40191 13.6667 5.00347 13.6667 6.89583C13.6667 7.65972 13.5451 8.38021 13.3021 9.05729C13.059 9.73437 12.7292 10.3333 12.3125 10.8542L18.875 17.4167L17.4167 18.875ZM6.89583 11.5833C8.19792 11.5833 9.30469 11.1276 10.2161 10.2161C11.1276 9.30469 11.5833 8.19792 11.5833 6.89583C11.5833 5.59375 11.1276 4.48698 10.2161 3.57552C9.30469 2.66406 8.19792 2.20833 6.89583 2.20833C5.59375 2.20833 4.48698 2.66406 3.57552 3.57552C2.66406 4.48698 2.20833 5.59375 2.20833 6.89583C2.20833 8.19792 2.66406 9.30469 3.57552 10.2161C4.48698 11.1276 5.59375 11.5833 6.89583 11.5833Z" fill="#1D1B20"/>
                                        </svg>

                                        <img className='SearchItemImg' src= {product.image} alt="" />

                                        <Link to={"/product/"+product.id} className="SearchItemTitle" >{product.title}</Link>
                                        </div>
                                    )
                                })}
                            </div>
                    </Modal>
                    : 
                    undefined
            }
        </div>
    )
}