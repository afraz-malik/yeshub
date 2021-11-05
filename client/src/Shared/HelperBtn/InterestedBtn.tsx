import * as React from "react"
import Post from "../../Helpers/Request/Services/Post/Post"
import eventApi from "../../Helpers/Request/Services/Event/Event"
import { isLoggedIn } from "../../Hooks/Auth/getAuth"
import { SAVED_POST_EVENT, SAVED_EVENT_EVENT } from "../../Constants/constants"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck } from "@fortawesome/free-solid-svg-icons"

export type SaveItemType = "event"

export interface SavePostProps {
    isInterested: boolean
    id: string
    type: SaveItemType
    hideLabel?: boolean
}

const InterestedEvent: React.FC<SavePostProps> = ({ isInterested, id, type = "event", hideLabel }) => {
    const [interested, toggleInterested] = React.useState(isInterested)

    React.useEffect(() => {
        if (interested !== isInterested) {
            toggleInterested(isInterested)
        }
    }, [isInterested])

    const handleInterested = () => {
        if (!isLoggedIn) return

        if (type === "event") {
            console.log(id)
            eventApi.subscribe(id).then(() => {
                console.log("inside")
                toggleInterested(!interested)
            })
        }
    }

    return (
        <button onClick={handleInterested} className="btn btn-warning icon__btn pointer btn-interested">
            <FontAwesomeIcon className="text-black" icon={faCheck} />
            {!hideLabel && <span>{interested ? "Not interested" : "Interested"}</span>}
        </button>
    )
}

export default InterestedEvent
