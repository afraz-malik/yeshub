import React, { FC } from "react"

import Announcement from "../../../../Controller/Home/Announcement/newDesign/Index"
import EventsInterface from "../../../../Interface/Events/EventsInterface"

const EventsItems: FC<EventsInterface> = ({ events = [] }) => {
    return (
        <div className="profile_events__container">
            {events.map(item => (
                <Announcement key={item._id} event={item} />
            ))}
        </div>
    )
}

export default EventsItems
