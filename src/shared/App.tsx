import { CartContextProvider } from "../context/cartContext"
import { UserContextProvider } from "../context/userContext"
import { AppRoutes } from "../routes/Routes"

export function App(){
    return(
        <div>
            <UserContextProvider> {/* обгортка для провайдера контексту користувача */}
                <CartContextProvider>
                    <AppRoutes></AppRoutes>
                </CartContextProvider>
            </UserContextProvider>
        </div>
    )
}
