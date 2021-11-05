import * as React from "react"
import IEvent, { IEventModerator } from "../../../../Models/User/IEvent"

export interface EventInfoProps {
    event: IEvent
}

const EventModerators: React.FC<EventInfoProps> = ({ event }) => {
    return (
        <div className="event__info mc-border">
            <h6 className="heading-6 ad__title">Event Page Moderation</h6>
            <div className="event-detail-data">
                <div className="d-flex mb-3">
                    <div className="left">
                        <span className="event-head-text">Creator</span>
                    </div>
                    <div className="right">
                        <span className="event-param-text">{event?.author?.userName || ""}</span>
                    </div>
                </div>
                <div className="d-flex mb-3">
                    <div className="left">
                        <span className="event-head-text">Mod/s</span>
                    </div>
                    <div className="right">
                        <span className="event-param-text">
                            {((event.moderators || []) as IEventModerator[])
                                .map(moderator => moderator.userName)
                                .join(", ")}
                        </span>
                    </div>
                </div>
            </div>

            <button className="btn border-2 btn-outline-warning btn-block">Volunteer as Mod</button>
        </div>
    )
}

export default EventModerators
