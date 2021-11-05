import React, { FC } from "react"

import IEvent from "../../../Models/User/IEvent"
import EventBody from "./EventBody"

export interface Announcement {
    event: IEvent
    link?: string
}

const Announcement: FC<any> = ({ event, link }) => {
    console.log("link: ", link)
    return (
        <div className="event-container pt-3">
            <div className="event-wrap">
                <EventBody event={event} link={link} />
            </div>
        </div>
    )
}

export default Announcement
