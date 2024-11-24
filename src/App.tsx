import { ProductsList } from "./ProductsList"
import { useState } from "react"

export function App(){
    const name = 'Diana'
    return(
        <div>
            <h1>Чем гуще лес скибиди доп доп ес ес</h1>
            <h1>Hello naprimer {name}</h1>

            <ProductsList></ProductsList>
        </div>
    )
}