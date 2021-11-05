import React from "react";
import { NavLink } from "react-router-dom";
import { formattedTime } from "../../helper/fomrattedDate";
import toImageUrl from '../../helper/toImageUrl';

const MessagesSidebarItem = ({ user, isArchived, onClick, selected }) => {
    return (
        <li className={`nav-link ${selected === user.conversationID ? 'custom-active' : ''}`} onClick={() => onClick(user)}>
            <div className={`sidebar--item`}>
                <div className="d-flex align-items-center">
                    <img className="user--img" src={toImageUrl(user?.community?.logo || user?.user?.userImage)} alt="" />
                    <p className={`${isArchived ? "text-danger" : "user--name"}`}>
                        <strong>
                            {user?.user?.userName} {user.community ? " >> " + user.community.name : null}
                            {user.counts > 0 && <span className="badge badge-primary float-right">{user.counts}</span>}
                        </strong>
                    </p>
                </div>
                <p className="last--message">
                    {user.lastMessage
                        ? user.lastMessage.slice(0, 6) + (user.lastMessage.length > 10 ? "..." : "")
                        : "No Message"}
                    <small className={"float-righ"}>{user.lastTime ? formattedTime(user.lastTime) : ""}</small>
                </p>
            </div>
        </li>
        // </NavLink>
    );
};

export default MessagesSidebarItem;
