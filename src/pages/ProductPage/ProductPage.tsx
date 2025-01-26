import { useParams } from "react-router-dom";
import { useProductById } from "../../hooks/useProductById"

import "./ProductPage.css"
import { FidgetSpinner } from "react-loader-spinner";
import { useContext, useState } from "react";
import {cartContext} from "../../shared/App"
import { Modal } from "../../shared/Modal/Modal";


export function ProductPage(){ 
    const params = useParams();
    const [isModalOpen, setIsModalOpened] = useState <boolean>(false)
    const { product, isLoading, error } = useProductById(Number(params.id))
    const {addToCart} = useContext(cartContext)
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
            <img id="productImg" src={product?.image} alt="" />
            <div className="productPageDesc">
                <h1>{product?.title}</h1>
                <p>{product?.description}</p>
                <p>Ціна: £{product?.price}</p>
                <div className="productPageButtons">
                    <button id="cartButton" className="productPageButton" onClick={()=>{
                        if (product === undefined) {
                            return
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