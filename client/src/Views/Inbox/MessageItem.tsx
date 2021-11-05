import React from "react"
import { CommunityMessages } from "../../Interface/Chat/chat"
import { formatTime } from "../../Helpers/Date/time"
import { isURL } from "../../Helpers/RegularExpressions/isUrl"

export type MessageItemProps = {
    isReceived?: boolean
    message: CommunityMessages
}

const MessageItem: React.FC<MessageItemProps> = ({ isReceived = true, message }) => {
    return (
        <div className={`message--item-container d-flex ${isReceived ? "received" : ""}`}>
            <div className="message--item d-flex flex-nowrap">
                <img src={message.from.userImage} alt="N/A" className="user--img" />
                <div className="message wordwrap">
                    <p className="text">
                        {isURL(message.message) ? (
                            <a
                                href={message.message}
                                className={"message-link"}
                                target={"_blank"}
                                rel={"noopener noreferrer"}
                            >
                                {message.message}
                            </a>
                        ) : (
                            message.message
                        )}
                    </p>
                    {message.seen && <small className="text-muted">&#10003; seen</small>}
                    <span className="time">{formatTime(message.createdAt)}</span>
                </div>
            </div>
        </div>
    )
}

export default MessageItem
