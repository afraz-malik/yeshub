import React, { FC, useEffect, useState, Suspense } from "react"
import { Route, Switch, useLocation } from "react-router-dom"
import { connect } from "react-redux"

import ModalContext from "../Context/ModalContext"
import MainContent from "../Controller/Main/Content"
import NavBar from "../Views/Home/Components/Layout/NavBar"
import ProtectedRoute from "./ProtectedRoutes"
import Home from "../Views/Home/Home"

import { Header } from "../Container/Layouts/Header"
import Loader from "../Shared/Loader"

import { Public } from "./Public"
import { Private } from "./Private"
import { homePath } from "../Constants/homePath"

export const Routes: FC = () => {
    let path = useLocation().pathname

    useEffect(() => {
        window.scrollTo(0, 0)
        localStorage.setItem("path", path)
    }, [path])

    const isHome = () => {
        for (let i = 0; i < homePath.length; i++) {
            if (path === "/" || path.includes(homePath[i])) {
                return true
            }
        }
        return false
    }

    const [openModal, setOpenModal] = useState<boolean>(false)
    const [modalType, setModalType] = useState<string>("")
    const [modalContent, setModalContent] = useState({})

    return (
        <>
            <ModalContext.Provider
                value={{
                    openModal,
                    setOpenModal,
                    modalType,
                    setModalType,
                    modalContent,
                    setModalContent,
                }}
            >
                {isHome() ? <NavBar /> : <Header />}
                <Suspense fallback={<Loader />}>
                    <Switch>
                        <Route path={"/"} exact component={Home} />
                        {Public.map(item => (
                            <Route path={item.path} key={item.path} exact={item.exact} component={item.component} />
                        ))}
                        {Private.map(item => (
                            <ProtectedRoute
                                key={item.path}
                                path={item.path}
                                exact={item.exact}
                                component={item.component}
                            />
                        ))}
                        <Route from="*" component={NotFound} />
                    </Switch>
                </Suspense>
            </ModalContext.Provider>
        </>
    )
}

const NotFound = () => {
    return (
        <MainContent>
            <h3 style={{ textAlign: "center" }}>Page Not Found</h3>
        </MainContent>
    )
}

const mapStateToProps = (state: { auth: any }) => {
    return state
}

export default connect(mapStateToProps)(Routes)
