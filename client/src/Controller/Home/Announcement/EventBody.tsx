import * as React from "react"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck, faEdit } from "@fortawesome/free-solid-svg-icons"

import SavePost from "../../../Shared/HelperBtn/SavePost"
import SharedBtn from "../../../Shared/HelperBtn/SharedBtn"
import ReportBtn from "../../../Shared/HelperBtn/ReportBtn"
import EventDropdown from "./EventDropdown"

import IEvent from "../../../Models/User/IEvent"
import { getDay, getYear } from "../../../Helpers/Date/time"
import eventApi from "./../../../Helpers/Request/Services/Event/Event"
import { isEventEditAllowed } from "../../../Helpers/Functions/isAllowed"
import parseRequestStatus, { REQUEST_STATUS } from "../../../Helpers/Functions/parseRequestStatus"
import { DELETE_EVENT_EVENT } from "../../../Constants/constants"

export interface EventBodyProps {
    event: IEvent
    link?: string
}

const EventBody: React.SFC<EventBodyProps> = ({ event, link }) => {
    const [isFeatured, toggleFeatured] = React.useState(parseRequestStatus(event.isFeatured))

    const requestFeaturedEvent = () => {
        eventApi.requestFeatured(event._id).then(() => {
            toggleFeatured(REQUEST_STATUS.PENDING)
        })
    }

    const deleteEvent = () => {
        eventApi.delete(event._id).then(() => {
            document.dispatchEvent(
                new CustomEvent(DELETE_EVENT_EVENT, {
                    detail: { id: event._id },
                })
            )
        })
    }

    const onShareDelete = (comId: string) => {
        eventApi.deleteCommunityEvent(comId, event._id).then(() => {
            document.dispatchEvent(
                new CustomEvent(DELETE_EVENT_EVENT, {
                    detail: {
                        id: event._id,
                        communityId: comId,
                    },
                })
            )
        })
    }

    return (
        <div className="event-body">
            <div className="event-left">
                <div className="eveleft-wrap">
                    <div className="event-date">
                        <div className="event-day">{getDay(event.date.startDate)}</div>
                        <div className="event-month">{getYear(event.date.startDate)}</div>
                    </div>
                </div>
            </div>
            <div className="event-right">
                <div className="everight-wrap">
                    <Link
                        to={{
                            pathname: link ? link : `/event/details/${event._id}`,
                            state: link ? event : { event },
                        }}
                    >
                        <div className="d-flex justify-content-between align-items-start">
                            <h4 className="title">{event.eventName}</h4>

                            {(isFeatured === REQUEST_STATUS.PENDING || isFeatured === REQUEST_STATUS.ACCEPTED) &&
                            isEventEditAllowed(event) ? (
                                <span className="badge badge-info">
                                    {isFeatured === REQUEST_STATUS.ACCEPTED ? "Featured" : "Pending"}
                                </span>
                            ) : null}
                        </div>
                        <h6 className="metadata">
                            {event.hostedBy} | {event.coHostedBy}
                        </h6>
                        <p className="description">{event.description}</p>
                    </Link>
                </div>

                <div className="post-footer event__footer mt-2">
                    <div className="lefts">
                        <SavePost isSaved={event.isSaved} type="event" id={event._id} />
                        <div className="post-share postShare">
                            <SharedBtn type="event" item={event} />
                        </div>
                    </div>
                    <div className="rights">
                        {isFeatured !== REQUEST_STATUS.ACCEPTED &&
                        isFeatured !== REQUEST_STATUS.PENDING &&
                        isEventEditAllowed(event) ? (
                            <div className="post-share postShare" onClick={requestFeaturedEvent}>
                                <FontAwesomeIcon className="icon" icon={faCheck} />{" "}
                                <span className="text">Feature</span>
                            </div>
                        ) : null}
                        {isEventEditAllowed(event) ? (
                            <Link to={{ pathname: "/event/create-update", state: event }} className="post-report mr-3">
                                <span className="icon">
                                    <FontAwesomeIcon icon={faEdit} />
                                </span>
                                <span className="text">Edit</span>
                            </Link>
                        ) : null}

                        <ReportBtn id={event._id} type="event" />
                        <EventDropdown item={event} onShareDelete={onShareDelete} onDelete={deleteEvent} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EventBody
