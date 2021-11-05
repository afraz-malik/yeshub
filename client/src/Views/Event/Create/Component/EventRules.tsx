import * as React from "react"

export interface EventRulesProps {}

const EventRules: React.FC<EventRulesProps> = () => {
    return (
        <div className="event__info">
            {/* <h3 className="title">Event Creation Reminders</h3> */}
            <h6 className="heading-6 ad__title">Event Creation Reminders</h6>

            <ul className="rules__list">
                <li>
                    Make sure to{" "}
                    <span className="font-weight-bold">check first</span> if
                    this event already exists.
                </li>
                <li>
                    You can invite other users to{" "}
                    <span className="font-weight-bold">moderate</span> this
                    event.
                </li>
                <li>
                    Moderators can{" "}
                    <span className="font-weight-bold">make edits</span> to
                    event details and help manage the{" "}
                    <span className="font-weight-bold">comments section</span>
                    of the event page.
                </li>
            </ul>
        </div>
    )
}

export default EventRules
