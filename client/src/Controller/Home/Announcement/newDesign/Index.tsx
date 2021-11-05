import React, { FC, useState } from "react"

import IEvent from "../../../../Models/User/IEvent"
import EventBody from "./EventBody"

export interface Announcement {
    event: IEvent
    link?: string
}

const Announcement: FC<Announcement> = ({ event, link }) => {
    const [eventItem, seteventItem] = useState(event)
    const [isGoing, setisGoing] = useState(event.going)
    return (
        <div className="event-card-container pt-3">
            <div className="event-card-wrap">
                {event && (
                    <EventBody
                        event={event}
                        going={isGoing}
                        onMarkGoing={(going: any) => setisGoing(going)}
                        link={link}
                    />
                )}
            </div>
        </div>
    )
}

export default Announcement
