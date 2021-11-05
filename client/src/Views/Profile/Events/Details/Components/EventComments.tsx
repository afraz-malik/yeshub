import * as React from "react"
import FormTextArea from "../../../../../Components/Form/FormTextArea"

export interface EventCommentsProps {}

const EventComments: React.FC<EventCommentsProps> = () => {
    return (
        <div className="event__details event__comments mt-5">
            <h1 className="event__title">Comments</h1>
            <div className="mc-border pt-2 px-2">
                <FormTextArea
                    name="comment"
                    props={{ placeholder: "Write your comment..." }}
                    onChange={() => {}}
                />
            </div>
        </div>
    )
}

export default EventComments
