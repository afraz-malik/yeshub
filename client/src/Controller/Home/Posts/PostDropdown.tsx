import * as React from "react"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEllipsisH, faPencilAlt, faTrash, faCheck } from "@fortawesome/free-solid-svg-icons"

import { isPostEditAllowed } from "../../../Helpers/Functions/isAllowed"
import useDropDown from "../../../Hooks/useDropDown"

export interface PostDropdownProps {
    isUser: boolean
    item: any
    onDelete: () => void
    markAsCaseStudy: () => void
    requestAsCaseStudy: () => void
}

const PostDropdown: React.FC<PostDropdownProps> = ({ isUser, item, onDelete, markAsCaseStudy, requestAsCaseStudy }) => {
    const { isOpen } = useDropDown(`.toggle--dropdown-${item._id}`)

    return isPostEditAllowed(item) ? (
        <div className={`post__dropdown ${isOpen && "open"}`}>
            <button className={`toggle--dropdown-${item._id}`}>
                <FontAwesomeIcon icon={faEllipsisH} />
            </button>

            <div className="dropdown__menu">
                <div className="post-hide">
                    <Link
                        to={{
                            pathname: "/post/create",
                            state: item,
                        }}
                    >
                        <FontAwesomeIcon className="icon" icon={faPencilAlt} />
                        <span className="text">Edit</span>
                    </Link>
                </div>

                <div className="post-hide pointer" onClick={onDelete}>
                    <FontAwesomeIcon icon={faTrash} className="icon" />
                    <span className="text">Delete</span>
                </div>
                {!item.isCaseStudy && (
                    <div className="post-hide">
                        <span id={item._id} onClick={isUser ? requestAsCaseStudy : markAsCaseStudy}>
                            <FontAwesomeIcon className="icon" icon={faCheck} />
                            <span className="text">Case Story</span>
                        </span>
                    </div>
                )}
            </div>
        </div>
    ) : null
}

export default PostDropdown
