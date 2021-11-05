import * as React from "react"
import { Route } from "react-router-dom"
import { connect } from "react-redux"
import { FC } from "react"

import ModalContext from "../Context/ModalContext"
import LoginForm from "../Views/Login"
import Register from "../Views/Register/Index"
import Auth from "./Authentication"
import ForgetPassword from "../Views/Forget"

type Auth = {
    isLoggedIn: boolean
}

export interface ProtectedRouteProps {
    auth: Auth
    path: string
    component: any
    exact: boolean
}

export const ProtectedRoute: FC<ProtectedRouteProps> = ({
    component: Component,
    auth = Auth.getAuth(),
    ...rest
}) => {
    const [openModal, setOpenModal] = React.useState(true)
    const [modalType, setModalType] = React.useState("login")
    const [modalContent, setModalContent] = React.useState({})
    const [modals] = React.useState<any>({
        login: <LoginForm showClose={true} />,
        register: <Register showClose={true} />,
        forget: <ForgetPassword showClose={true} />,
    })

    return (
        <Route
            {...rest}
            render={(props: any) =>
                auth ? (
                    <Component {...props} />
                ) : (
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
                        {openModal && modals[modalType]}
                    </ModalContext.Provider>
                )
            }
        />
    )
}

const mapStateToProps = (state: { auth: Auth }) => {
    return { auth: state.auth }
}

export default connect(mapStateToProps)(ProtectedRoute)
