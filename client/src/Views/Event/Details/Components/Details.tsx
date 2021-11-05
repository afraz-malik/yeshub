import React, { useState } from "react"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEdit, faLink, faCheck } from "@fortawesome/free-solid-svg-icons"

import FormCheckBox from "../../../../Components/Form/FormCheckBox"

import IEvent from "../../../../Models/User/IEvent"
import ellipsis from "../../../../Helpers/Functions/ellipsis"
import { getDay, formatTime } from "../../../../Helpers/Date/time"
import assetUrl from "../../../../Helpers/Functions/assetUrl"
import camelCaseToSentence from "../../../../Helpers/Functions/camelCaseToWords"
import InterestedEvent from "../../../../Shared/HelperBtn/InterestedBtn"
import {
    FlagSvg,
    person,
    locationPoint,
    starBookmark,
    fasTimer,
    fasCalendar,
    fasUser,
    fasMarker,
    fasBookMark,
} from "../../../../Shared/Icons"
import dayjs from "dayjs"
import { formatDate } from "@fullcalendar/common"
import { Col } from "react-bootstrap"
import EventGoingInterestedComponent from "./EventGoingInterested"

export interface EventDetailsProps {
    event: IEvent | undefined
    onGoingChange?: (itm: any) => void
}

const pointStyle = {
    font: "Roboto",
    weight: "400",
    fontSize: "14px",
}
const EventDetails: React.FC<EventDetailsProps> = ({ event, onGoingChange }) => {
    console.log("event: ", event)
    const [eventState, seteventState] = useState<any>(event)

    if (!event) {
        return null
    }

    const eventTitleDateInfo = () => {
        return (
            <div className="event_metaInfo">
                <h2 style={{ fontSize: "26px", fontWeight: 700, color: "243C4B, 100%" }}>{eventState?.eventName}</h2>
                <div className="metaInfo-container">
                    <div id="event-HostBy">
                        {FlagSvg} <span id="hostBy_Title">Hosted by</span>
                        <span id="hostedBy_Val">{eventState?.hostedBy}</span>
                    </div>
                    <div id="event-DateTime">
                        <span>
                            {fasCalendar}
                            <span id="event-DateTime_date" style={{ marginLeft: "8px" }}>
                                {dayjs(eventState?.date?.startDate).format("DD MMM YYYY")}
                            </span>
                        </span>
                        <span>
                            {fasTimer}
                            <span id="event-DateTime_time" style={{ marginLeft: "8px" }}>
                                {dayjs(eventState?.time.startTime).format("hh:mm")} GMT+8
                            </span>
                        </span>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="event__details">
            <div className="d-flex justify-content-between align-items-center">
                <h1 className="event__title"></h1>
                {event?.isModerator ? (
                    <Link to={{ pathname: "/event/create-update", state: event }}>
                        <FontAwesomeIcon icon={faEdit} />
                    </Link>
                ) : null}
            </div>

            <div className="mc-border p-3">
                {eventTitleDateInfo()}
                {event?.images.length ? (
                    <div className="event__img">
                        {/* <img src={assetUrl(event?.images[0])} alt={event?.eventName} /> */}
                        <img
                            src={
                                "https://ae01.alicdn.com/kf/HTB1a8SScrGYBuNjy0Foq6AiBFXao/HUAYI-Solid-Old-Master-photography-filming-booth-Backgrounds-Digital-Printed-Professional-Portrait-Studio-Photo-D8965.jpg_q50.jpg"
                            }
                            alt={event?.eventName}
                        />
                    </div>
                ) : null}

                <div className="event__section">
                    <div className="row">
                        <div className="col-6 col-md-6 col-lg-6">
                            <div>
                                {fasUser} <span style={pointStyle}>Created By {event?.author?.userName}</span>
                            </div>
                        </div>
                        <div className="col-6 col-md-6 col-lg-6">
                            <div className="d-flex flex-column">
                                <div>
                                    {fasBookMark} <span style={pointStyle}>{"PHP 4000"}</span>
                                </div>
                                <div>
                                    {fasMarker} <span style={pointStyle}>{"Online event"}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <h6 className="event-head-text">Description:</h6> */}
                    <p style={{ marginTop: "1em" }} className="event-param-text">
                        {event?.description}
                    </p>
                </div>

                <div className="event-param-text" style={{ margin: "0 .6em" }}>
                    <p
                        style={{
                            marginBottom: "15px",
                            fontSize: "16p",
                            fontWeight: 700,
                            lineHeight: "20px",
                            color: "243C4B",
                        }}
                    >
                        Attributes
                    </p>
                    <div className="row" style={{ marginLeft: "20px", marginBottom: "1.4em" }}>
                        {eventState?.characteristics.map((itm: any, index: number) => (
                            <div className="col-6 md-6 lg-6">
                                <li>{itm}</li>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="event-param-text" style={{ margin: "0 .6em" }}>
                    <p
                        style={{
                            marginBottom: "15px",
                            fontSize: "16p",
                            fontWeight: 700,
                            lineHeight: "20px",
                            color: "243C4B",
                        }}
                    >
                        Related Link
                    </p>
                    <div className="d-flex flex-column" style={{ marginLeft: "20px", marginBottom: "1.4em" }}>
                        {eventState?.link.map((itm: any, index: number) => (
                            <>
                                <p>
                                    <a href={itm.url} target="_blank">
                                        <span style={{ marginRight: "1em" }}>{LinkIcon}</span>
                                        <span style={{ color: "blue" }}>{itm.title}</span>
                                    </a>
                                </p>
                            </>
                        ))}
                    </div>
                </div>

                <div className="event-param-text" style={{ margin: "0 .6em" }}>
                    <p
                        style={{
                            marginBottom: "15px",
                            fontSize: "16p",
                            fontWeight: 700,
                            lineHeight: "20px",
                            color: "243C4B",
                        }}
                    >
                        Event Details
                    </p>
                    <SubEventInfo subevents={eventState?.subEvent || []} />
                </div>
                <div className="event_goingInfo"></div>

                {event?._id && (
                    <div className="d-flex flex-row justify-content-end">
                        <EventGoingInterestedComponent
                            going={eventState?.going}
                            eventId={eventState?._id}
                            onMarkGoing={(going: any) => {
                                if (onGoingChange) {
                                    onGoingChange(going)
                                }
                                seteventState({ ...event, going: going })
                            }}
                        />
                    </div>

                    // <div className="event__section">
                    //     <div className="event-details-footer">
                    //         <div className="event-details">
                    //             <InterestedEvent isInterested={event.isSubscribed} type="event" id={event._id} />

                    //             <button onClick={() => {}} className="btn btn-warning icon__btn btn_going">
                    //                 <FontAwesomeIcon className="text-black" icon={faCheck} />
                    //                 <span>Going</span>
                    //             </button>
                    //         </div>
                    //     </div>
                    // </div>
                )}
            </div>
        </div>
    )
}

export default EventDetails

export const SubEventInfo: React.FC<any> = ({ subevents = [] }) => {
    const subEventStyle = {
        boxShadow: "(0px 10px 20px rgba(0, 0, 0, 0.05))",
        border: "1px solid #E6E6E6",
        borderRadius: "10px",
        padding: "1em",
        marginBottom: "1em",
    }

    return (
        <>
            {subevents.map((itm: any, index: number) => (
                <div className="subevent" key={index} style={subEventStyle}>
                    <p
                        style={{
                            marginBottom: "5px",
                            fontSize: "16p",
                            fontWeight: 700,
                            lineHeight: "20px",
                            color: "243C4B",
                        }}
                    >
                        {itm.title}, {dayjs(itm.endTime).diff(dayjs(itm.startTime), "hour", true)} hours
                    </p>
                    <div className="d-flex" style={{ marginBottom: "10px" }}>
                        <span style={{ ...pointStyle, marginRight: "2em" }}>
                            {fasCalendar} {dayjs(itm.date.startDate).format("DD MMM YYYY")}
                        </span>
                        <span style={pointStyle}>
                            {fasTimer} {dayjs(itm.startTime.startDate).format("hh:mmAZ[Z]")}
                        </span>
                    </div>
                    <p>{itm.description}</p>
                </div>
            ))}
        </>
    )
}

export const LinkIcon = (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M9.02953 6.96966C8.48346 6.42382 7.74297 6.11719 6.97087 6.11719C6.19877 6.11719 5.45827 6.42382 4.9122 6.96966L2.85287 9.02833C2.30678 9.57441 2 10.3151 2 11.0873C2 11.8596 2.30678 12.6003 2.85287 13.1463C3.39895 13.6924 4.13959 13.9992 4.91187 13.9992C5.68414 13.9992 6.42479 13.6924 6.97087 13.1463L8.0002 12.117"
            stroke="black"
            stroke-width="1.33333"
            stroke-linecap="round"
            stroke-linejoin="round"
        />

        <path
            d="M6.9707 9.02953C7.51677 9.57538 8.25727 9.88201 9.02937 9.88201C9.80147 9.88201 10.542 9.57538 11.088 9.02953L13.1474 6.97087C13.6935 6.42479 14.0002 5.68414 14.0002 4.91187C14.0002 4.13959 13.6935 3.39895 13.1474 2.85287C12.6013 2.30678 11.8606 2 11.0884 2C10.3161 2 9.57545 2.30678 9.02937 2.85287L8.00004 3.8822"
            stroke="black"
            stroke-width="1.33333"
            stroke-linecap="round"
            stroke-linejoin="round"
        />
    </svg>
)
