import React from "react"
import IEvent from "../../Models/User/IEvent"
import relativeDate from "../../Helpers/Date/relativeDate"
import { getDay, getYear } from "../../Helpers/Date/time"

export interface ShareEventProps {
    event: IEvent
}

const ShareEvent: React.FC<ShareEventProps> = ({ event }) => {
    return (
        <div className="community-content my-3">
            <div className="mc-border p-3">
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
                            <div className="event-time text-right">
                                <div className="posting-time post-in">{relativeDate(event.date.startDate)}</div>
                            </div>

                            <div className="event-texts">
                                <p className="post-status-text mb-0 py-1">{event.eventName}</p>
                                <div className="d-flex flex-row">
                                    <span className="post-title">Hosted By:</span>
                                    <span className="post-title ml-1">{event.hostedBy}</span>
                                </div>
                                <p className="general-text">{event.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShareEvent
