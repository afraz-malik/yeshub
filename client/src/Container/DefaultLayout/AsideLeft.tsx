import React, { FC, useCallback, useEffect, useState } from "react"
import { NavLink } from "react-router-dom"

import { CloseIcon } from "../../Shared/Images/Images"
import { isLoggedIn } from "../../Hooks/Auth/getAuth"

const AsideLeft: FC = () => {
    const [isActive, toggleSideBar] = useState(false)
    const sidebarToggler = useCallback(() => toggleSideBar(!isActive), [isActive])

    useEffect(() => {
        document.addEventListener("toggleSidebar", sidebarToggler)
        return () => document.removeEventListener("toggleSidebar", sidebarToggler)
    }, [sidebarToggler])
    return (
        <div className={`mc-left pt-lg-0 pt-5 sidebar__menu ${isActive ? "active" : ""}`}>
            <div className="close__icon">
                <img src={CloseIcon} alt="Close Sidebar" onClick={sidebarToggler} />
            </div>
            {isLoggedIn ? (
                <div className="mc-border side__menu top__sticky-sidebar">
                    <div className="mc-left-content">
                        <div className="mc-left-wrap py-2">
                            <ul className="list-unstyled">
                                <li>
                                    <NavLink
                                        exact
                                        className="sidebar--menu__item"
                                        activeClassName="active"
                                        to="/post/create"
                                    >
                                        <div className="mcl-data">
                                            <div className="mcl-data-image">
                                                <svg
                                                    width="22"
                                                    height="22"
                                                    viewBox="0 0 22 22"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M2.75 15.8125V19.25H6.1875L16.3258 9.11164L12.8883 5.67414L2.75 15.8125ZM18.9842 6.45331C19.3417 6.09581 19.3417 5.51831 18.9842 5.16081L16.8392 3.01581C16.4817 2.65831 15.9042 2.65831 15.5467 3.01581L13.8692 4.69331L17.3067 8.13081L18.9842 6.45331Z"
                                                        fill="#243C4B"
                                                    />
                                                </svg>
                                            </div>
                                            <div className="mcl-data-text mw-80">
                                                <span>Create Post</span>
                                            </div>
                                        </div>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        exact
                                        className="sidebar--menu__item"
                                        activeClassName="active"
                                        to="/event/create-update"
                                    >
                                        <div className="mcl-data">
                                            <div className="mcl-data-image">
                                                <svg
                                                    width="24"
                                                    height="24"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M17 12H12V17H17V12ZM16 1V3H8V1H6V3H5C3.89 3 3.01 3.9 3.01 5L3 19C3 20.1 3.89 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3H18V1H16ZM19 19H5V8H19V19Z"
                                                        fill="#243C4B"
                                                    />
                                                </svg>
                                            </div>
                                            <div className="mcl-data-text mw-80">
                                                <span>Create Event</span>
                                            </div>
                                        </div>
                                    </NavLink>
                                </li>
                            </ul>
                            <ul className="list-unstyled">
                                <li>
                                    <NavLink
                                        to="/solution"
                                        exact
                                        className="sidebar--menu__item"
                                        activeClassName="active"
                                    >
                                        <div className="mcl-data">
                                            <div className="mcl-data-image">
                                                <svg
                                                    width="18"
                                                    height="18"
                                                    viewBox="0 0 18 18"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M10.1258 11.5588L11.5558 10.1288L17.9958 16.5718L16.5688 17.9988L10.1258 11.5588ZM14.4188 5.82876L17.2788 2.96876C13.3288 -0.981239 6.92876 -0.991239 2.97876 2.94876C6.90876 1.64876 11.2888 2.69876 14.4188 5.82876ZM2.94876 2.97876C-0.991239 6.92876 -0.981239 13.3288 2.96876 17.2788L5.82876 14.4188C2.69876 11.2888 1.64876 6.90876 2.94876 2.97876ZM2.96876 2.95876L2.95876 2.96876C2.57876 5.97876 4.12876 9.84876 7.25876 12.9888L12.9888 7.25876C9.85876 4.12876 5.97876 2.57876 2.96876 2.95876Z"
                                                        fill="#243C4B"
                                                    />
                                                </svg>
                                            </div>
                                            <div className="mcl-data-text   mw-80">
                                                <span>Solutions</span>
                                            </div>
                                        </div>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        exact
                                        className="sidebar--menu__item"
                                        activeClassName="active"
                                        to="/communities"
                                    >
                                        <div className="mcl-data">
                                            <div className="mcl-data-image">
                                                <svg
                                                    width="22"
                                                    height="14"
                                                    viewBox="0 0 22 14"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M15 6C16.66 6 17.99 4.66 17.99 3C17.99 1.34 16.66 0 15 0C13.34 0 12 1.34 12 3C12 4.66 13.34 6 15 6ZM7 6C8.66 6 9.99 4.66 9.99 3C9.99 1.34 8.66 0 7 0C5.34 0 4 1.34 4 3C4 4.66 5.34 6 7 6ZM7 8C4.67 8 0 9.17 0 11.5V14H14V11.5C14 9.17 9.33 8 7 8ZM15 8C14.71 8 14.38 8.02 14.03 8.05C15.19 8.89 16 10.02 16 11.5V14H22V11.5C22 9.17 17.33 8 15 8Z"
                                                        fill="#243C4B"
                                                    />
                                                </svg>
                                            </div>
                                            <div className="mcl-data-text   mw-80">
                                                <span>My Communities</span>
                                            </div>
                                        </div>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        exact
                                        className="sidebar--menu__item"
                                        activeClassName="active"
                                        to="/events/calendar"
                                    >
                                        <div className="mcl-data">
                                            <div className="mcl-data-image">
                                                <svg
                                                    width="20"
                                                    height="23"
                                                    viewBox="0 0 20 23"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M15.5556 10H4.44444V12.2222H15.5556V10ZM17.7778 2.22222H16.6667V0H14.4444V2.22222H5.55556V0H3.33333V2.22222H2.22222C0.988889 2.22222 0.0111111 3.22222 0.0111111 4.44444L0 20C0 21.2222 0.988889 22.2222 2.22222 22.2222H17.7778C19 22.2222 20 21.2222 20 20V4.44444C20 3.22222 19 2.22222 17.7778 2.22222ZM17.7778 20H2.22222V7.77778H17.7778V20ZM12.2222 14.4444H4.44444V16.6667H12.2222V14.4444Z"
                                                        fill="#243C4B"
                                                    />
                                                </svg>
                                            </div>
                                            <div className="mcl-data-text   mw-80">
                                                <span>Calendar</span>
                                                {/* <img src="https://www.ingecogears.com/wp-content/uploads/2019/01/coming-soon.jpg" style={{width: "50px"}} alt=""/> */}
                                            </div>
                                        </div>
                                    </NavLink>
                                </li>
                            </ul>
                            <ul className=" list-unstyled">
                                <li>
                                    <NavLink
                                        exact
                                        className="sidebar--menu__item"
                                        activeClassName="active"
                                        to={"/profile"}
                                    >
                                        <div className="mcl-data">
                                            <div className="mcl-data-image">
                                                <span className="">
                                                    <svg
                                                        width="18"
                                                        height="20"
                                                        viewBox="0 0 18 20"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            d="M16 2H15V0H13V2H5V0H3V2H2C0.89 2 0 2.9 0 4V18C0 19.1 0.89 20 2 20H16C17.1 20 18 19.1 18 18V4C18 2.9 17.1 2 16 2ZM9 5C10.66 5 12 6.34 12 8C12 9.66 10.66 11 9 11C7.34 11 6 9.66 6 8C6 6.34 7.34 5 9 5ZM15 17H3V16C3 14 7 12.9 9 12.9C11 12.9 15 14 15 16V17Z"
                                                            fill="#243C4B"
                                                        />
                                                    </svg>
                                                </span>
                                            </div>
                                            <div className="mcl-data-text   mw-80">
                                                <span>My Profile</span>
                                            </div>
                                        </div>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        exact
                                        className="sidebar--menu__item"
                                        activeClassName="active"
                                        to={"/profile/events"}
                                    >
                                        <div className="mcl-data">
                                            <div className="mcl-data-image">
                                                <svg
                                                    width="18"
                                                    height="20"
                                                    viewBox="0 0 18 20"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M13.53 10.06L12.47 9L7.59 13.88L5.47 11.76L4.41 12.82L7.59 16L13.53 10.06ZM16 2H15V0H13V2H5V0H3V2H2C0.89 2 0.00999999 2.9 0.00999999 4L0 18C0 19.1 0.89 20 2 20H16C17.1 20 18 19.1 18 18V4C18 2.9 17.1 2 16 2ZM16 18H2V7H16V18Z"
                                                        fill="#243C4B"
                                                    />
                                                </svg>
                                            </div>
                                            <div className="mcl-data-text   mw-80">
                                                <span>My Events</span>
                                            </div>
                                        </div>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        exact
                                        className="sidebar--menu__item"
                                        activeClassName="active"
                                        to={"/profile/subscribedEvents"}
                                    >
                                        <div className="mcl-data">
                                            <div className="mcl-data-image">
                                                <svg
                                                    width="18"
                                                    height="20"
                                                    viewBox="0 0 18 20"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M13.53 10.06L12.47 9L7.59 13.88L5.47 11.76L4.41 12.82L7.59 16L13.53 10.06ZM16 2H15V0H13V2H5V0H3V2H2C0.89 2 0.00999999 2.9 0.00999999 4L0 18C0 19.1 0.89 20 2 20H16C17.1 20 18 19.1 18 18V4C18 2.9 17.1 2 16 2ZM16 18H2V7H16V18Z"
                                                        fill="#243C4B"
                                                    />
                                                </svg>
                                            </div>
                                            <div className="mcl-data-text   mw-80">
                                                <span>Subscribed Events</span>
                                            </div>
                                        </div>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        exact
                                        className="sidebar--menu__item"
                                        activeClassName="active"
                                        to="/profile/points"
                                    >
                                        <div className="mcl-data">
                                            <div className="mcl-data-image">
                                                <svg
                                                    width="18"
                                                    height="18"
                                                    viewBox="0 0 18 18"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M16 0H2C0.9 0 0 0.9 0 2V16C0 17.1 0.9 18 2 18H16C17.1 18 18 17.1 18 16V2C18 0.9 17.1 0 16 0ZM6 14H4V7H6V14ZM10 14H8V4H10V14ZM14 14H12V10H14V14Z"
                                                        fill="#243C4B"
                                                    />
                                                </svg>
                                            </div>
                                            <div className="mcl-data-text   mw-80">
                                                <span>My Journey</span>
                                                {/* <img src="https://www.ingecogears.com/wp-content/uploads/2019/01/coming-soon.jpg" style={{width: "50px"}} alt=""/> */}
                                            </div>
                                        </div>
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink
                                        exact
                                        className="sidebar--menu__item"
                                        activeClassName="active"
                                        to="/profile/stats"
                                    >
                                        <div className="mcl-data">
                                            <div className="mcl-data-image">
                                                <svg
                                                    width="18"
                                                    height="18"
                                                    viewBox="0 0 18 18"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M16 0H2C0.9 0 0 0.9 0 2V16C0 17.1 0.9 18 2 18H16C17.1 18 18 17.1 18 16V2C18 0.9 17.1 0 16 0ZM6 14H4V7H6V14ZM10 14H8V4H10V14ZM14 14H12V10H14V14Z"
                                                        fill="#243C4B"
                                                    />
                                                </svg>
                                            </div>
                                            <div className="mcl-data-text   mw-80">
                                                <span>My Stats</span>
                                                {/* <img src="https://www.ingecogears.com/wp-content/uploads/2019/01/coming-soon.jpg" style={{width: "50px"}} alt=""/> */}
                                            </div>
                                        </div>
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink
                                        exact
                                        className="sidebar--menu__item"
                                        activeClassName="active"
                                        to="/profile/saved"
                                    >
                                        <div className="mcl-data">
                                            <div className="mcl-data-image">
                                                <svg
                                                    width="18"
                                                    height="22"
                                                    viewBox="0 0 18 22"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M16 17L18 18V2C18 0.9 17.1 0 16 0H5.99C4.89 0 4 0.9 4 2H14C15.1 2 16 2.9 16 4V17ZM12 4H2C0.9 4 0 4.9 0 6V22L7 19L14 22V6C14 4.9 13.1 4 12 4Z"
                                                        fill="#243C4B"
                                                    />
                                                </svg>
                                            </div>
                                            <div className="mcl-data-text   mw-80">
                                                <span>Saved</span>
                                            </div>
                                        </div>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        exact
                                        className="sidebar--menu__item"
                                        activeClassName="active"
                                        to={"/profile/drafts"}
                                    >
                                        <div className="mcl-data">
                                            <div className="mcl-data-image">
                                                <svg
                                                    width="19"
                                                    height="22"
                                                    viewBox="0 0 19 22"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M14 0H2C0.9 0 0 0.9 0 2V16H2V2H14V0ZM13 4L19 10V20C19 21.1 18.1 22 17 22H5.99C4.89 22 4 21.1 4 20L4.01 6C4.01 4.9 4.9 4 6 4H13ZM12 11H17.5L12 5.5V11Z"
                                                        fill="#243C4B"
                                                    />
                                                </svg>
                                            </div>
                                            <div className="mcl-data-text   mw-80">
                                                <span>Drafts</span>
                                            </div>
                                        </div>
                                    </NavLink>
                                </li>
                                {/* <li>
                                    <NavLink activeClassName='active' to="#">
                                        <div className="mcl-data">
                                            <div className="mcl-data-image">
                                                <img src={Logo} alt={"logo"} />
                                            </div>
                                            <div className="mcl-data-text">
                                                <span>Premium</span>
                                            </div>
                                        </div>
                                    </NavLink>
                                </li> */}
                            </ul>
                            <ul className=" list-unstyled">
                                <li>
                                    <NavLink
                                        exact
                                        className="sidebar--menu__item"
                                        activeClassName="active"
                                        to="/profile/settings"
                                    >
                                        <div className="mcl-data">
                                            <div className="mcl-data-image">
                                                <svg
                                                    width="23"
                                                    height="22"
                                                    viewBox="0 0 23 22"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M21.7444 17.9002L12.6444 8.80016C13.5444 6.50016 13.0444 3.80016 11.1444 1.90016C9.14437 -0.0998415 6.14437 -0.499841 3.74437 0.600159L8.04437 4.90016L5.04437 7.90016L0.644373 3.60016C-0.555627 6.00016 -0.055627 9.00016 1.94437 11.0002C3.84437 12.9002 6.54437 13.4002 8.84437 12.5002L17.9444 21.6002C18.3444 22.0002 18.9444 22.0002 19.3444 21.6002L21.6444 19.3002C22.1444 18.9002 22.1444 18.2002 21.7444 17.9002Z"
                                                        fill="#243C4B"
                                                    />
                                                </svg>
                                            </div>
                                            <div className="mcl-data-text   mw-80">
                                                <span>Settings</span>
                                            </div>
                                        </div>
                                    </NavLink>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    )
}
export default AsideLeft
