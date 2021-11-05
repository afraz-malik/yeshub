import * as React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons"
import { IModerator } from "../../../../../Models/User/IEvent"

import moderatorApi from "./../../../../../Helpers/Request/Services/Moderator/Moderator"

export interface ModeratorItemProps {
    moderator: IModerator
    eventID: string
}

enum MODERATOR_STATUS {
    notModerator = 0,
    isModerator = 1,
    inviteSent = 2,
}

const ModeratorItem: React.FC<ModeratorItemProps> = ({ moderator, eventID }) => {
    const [isModeratorFlag, toggleModerator] = React.useState(
        moderator.isModerator
            ? MODERATOR_STATUS.isModerator
            : moderator.isInvited
            ? MODERATOR_STATUS.inviteSent
            : MODERATOR_STATUS.notModerator
    )

    const removeModerator = () => {
        moderatorApi.remove(eventID, moderator._id)
        toggleModerator(MODERATOR_STATUS.notModerator)
    }

    const onSendInvite = () => {
        moderatorApi.sendInvite(eventID, moderator._id)
        toggleModerator(MODERATOR_STATUS.inviteSent)
    }

    return (
        <div className="moderator--item" key={moderator._id}>
            <h5 className="name">{moderator.userName}</h5>

            {isModeratorFlag === MODERATOR_STATUS.isModerator ? (
                <FontAwesomeIcon onClick={removeModerator} className="delete--icon" icon={faTrashAlt} />
            ) : (
                <button
                    className="btn btn-outline-warning"
                    disabled={isModeratorFlag === MODERATOR_STATUS.inviteSent}
                    onClick={onSendInvite}
                >
                    {isModeratorFlag === MODERATOR_STATUS.inviteSent ? "Sent" : "Send invitation"}
                </button>
            )}
        </div>
    )
}

export default ModeratorItem
