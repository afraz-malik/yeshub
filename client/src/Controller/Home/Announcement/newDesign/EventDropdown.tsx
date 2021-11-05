import * as React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEllipsisH, faTrash } from "@fortawesome/free-solid-svg-icons"

import { isEventEditAllowed } from "../../../../Helpers/Functions/isAllowed"
import IEvent from "../../../../Models/User/IEvent"
import { userId } from "../../../../Constants/getUserId"
import useDropDown from "../../../../Hooks/useDropDown"

export interface PostDropdownProps {
    item: IEvent
    onDelete: () => void
    onShareDelete: (comId: string, eventId: string) => void
}

const EventDropdown: React.FC<PostDropdownProps> = ({ item, onDelete, onShareDelete }) => {
    const { isOpen } = useDropDown(`.toggle--dropdown-${item._id}`)

    return isEventEditAllowed(item) ? (
        <div className={`post__dropdown ${isOpen && "open"}`}>
            <button className={`toggle--dropdown-${item._id}`}>
                <FontAwesomeIcon icon={faEllipsisH} />
            </button>

            <div className="dropdown__menu">
                {item?.knowledgeGroup && item?.knowledgeGroup.length > 0
                    ? item.knowledgeGroup.map(community =>
                          community?.isModerator ? (
                              <div className="post-hide pointer" onClick={() => onShareDelete(community._id, item._id)}>
                                  <FontAwesomeIcon icon={faTrash} className="icon" />
                                  <span className="text">Remove from {community.name}</span>
                              </div>
                          ) : null
                      )
                    : null}

                {item.isModerator || item.author._id === userId ? (
                    <div className="post-hide pointer" onClick={onDelete}>
                        <FontAwesomeIcon icon={faTrash} className="icon" />
                        <span className="text">Delete</span>
                    </div>
                ) : null}
            </div>
        </div>
    ) : null
}

export default EventDropdown
