import { useParams } from "react-router-dom";
import { useProductById } from "../../hooks/useProductById"

import "./ProductPage.css"
import { FidgetSpinner } from "react-loader-spinner";
import { cartContext } from "../../shared/App";
import { useContext, useRef, useState } from "react";
import { Modal } from "../../shared/Modal/Modal";

export function ProductPage(){ 
    const params = useParams();
    const {isInCart, addToCart, ...others} = useContext(cartContext);

    const { product, isLoading, error } = useProductById(Number(params.id))

    const [isModalOpen, setIsModalOpened] = useState <boolean>(false)



    function closeModal(){
        setIsModalOpened(false)
    }
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
                        <button id="cartButton" onClick={(event) => {
                            if (product === undefined){
                                return 
                            }


                            const isInCartFunc = isInCart(product)
                            
                            
                            if(isInCartFunc === false){
                                setIsModalOpened(true)
                                addToCart(product)
                                setTimeout(closeModal,1000)
                            }else{
                                return
                            }

                            event.stopPropagation()
                        }} className="productPageButton" >Кошик</button>
                        { isModalOpen === true ? 
                        <Modal className="SuccessModal" 
                        allowModalCloseOutside={true} 
                        onClose={() => {setIsModalOpened(false)}}
                        >
                            <div className="succes-modal">Продукт был успешно добавлен в корзину!</div>
                        </Modal> : undefined
                        }
                    <button id="buyButton" className="productPageButton">Купити</button>
                </div>
            </div>
        </> 
    : <div>{error}</div>
        
        )}
    </div>
}