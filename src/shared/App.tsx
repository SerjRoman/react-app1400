import { CartContextProvider } from "../context/cartContext"
import { AppRoutes } from "../routes/Routes"

export function App(){
    return(
        <div>
            <CartContextProvider>
                <AppRoutes></AppRoutes>
            </CartContextProvider>
        </div>
    )
}