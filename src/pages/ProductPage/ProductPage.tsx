import { useParams } from "react-router-dom";
import { useProductById } from "../../hooks/useProductById"

import "./ProductPage.css"
import { FidgetSpinner } from "react-loader-spinner";
import { useState } from "react";
import { Modal } from "../../shared/Modal/Modal";
import { useCartContext } from "../../context/cartContext";


export function ProductPage(){ 
    const params = useParams();
    const [isModalOpen, setIsModalOpened] = useState <boolean>(false)
    const { product, isLoading, error } = useProductById(Number(params.id))
    const {addToCart, isInCart} = useCartContext()
    // if (){} else {}
    // что-то==true ? Если условие true : Если условеи будет false
    return <div className="productPage">
        { isLoading === true ? (<div className="spiner"><FidgetSpinner
  visible={true}
  height="200"
  width="200"
  ariaLabel="fidget-spinner-loading"
  wrapperStyle={{}}
  wrapperClass="fidget-spinner-wrapper"
    /></div>) : ( !error ? <>  
            <img id="productImg" src={product?.src} alt="" />
            <div className="productPageDesc">
                <h1>{product?.name}</h1>
                <p>{product?.description}</p>
                <p>Ціна: £{product?.price}</p>
                <div className="productPageButtons">
                    <button id="cartButton" className="productPageButton" onClick={()=>{
                        if (product === undefined) {
                            return
                        }
                        
                        if (isInCart(product.id)) {
                            return //😲
                        }
                        setIsModalOpened(true)
                        addToCart(product)
                        setTimeout(() => {
                            setIsModalOpened(false)
                        }, 1000)
                    }}>У кошик</button>
                    <button id="buyButton" className="productPageButton">Купити</button>
                </div>
            </div>
        </> 
    : <div>{error}</div>
        
        )}
    
    {
        isModalOpen
        ? <Modal 
            className="successModal" 
            allowModalCloseOutside={false} 
            onClose={() => {setIsModalOpened(false)}}
        >
            <p>Продукт был успешно добавлен в корзину! :P</p>
        </Modal>
        : undefined
    } 
    </div>
}