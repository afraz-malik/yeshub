import React, { FC, ReactElement, useContext, useState, useEffect } from "react"
import { Link } from "react-router-dom"

import ForgetPassword from "../../Views/Forget"
import CommunityUsersModal from "../../Views/Groups/Details/Components/Modal/UsersModal"
import LoginForm from "../../Views/Login"
import Register from "../../Views/Register/Index"
import { Logo, MenuHeaderIcon, SearchIcon } from "../../Shared/Images/Images"
import { isLoggedIn } from "../../Hooks/Auth/getAuth"
import { ModalContext } from "../../Context/ModalContext"
import CovidBanner from "../../Views/Home/Components/CovidBanner"
import UserDropDown from "./UserDropdown"
import { SearchWeb } from "../../Helpers/Request/Services/search-web"
import tagApi from "../../Helpers/Request/Services/Tags"
import tags from "../../Helpers/Request/Services/Tags"
import JSONPRequest from "pusher-js/types/src/runtimes/web/dom/jsonp_request"

export const Header: FC = (): ReactElement => {
    const { openModal, setOpenModal, modalType, setModalType } = useContext(ModalContext)
    const [modals] = useState<Record<string, any>>({
        login: <LoginForm />,
        register: <Register />,
        communityUsers: <CommunityUsersModal />,
        forget: <ForgetPassword />,
    })

    const toggleSidebar = new CustomEvent("toggleSidebar")
    const [showSearch, setShowSearch] = useState(false)
    const [searchResult, setSearchResults] = useState([])
    const [keyword, setKeyword] = useState("")
    const [tagKeywords, settagKeywords] = useState("")
    const [isTag, setisTag] = useState(false)

    useEffect(() => {
        if (isTag) {
            searchTags()
        } else {
            search()
        }
        // new google.translate.TranslateElement({pageLanguage: 'en', }, 'google_translate_element');
        // search();
    }, [keyword])

    const toggleOpen = (e: any) => {
        setOpenModal(true)
        setModalType(e.currentTarget.id)
    }

    const onSidebarBarMenu = () => {
        document.dispatchEvent(toggleSidebar)
    }

    const onSearchChange = (e: any) => {
        let val = e.target.value
        console.log(val[0])
        if (val[0] === "#") {
            setKeyword(val)
            setisTag(true)
            return
        }
        setKeyword(e.target.value)
        setisTag(false)
    }

    const searchTags = () => {
        setTimeout(() => {
            let _keyword = JSON.parse(JSON.stringify(keyword))
            _keyword = _keyword.replace("#", "")
            console.log(_keyword)
            tagApi
                .search(_keyword)
                .then(res => {
                    console.log(res.data.data)
                    setSearchResults(res.data.data)
                })
                .catch(err => console.log(err))
        }, 400)
    }

    const search = () => {
        setTimeout(() => {
            SearchWeb.search(keyword)
                .then(res => {
                    setSearchResults(res.data.data || [])
                })
                .catch(err => console.log(err))
        }, 500)
    }

    return (
        <>
            <header>
                <div className="header fixed-top">
                    <div className="h_top">
                        <div className="mx_width">
                            <div className="row">
                                <div className="col-lg-3 d-flex justify-content-between">
                                    <Link
                                        to=""
                                        className="d-flex align-items-center"
                                        onClick={() => {
                                            window.location.href = "/"
                                        }}
                                    >
                                        <img src={Logo} alt={"logo"} className="logo" />
                                    </Link>
                                    {isLoggedIn ? (
                                        <div className="d-inline d-lg-none">
                                            <img
                                                onClick={onSidebarBarMenu}
                                                className="menu__icon"
                                                src={MenuHeaderIcon}
                                                alt="Menu Toggler"
                                            />
                                        </div>
                                    ) : null}
                                </div>
                                <div className="col-lg-6">
                                    <div className="header-serach-form">
                                        <div className="position-relative">
                                            <input
                                                type="text"
                                                className="form-control form-search"
                                                placeholder="Search YES!HUB"
                                                onFocus={() => setShowSearch(true)}
                                                onBlur={() =>
                                                    setTimeout(() => {
                                                        setShowSearch(false)
                                                    }, 100)
                                                }
                                                onChange={onSearchChange}
                                            />
                                            <div className="search-button">
                                                <button id="buttonSearch" className="btn btn-search">
                                                    <img src={SearchIcon} alt={"Search"} />
                                                </button>
                                            </div>
                                            {showSearch && (
                                                <div className="drop-down-placeholder">
                                                    {searchResult.map((item: any, idx: number) => (
                                                        <li className="nav-link">
                                                            {isTag && (
                                                                <a className="" href={`/tag/page/${item.name}`}>
                                                                    {`#${item.name}`}
                                                                </a>
                                                            )}
                                                            {!isTag && item?.post && (
                                                                <a className="" href={`/post/details/${item.post._id}`}>
                                                                    {isTag ? `#${item.name}` : item.title}
                                                                </a>
                                                            )}
                                                            {!isTag && item?.event && (
                                                                <a
                                                                    className=""
                                                                    href={`/event/details/${item.event._id}`}
                                                                >
                                                                    {item.title}
                                                                </a>
                                                            )}
                                                        </li>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3">
                                    {isLoggedIn ? (
                                        <>
                                            <UserDropDown />
                                            <div
                                                style={{ right: "1px", left: "1px" }}
                                                id="google_translate_element"
                                            ></div>
                                        </>
                                    ) : (
                                        <div className="header-user-login text-right">
                                            <button
                                                type="button"
                                                className="btn btn-signin"
                                                onClick={toggleOpen}
                                                id="login"
                                            >
                                                LOG IN
                                            </button>
                                            <button
                                                type="button"
                                                className="btn btn-signup"
                                                id="register"
                                                onClick={toggleOpen}
                                            >
                                                SIGN UP
                                            </button>
                                            {/* <div style={{right: "1px", left: '1px'}} id="google_translate_element"></div> */}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            {openModal && modals[modalType]}
            {/* <CovidBanner /> */}
        </>
    )
}

// const mapStateToProps = () => {
// 	return {}
// }

// export const connect(Header)(mapStateToProps)
