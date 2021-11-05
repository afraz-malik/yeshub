import * as React from "react"
import Post from "../../Helpers/Request/Services/Post/Post"
import eventApi from "../../Helpers/Request/Services/Event/Event"
import { isLoggedIn } from "../../Hooks/Auth/getAuth"
import { SAVED_POST_EVENT, SAVED_EVENT_EVENT } from "../../Constants/constants"

export type SaveItemType = "event" | "post"

export interface SavePostProps {
    isSaved: boolean
    id: string
    type: SaveItemType
    hideLabel?: boolean
}

const SavePost: React.FC<SavePostProps> = ({ isSaved, id, type = "post", hideLabel }) => {
    const [hasSaved, toggleHasSaved] = React.useState(isSaved)

    const LikePost = () => {
        if (!isLoggedIn) return

        if (type === "post") {
            Post.save(id).then(() => {
                toggleHasSaved(!hasSaved)
                const savedToggled = new CustomEvent(SAVED_POST_EVENT, {
                    detail: { id },
                })

                document.dispatchEvent(savedToggled)
            })
        } else if (type === "event") {
            eventApi.save(id).then(() => {
                toggleHasSaved(!hasSaved)
                const savedToggled = new CustomEvent(SAVED_EVENT_EVENT, {
                    detail: { id },
                })

                document.dispatchEvent(savedToggled)
            })
        }
    }

    return (
        <div className="post-save" style={{ display: "inline-block" }}>
            <div className="pointer" onClick={LikePost}>
                <span className="icon">
                    <svg
                        viewBox="0 0 14 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="post__icon"
                        style={{ width: "17px", height: "17px" }}
                    >
                        {hasSaved ? (
                            <path d="M12 0H2C0.9 0 0.0100002 0.9 0.0100002 2L0 18L7 15L14 18V2C14 0.9 13.1 0 12 0Z" />
                        ) : (
                            <path d="M12 0H2C0.9 0 0.0100002 0.9 0.0100002 2L0 18L7 15L14 18V2C14 0.9 13.1 0 12 0ZM12 15L7 12.82L2 15V2H12V15Z" />
                        )}
                    </svg>
                </span>
                {!hideLabel && <span className="text">{hasSaved ? "Saved" : "Save"}</span>}
            </div>
        </div>
    )
}

export default SavePost
