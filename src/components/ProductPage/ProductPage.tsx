import { useParams } from "react-router-dom";
import { useProductById } from "../../hooks/useProductById"

export function ProductPage(){
    const params = useParams();
    const { product } = useProductById(Number(params.id)) 

    return <div>
        <h1>{params.id}</h1>
        <h1>{product?.title}</h1>
        <p>{product?.price}</p>
        <img src={product?.image} alt="" />
    </div>

}