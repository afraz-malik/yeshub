import * as React from "react"
import ModeratorModal from "./EventFormModerators/ModeratorModal"

export interface EventModeratorListSidebarProps {
    eventID: string
    eventTitle: string
}

const EventModeratorListSidebar: React.FC<EventModeratorListSidebarProps> = ({ eventID, eventTitle }) => {
    const [isOpened, toggle] = React.useState(false)

    const toggleModal = () => {
        toggle(!isOpened)
    }

    return (
        <div className="event__info mc-border">
            <h6 className="heading-6 ad__title">Event Moderators</h6>
            <div className="event-detail-data">
                <p className="event-head-text">Choose and add Moderators from the members list.</p>
            </div>
            <button onClick={toggleModal} className="btn border-2 btn-outline-warning btn-block">
                Select Moderators
            </button>
            <ModeratorModal  title={eventTitle} eventID={eventID} isOpened={isOpened} toggle={toggleModal} />
        </div>
    )
}

export default EventModeratorListSidebar
