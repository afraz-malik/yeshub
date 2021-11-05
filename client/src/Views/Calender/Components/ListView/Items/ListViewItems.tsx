import React, { FC, ReactElement } from "react"

import Announcement from "../../../../../Controller/Home/Announcement/newDesign/Index"
import EventsInterface from "../../../../../Interface/Events/EventsInterface"

const ListViewItems: FC<EventsInterface> = ({ events = [] }): ReactElement => {
    return (
        <div className="event-cards-container">
            {events.map((item, idx) => (
                <Announcement event={item} key={idx} />
            ))}
        </div>
    )
}

export default ListViewItems
