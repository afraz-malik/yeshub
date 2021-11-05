import * as React from "react"
import EventBody from "./EventBody"
import IEvent from "../../../Models/User/IEvent"
import EventHeader from "./EventHeader"

export interface NewsFeedEventProps {
    event: IEvent
}

const NewsFeedEvent: React.SFC<NewsFeedEventProps> = ({ event }) => {
    return (
        <div className="event-container pt-3">
            <div className="event-wrap">
                {event.knowledgeGroup.length > 0 && event.knowledgeGroup[0] ? (
                    <EventHeader community={event.knowledgeGroup[0]} />
                ) : null}
                <EventBody event={event} />
            </div>
        </div>
    )
}

export default NewsFeedEvent
