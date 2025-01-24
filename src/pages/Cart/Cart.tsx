import { useContext } from "react";
import { cartContext } from '../../shared/App';
import { IProduct } from "../../hooks/useProducts";

export function Cart() {
    const cart = useContext(cartContext);
    
    // const [product] = cart.cartProducts

    // const = [cart.cartProducts]

    return(
        <div>
            {/* <h1>{user.addToCart()}</h1> */}
            {/* {productInCart.map(product => (
                <h1>{product.title}</h1>
            ))} */}
            {/* <h1>{cart.cartProducts.map( () =>{
                <h1>{description}</h1>
            })}</h1> */}
            {/* <h1>{cart.cartProducts}</h1> */}
        </div>
    )
}