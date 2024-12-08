import { useParams } from "react-router-dom";

export function ProductPage(){
    const params = useParams();
    return <div>
        <h1>{params.id}</h1>
    </div>

}