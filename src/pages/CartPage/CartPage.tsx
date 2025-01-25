import { useContext } from "react";
import { cartContext } from "../../shared/App";

export function CartPage(){
    const { cartProducts, removeFromCart } = useContext(cartContext); //використовуємо хук useContext
    return (
        <div>
            <h1>Кошик</h1>
            {cartProducts.length > 0 ? ( //якщо довжина масиву продуктів у кошику більше 0 то відображаємо його
                <div>
                    {cartProducts.map((product) => ( //беремо весь масив продуктів у кошику для його відображення
                        <div key={product.id}>
                            <img src={product.image}/>
                            <p>{product.title}</p>
                            <p>Ціна: {product.price}</p>
                            <button onClick={() => removeFromCart(product.id)} >Видалити</button> {/* при натисканні на кнопку викликаємо функцію removeFromCart*/}
                        </div>
                    ))}
                </div>
            ) : (
                <p>У кошику поки що нічого немає</p> //коли нічого в масиві продуктів в кошику немає
            )}
        </div>
    );
}