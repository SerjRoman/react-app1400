import { ReactNode } from "react"
import './Layout.css'
import { Header } from "../Header/Header"
import { Main } from "../Main/Main"
// import { ProductsList } from "../ProductsList/ProductsList"
import { Footer } from "../Footer/Footer"
import { Outlet } from "react-router-dom"

interface ILayoutProps {
    children?: ReactNode
    setSearch: (value: string) => void;
    search: string;
}

export function Layout(props: ILayoutProps){

    return (
        <div className="layout">
            <Header search={props.search} setSearch={props.setSearch}></Header>
            <Main>
                <Outlet />
            </Main>
            <Footer></Footer>
        </div>
    )
}