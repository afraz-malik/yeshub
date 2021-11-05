import * as React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons"
import ModeratorModal from "./ModeratorModal"

export interface EventFormModeratorProps {
    eventID: string
    eventTitle: string
}

export const EventFormModeratorEvent = "EventFormModeratorEvent"

export const EventFormModeratorCustomEvent = new CustomEvent("EventFormModeratorEvent")

const EventFormModerator: React.FC<EventFormModeratorProps> = ({ eventID, eventTitle }) => {
    const [isModalOpened, toggleModal] = React.useState(false)

    const openModal = () => {
        toggleModal(!isModalOpened)
    }

    return (
        <div className="mt-3 mb-4">
            <h6 className="heading-6 section__heading-custom ">
                <span>Event Moderators</span>
                <small>Choose and add Moderators from the members list.</small>
            </h6>

            <ModeratorModal title={eventTitle} eventID={eventID} toggle={openModal} isOpened={isModalOpened} />

            <span className="d-flex event__form-footer">
                <span onClick={openModal}>
                    <FontAwesomeIcon icon={faPlusCircle} /> Add Moderators
                </span>
            </span>
        </div>
    )
}

export default EventFormModerator
