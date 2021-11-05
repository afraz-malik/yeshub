// @ts-nocheck

import React, { useState, useEffect, lazy, Suspense, createRef } from "react"
import { NavLink, Route, Switch, useRouteMatch } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch, faListUl, faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons"

import MainContent from "../../Controller/Main/Content"
import AsideRightEventContent from "./Components/AsideRightEventContent"
// import CalendarView from "./Components/CalenderView"

import IEvent from "../../Models/User/IEvent"
import eventApi from "./../../Helpers/Request/Services/Event/Event"
import Loader from "../../Shared/Loader"
import EventBus from "../../Helpers/Request/Services/event-bus"
import { useLocation, useHistory } from "react-router-dom"

const ListView = lazy(() => import("./Components/ListView"))
const CalendarView = lazy(() => import("./Components/CalenderView"))

const EventCalender = () => {
    let { path, url } = useRouteMatch()
    const [keywords, setKeyWords] = useState("")
    const [calendarUpdate, setCalendarUpdate] = useState(0)
    const [searchInput, setsearchInput] = useState(false)
    const [events, setEvents] = useState<IEvent[]>([])
    let { pathname } = useLocation()
    let calendarRef = React.useRef(null)

    useEffect(() => {
        eventApi.fetchApproved(1).then(response => {
            setEvents(response.data.data.docs)
        })
    }, [])

    const onSearchChange = (e: any) => {
        setKeyWords(e.target.value)
    }

    const searchEvent = () => {
        eventApi.simpleSearch(keywords).then(res => {
            EventBus.dispatch("searched-events", { detail: res.data.data })
        })
    }

    const showTodate = () => {
        let calendarApi = calendarRef.current.getApi()
        calendarApi.today()
        setCalendarUpdate(calendarUpdate + 1)
    }

    const showNextDate = () => {
        let calendarApi = calendarRef.current.getApi()
        calendarApi.prev()

        setCalendarUpdate(calendarUpdate + 1)
    }

    const showPreDate = () => {
        let calendarApi = calendarRef.current.getApi()
        calendarApi.incrementDate({ month: 1 })
        setCalendarUpdate(calendarUpdate + 1)
    }

    return (
        <MainContent asideRightContent={<AsideRightEventContent />}>
            <div className="cp-wrap">
                <div className="cp-header pSb-1">
                    <div className="d-flex justify-content-between align-items-center  mt-2 pb-4">
                        <div className="view-form">
                            <ul className="list-unstyled d-flex mb-0 view-form-list clander__options_btns">
                                <li className={pathname == "/events/calendar" ? "isActive__Tab" : ""}>
                                    <NavLink to={path} exact activeClassName={"active"}>
                                        <div className="cl-view">
                                            <span className="icon">
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
                                            </span>
                                            <span className="text" onClick={() => setsearchInput(false)}>
                                                Calendar
                                            </span>
                                        </div>
                                    </NavLink>
                                </li>
                                <li className={pathname == "/events/calendar/list" ? "isActive__Tab" : ""}>
                                    <NavLink to={`${url}/list`} activeClassName={"active"}>
                                        <div className="cl-view">
                                            <span className="icon">
                                                <FontAwesomeIcon width="24" height="24" icon={faListUl} />
                                            </span>
                                            <span className="text" onClick={() => setsearchInput(true)}>
                                                List
                                            </span>
                                        </div>
                                    </NavLink>
                                </li>
                            </ul>
                        </div>
                        {/* 23456789 */}

                        {pathname == "/events/calendar" && (
                            <div className="view-form">
                                <ul className="list-unstyled d-flex mb-0 view-form-list clander__navigation_btns">
                                    <li>
                                        <div className="cl-view" onClick={() => showTodate()}>
                                            <span className="text">Today</span>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="cl-view" onClick={() => showNextDate()}>
                                            <span className="icon">
                                                <FontAwesomeIcon width="24" height="24" icon={faCaretLeft} />
                                            </span>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="cl-view" onClick={() => showPreDate()}>
                                            <span className="icon">
                                                <FontAwesomeIcon width="24" height="24" icon={faCaretRight} />
                                            </span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        )}
                        {/* 34567890 */}
                    </div>
                </div>
                <Suspense fallback={<Loader />}>
                    <Switch>
                        <Route
                            path={`${path}/list`}
                            render={() => <ListView onSearchChange={onSearchChange} searchEvent={searchEvent} />}
                        />

                        <Route
                            exact
                            path={path}
                            render={() => (
                                <CalendarView
                                    events={events}
                                    calendarRef={calendarRef}
                                    calendarUpdate={calendarUpdate}
                                />
                            )}
                        />
                    </Switch>
                </Suspense>
            </div>
        </MainContent>
    )
}

export default EventCalender
