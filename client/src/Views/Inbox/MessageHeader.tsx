import * as React from "react"
import { ThreadsInterface } from "../../Interface/Chat/chat"

type MessageHeaderProps = {
    user: ThreadsInterface
}

const MessageHeader: React.FC<MessageHeaderProps> = ({ user }) => {
    return (
        <div className="d-flex justify-content-between border-bottom mb-2 pb-2">
            <div className="message--header d-flex align-items-center">
                <img src={user?.logo} alt="Sender" className="user--img" />
                <h3 className="user--name mb-0 ml-1">{user?.name}</h3>
            </div>
            <div className="dots">
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
            </div>
        </div>
    )
}

export default MessageHeader
