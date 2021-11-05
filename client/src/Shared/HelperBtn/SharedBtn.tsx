import * as React from "react"
import { Link } from "react-router-dom"
import IEvent from "../../Models/User/IEvent"
import { FeedType } from "../../Interface/Home/FeedsInterface"
import { CommentReplies } from "../../Interface/Comments/CommentsInterface"
import copyToClipBoard from "../../Helpers/Functions/copyToClipBoard"

export type ShareType = "event" | "comment" | "post"
export type ShareItem = IEvent | FeedType | CommentReplies

export interface SharedBtnProps {
    item: ShareItem
    type: ShareType
}

const SharedBtn: React.FC<SharedBtnProps> = ({ item, type = "post" }) => {
    const [isMenuOpen, toggleMenu] = React.useState(false)

    const onShareClick = () => {
        toggleMenu(!isMenuOpen)
    }

    const onLinkCopyClick = () => {
        copyToClipBoard(`${window.origin}/crosspost/${type}/${item._id}`)
    }

    return (
        <div className="dropdown share--btn-dropdown pointer">
            <div className="post-share" onClick={onShareClick}>
                <span className="icon">
                    <svg viewBox="0 0 24 15" className="post__icon" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7 3V0L0 7L7 14V11L3 7L7 3ZM13 4V0L6 7L13 14V9.9C18 9.9 21.5 11.5 24 15C23 10 20 5 13 4Z" />
                    </svg>
                </span>
                <span className="text">Share</span>
            </div>

            <div className={`dropdown-menu share--btn-menu ${!isMenuOpen ? "d-none" : "d-block"}`}>
                <Link
                    className="dropdown-item"
                    to={{
                        pathname: `/crosspost/${type}/${item._id}`,
                        state: item,
                    }}
                >
                    Share {type}
                </Link>
                <button className="dropdown-item" onClick={onLinkCopyClick}>
                    Copy Link
                </button>
            </div>
        </div>
    )
}

export default SharedBtn
