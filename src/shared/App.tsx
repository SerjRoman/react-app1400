import { CartContextProvider } from "../context/cartContext"
import { UserContextProvider } from "../context/userContext"
import { AppRoutes } from "../routes/Routes"

export function App(){
    return(
        <div>
            <UserContextProvider>
                <CartContextProvider>
                    <AppRoutes></AppRoutes>
                </CartContextProvider>
            </UserContextProvider>
        </div>
    )
}