import { useParams } from "react-router-dom";
import { useProductById } from "../../hooks/useProductById"

import "./ProductPage.css"
import { FidgetSpinner } from "react-loader-spinner";

export function ProductPage(){ 
    const params = useParams();
    const { product, isLoading, error } = useProductById(Number(params.id))
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
                    <button id="cartButton" className="productPageButton">Кошик</button>
                    <button id="buyButton" className="productPageButton">Купити</button>
                </div>
            </div>
        </> 
    : <div>{error}</div>
        
        )}
    </div>
}