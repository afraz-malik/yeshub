import React, { useState } from "react"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck, faEdit } from "@fortawesome/free-solid-svg-icons"
// import { faStart } from "@fortawesome/free-regular-svg-icons"

import SavePost from "../../../../Shared/HelperBtn/SavePost"
import InterestedEvent from "../../../../Shared/HelperBtn/InterestedBtn"
import SharedBtn from "../../../../Shared/HelperBtn/SharedBtn"
import ReportBtn from "../../../../Shared/HelperBtn/ReportBtn"
import EventDropdown from "./EventDropdown"

import IEvent from "../../../../Models/User/IEvent"
import { getDay, getYear, getDayNumb, getMonth, formatTime } from "../../../../Helpers/Date/time"
import eventApi from "./../../../../Helpers/Request/Services/Event/Event"
import { isEventEditAllowed } from "../../../../Helpers/Functions/isAllowed"
import parseRequestStatus, { REQUEST_STATUS } from "../../../../Helpers/Functions/parseRequestStatus"
import { DELETE_EVENT_EVENT } from "../../../../Constants/constants"
import Items from "../../../../Views/Groups/List/Items"
import EventApi from "../../../../Helpers/Request/Services/Event/Event"
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from "reactstrap"
import EventGoingInterestedComponent from "../../../../Views/Event/Details/Components/EventGoingInterested"
import assetUrl from "../../../../Helpers/Functions/assetUrl"
import { PlaceholderImage } from "../../../../Shared/Images/Images"
export interface EventBodyProps {
    event: IEvent
    link?: string
    onMarkGoing?: any
    going?: any
}

const EventBody: React.SFC<EventBodyProps> = ({ event, link, onMarkGoing, going }) => {
    const [isFeatured, toggleFeatured] = React.useState(parseRequestStatus(event?.isFeatured))
    const markGoing = () => {}

    const [loaded, setloaded] = useState(false)
    return (
        <div className="event-card-body">
            <Link
                to={{
                    pathname: link ? link : `/event/details/${event?._id}`,
                    state: link ? event : { event },
                }}
            >
                <div className="event-card-img">
                    {!loaded && <img src={PlaceholderImage} />}

                    <img
                        alt={""}
                        onLoad={() => setloaded(true)}
                        style={{ display: loaded ? "block" : "none" }}
                        src={assetUrl(event?.images[0]) || "https://api.hub.yesdigital.org/post/1596431056031.png"}
                    />
                </div>
                <div className="event-card-tite">
                    <p>{event?.eventName}</p>
                    <p>{event?.hostedBy}</p>
                </div>
            </Link>
            <div className="evet-card-yellow-line" />
            <div className="event-card-time">
                <div className="event-card-times">
                    <p>
                        {getDayNumb(event?.date.startDate)} <b>{getMonth(event?.date.startDate)}</b>{" "}
                        {getYear(event?.date.startDate)}
                    </p>
                    <p>
                        <b>{formatTime(event?.time.startTime, "H A")}</b>&nbsp; GMT +8
                    </p>
                </div>
                <div className="event-card-save">
                    <SavePost isSaved={event?.isSaved} type="event" id={event?._id} hideLabel={true} />
                </div>
            </div>

            <EventGoingInterestedComponent
                going={going}
                eventId={event?._id}
                onMarkGoing={(e: any) => onMarkGoing(e)}
            />
        </div>
    )
}

export default EventBody
