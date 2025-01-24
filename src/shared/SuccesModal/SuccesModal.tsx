import { useState, useRef, useContext } from "react"
// import "./SearchBar.css"
import { Modal } from "../Modal/Modal"
import { useProducts } from "../../hooks/useProducts"
import { Link, useParams } from "react-router-dom"
import { IProduct } from "../../hooks/useProducts"
import { useProductById } from "../../hooks/useProductById"
import { cartContext } from "../App"
import "./SuccesModal"

export function SuccesModal(){
    //стейт для визначення чи відкрито модалка
    const [isModalOpen, setIsModalOpened] = useState <boolean>(false)
    // const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([])
    // const [inputValue, setInputValue] = useState<string>("")
    const modalContainerRef = useRef<HTMLDivElement | null>(null)



    const params = useParams();
    const cart = useContext(cartContext);

    const { product } = useProductById(Number(params.id))
    // const {products} = useProducts()
    //функція яка буде працювати при події onFocus
    function buttonOnClick(){
        //відкриття модалки
        if (product === undefined){
            setIsModalOpened(true)
        return 
        }
        cart.addToCart(product)
        setIsModalOpened(true)
    }

    return (
        <div ref={modalContainerRef}>
            <button id="cartButton" onClick={buttonOnClick} className="productPageButton" >Кошик</button>
            { isModalOpen === true ? 
            <Modal className="SearchBarModal" 
            allowModalCloseOutside={true} 
            onClose={() => {setIsModalOpened(false)}} 
            container={(modalContainerRef.current) ? modalContainerRef.current : undefined}>
                <div className="succes-modal">success</div>
            {/* <div className="SearchBarItems">
                {inputValue.length > 0 ? (
                filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => <SearchBarItems product={product} />)) : ( <p> немає таких товарів</p>)) : (products.map((product) => <SearchBarItems product={product} />))}
            </div> */}
            </Modal> : undefined
            }
        </div>
    )
}