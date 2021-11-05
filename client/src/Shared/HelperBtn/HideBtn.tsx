import * as React from "react"
import EventApi from "../../Helpers/Request/Services/Event/Event"
import PostApi from "../../Helpers/Request/Services/Post/Post"
import { HIDE_POST_EVENT, HIDE_EVENT_EVENT } from "../../Constants/constants"

export type HideBtnType = "event" | "post" | "comment"

export interface HideBtnProps {
    id: string
    type?: HideBtnType
}

const HideBtn: React.FC<HideBtnProps> = ({ id, type = "post" }) => {
    const onHideClick = () => {
        if (type === "event") {
            EventApi.hide(id).then(() => {
                document.dispatchEvent(new CustomEvent(HIDE_POST_EVENT, { detail: { id } }))
            })
        } else if (type === "post") {
            PostApi.hide(id).then(() => {
                document.dispatchEvent(new CustomEvent(HIDE_EVENT_EVENT, { detail: { id } }))
            })
        }
    }

    return (
        <div className="post-hide" onClick={onHideClick}>
            <span className="icon">
                <svg className="post__icon" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M17.5 0H2.5C1.125 0 0 1.125 0 2.5V22.5C0 23.875 1.125 25 2.5 25H17.5C18.875 25 20 23.875 20 22.5V2.5C20 1.125 18.875 0 17.5 0ZM2.5 2.5H8.75V12.5L5.625 10.625L2.5 12.5V2.5Z"
                        fill="#243C4B"
                    />
                </svg>
            </span>
            <span className="text">Hide</span>
        </div>
    )
}

export default HideBtn
