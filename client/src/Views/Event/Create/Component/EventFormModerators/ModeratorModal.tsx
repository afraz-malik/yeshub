import * as React from "react"
import Modal from "../../../../../Shared/Modal"
import ModalHeader from "../../../../../Shared/Modal/Header"
import ModalBody from "../../../../../Shared/Modal/Body"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch } from "@fortawesome/free-solid-svg-icons"
import ModeratorItem from "./ModeratorItem"
import { IModerator } from "../../../../../Models/User/IEvent"
import moderatorApi from "../../../../../Helpers/Request/Services/Moderator/Moderator"
import { EventFormModeratorEvent } from "."

export interface ModeratorModalProps {
    isOpened: boolean
    toggle: () => void
    eventID: string
    title: string
}

const ModeratorModal: React.FC<ModeratorModalProps> = ({ title, isOpened, toggle, eventID }) => {
    const [isLoading, toggleLoading] = React.useState(false)
    const [moderators, setModerators] = React.useState<IModerator[]>([])

    const [keyword, setKeyWord] = React.useState("")

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setKeyWord(event.target.value)
    }

    React.useEffect(() => {
        document.addEventListener(EventFormModeratorEvent, toggle)
        return () => document.removeEventListener(EventFormModeratorEvent, toggle)
    }, [isOpened, toggle])

    React.useEffect(() => {
        if (!isLoading) {
            toggleLoading(true)
            moderatorApi
                .search(eventID, keyword)
                .then(response => {
                    setModerators(response.data.body)
                    // setModerators([])
                })
                .finally(() => toggleLoading(false))
        }
        // eslint-disable-next-line
    }, [keyword, eventID])

    return (
        <Modal isOpened={isOpened} otherProps={{ className: "moderator--modal" }}>
            <div className="modal-main">
                <ModalHeader toggleModal={toggle}>
                    <div>
                        <h3 className="modal-title">{title}</h3>
                        <h6 className="description mb-0">Select Moderator</h6>
                    </div>
                </ModalHeader>
                <ModalBody>
                    <div className="modal--search-box">
                        <FontAwesomeIcon icon={faSearch} className="icon" />
                        <input onChange={handleChange} type="search" placeholder="Search User" />
                    </div>
                    <div className="moderators--list">
                        {moderators.map(moderator => {
                            if (moderator) {
                                return <ModeratorItem eventID={eventID} moderator={moderator} key={moderator._id} />
                            }
                            return null
                        })}
                    </div>
                </ModalBody>
            </div>
        </Modal>
    )
}

export default ModeratorModal
