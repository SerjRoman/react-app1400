import { ReactNode } from "react"
import './Layout.css'
import { Header } from "../Header/Header"
import { Main } from "../Main/Main"
import { Footer } from "../Footer/Footer"
import { Outlet } from "react-router-dom"

interface ILayoutProps {
    children?: ReactNode
}

export function Layout(props: ILayoutProps){
    return (
        <div className="layout">
            <Header></Header>
            <Main>
                <Outlet />
            </Main>
            <Footer></Footer>
        </div>
    )
}