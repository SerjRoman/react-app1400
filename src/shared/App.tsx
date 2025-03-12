import { CartContextProvider } from "../context/cartContext"
import { UserContextProvider } from "../context/userContext"
import { AppRoutes } from "../routes/Routes"
import { useEffect } from "react"



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

/*
   o((⊙﹏⊙))o. пупупупупупупупупупупупупупупупупупупупупупупупупупупупупупупупупупупупупупупупупупупупупупупупупупупупупупупупупупупупупупупупупупупупупупупупупупупупупупупупупупупупупупупупупупупупупупупупупупупупупупупупупупупупупупу...
*/ 

