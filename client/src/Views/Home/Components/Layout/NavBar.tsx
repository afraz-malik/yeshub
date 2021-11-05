import React, { FC, MouseEvent, ReactElement, useContext, useState, useEffect } from "react"
import { Link, NavLink } from "react-router-dom"

import LoginForm from "../../../Login"
import Register from "../../../Register/Index"
import { Logo } from "../../../../Shared/Images/Images"
import { ModalContext } from "../../../../Context/ModalContext"
import { isLoggedIn } from "../../../../Hooks/Auth/getAuth"
import ForgetPassword from "../../../Forget"
import UserDropDown from "../../../../Container/Layouts/UserDropdown"

const NavBar: FC = (): ReactElement => {
    const { setOpenModal, setModalType, openModal, modalType } = useContext(ModalContext)
    const [openNavBar, setOpenNavBar] = useState<boolean>(false)

    const setOpen = (e: MouseEvent<HTMLElement>) => {
        setModalType(e.currentTarget.id)
        setOpenModal(true)
    }

    const toggleOpenNavBar = () => {
        setOpenNavBar(state => !state)
    }

    const [modals] = useState<Record<string, ReactElement>>({
        login: <LoginForm />,
        register: <Register />,
        forget: <ForgetPassword />,
    })

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light landing__navbar fixed-top">
                <div className="container">
                    <Link
                        to=""
                        className="navbar-brand"
                        onClick={() => {
                            window.location.reload()
                        }}
                    >
                        <img src={Logo} className="logo" alt="logo" />
                    </Link>
                    <button
                        className="navbar-toggler"
                        data-target="#landing__page-navbar"
                        data-toggle="collapse"
                        aria-controls="landing__page-navbar"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                        onClick={toggleOpenNavBar}
                    >
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div id="landing__page-navbar" className={`collapse navbar-collapse ${openNavBar && "show"}`}>
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item mr-2">
                                <NavLink className="nav-link" to="/solution" exact={true} activeClassName={"active"}>
                                    Solutions
                                </NavLink>
                            </li>
                            <li className="nav-item mr-2">
                                <a className="nav-link" href="/communities">
                                    Communities
                                </a>
                            </li>
                            <li className="nav-item mr-2">
                                <a className="nav-link" href="/events/calendar" /* activeClassName={"active"} */>
                                    Calendar
                                </a>
                            </li>
                        </ul>

                        <ul className="navbar-nav ml-auto" style={{ marginRight: "80px" }}>
                            {!isLoggedIn ? (
                                <React.Fragment>
                                    <li className="nav-item mr-2">
                                        <button className="btn py-1 px-4" type="button" id="login" onClick={setOpen}>
                                            Login
                                        </button>
                                    </li>
                                    <li className="nav-item">
                                        <button
                                            className="btn text-white py-1 px-4 btn-view rounded"
                                            type="button"
                                            id="register"
                                            onClick={setOpen}
                                        >
                                            Sign Up
                                        </button>
                                    </li>
                                </React.Fragment>
                            ) : (
                                <>
                                    {/* <div style={{position: 'relative'}}>
                                <div style={{right: "1px", left: '1px'}} id="google_translate_element"></div>
                                </div> */}
                                    <UserDropDown />
                                </>
                            )}

                            <li className="nav-item">
                                <div
                                    style={{ position: "relative", marginLeft: "70px" }}
                                    className="inner-google-select"
                                >
                                    <div style={{ right: "1px", left: "1px" }} id="google_translate_element"></div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            {openModal && modals[modalType]}
        </>
    )
}

export default NavBar
