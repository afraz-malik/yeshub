import * as React from "react"
import SharedBtn from "../../../../Shared/HelperBtn/SharedBtn"
import { ReportIcon } from "../../../../Shared/Icons"

import IEvent from "../../../../Models/User/IEvent"
import { formatTime } from "../../../../Helpers/Date/time"

import eventApi from "./../../../../Helpers/Request/Services/Event/Event"

export interface EventInfoProps {
    event: IEvent
}

const EventInfo: React.FC<any> = ({ event }) => {
    const [isSaved, toggleSaved] = React.useState(false)

    const onSaveEvent = () => {
        eventApi.save(event._id).then(() => {
            toggleSaved(!isSaved)
        })
    }

    return (
        <div className="event__info mc-border mt-lg-0">
            <h6 className="heading-6 ad__title">Event Details</h6>
            <div className="event-detail-data">
                <div className="d-flex mb-3">
                    <div className="left">
                        <span className="event-head-text">Date</span>
                    </div>
                    <div className="right">
                        <span className="event-param-text">
                            {formatTime(event?.date.startDate.toLocaleString() || "", "DD MMM YYYY")}
                        </span>
                    </div>
                </div>
                <div className="d-flex mb-3">
                    <div className="left">
                        <span className="event-head-text">Time</span>
                    </div>
                    <div className="right">
                        <span className="event-param-text">
                            {formatTime(event?.time?.startTime.toLocaleString() || "")} to{" "}
                            {formatTime(event?.time?.endTime || "")}
                        </span>
                    </div>
                </div>

                <div className="d-flex mb-3">
                    <div className="left">
                        <span className="event-head-text">Address</span>
                    </div>
                    <div className="right">
                        <span className="event-param-text">{event?.address || ""}</span>
                    </div>
                </div>

                <div className="d-flex mb-3">
                    <div className="left">
                        <span className="event-head-text">City</span>
                    </div>
                    <div className="right">
                        <span className="event-param-text">{event?.city}</span>
                    </div>
                </div>

                <div className="d-flex mb-3">
                    <div className="left">
                        <span className="event-head-text">Country</span>
                    </div>
                    <div className="right">
                        <span className="event-param-text">{event?.country}</span>
                    </div>
                </div>

                <div className="d-flex mb-3">
                    <div className="left">
                        <span className="event-head-text">Host</span>
                    </div>
                    <div className="right">
                        <span className="event-param-text">{event?.hostedBy}</span>
                    </div>
                </div>
                <div className="d-flex mb-3">
                    <div className="left">
                        <span className="event-head-text">Co-Host</span>
                    </div>
                    <div className="right">
                        <span className="event-param-text">{event?.coHostedBy}</span>
                    </div>
                </div>
            </div>
            <div className="form-group mb-0">
                <button className="btn btn-view" onClick={onSaveEvent}>
                    {isSaved ? "Unsave" : "Save"} Event
                </button>
                <div className="w-100 mt-2 align-items-center d-flex justify-content-between">
                    <SharedBtn type="event" item={event} />

                    <div className="report--icon">
                        {ReportIcon}
                        <div className="text">Report</div>
                    </div>
                </div>
            </div>
            {/* ) : (
                <button className="btn btn-view">Sign in to save event</button>
            )} */}
        </div>
    )
}

export default EventInfo
