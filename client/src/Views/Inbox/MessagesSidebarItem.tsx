import React, { FC } from "react"
import { NavLink } from "react-router-dom"
import { ThreadsInterface } from "../../Interface/Chat/chat"
import { formattedTime } from "../../Helpers/Date/formattedTime"

type MessageItemProps = {
    user: ThreadsInterface
}

const MessagesSidebarItem: FC<MessageItemProps> = ({ user }) => {
    return (
        <NavLink
            activeClassName="active"
            to={`/inbox/${user._id ? user._id : "5ea5bfe037cf27a84f9d8b87"}`}
            className="sidebar--item-link"
        >
            <div className="sidebar--item">
                <div className="d-flex align-items-center">
                    <img className="user--img" src={user.logo} alt={"N/A"} />
                    <h4 className="user--name">{user.name}</h4>
                </div>
                <p className="last--message">
                    {user.lastMessage
                        ? user.lastMessage.slice(0, 6) + (user.lastMessage.length > 10 ? "..." : "")
                        : "No Message"}
                    <small className="float-right">{user.lastTime ? formattedTime(user.lastTime) : ""}</small>
                </p>
            </div>
        </NavLink>
    )
}

export default MessagesSidebarItem
