import * as React from "react"
import { Link } from "react-router-dom"

import relativeDate from "../../../../Helpers/Date/relativeDate"
import CommunitiesList from "../../../../Helpers/Request/Services/Communities/Communities"
import { CommentIcon } from "../../../../Shared/Images/Images"
import { INotification } from "../../../../Models/User/Notification"
import event from "../../../../Helpers/Request/Services/Event/Event"
import parseNotificationLink from "../../../../Helpers/Functions/parseNotificationLink"
import notification from "../../../../Helpers/Request/Services/Notification/Notification"

// import parseUrl from '../../../../Helpers/Functions/parseNotificationUrl'
export interface NotificationItemProps {
    notification: INotification
}

const notificationnHeadings: { [key: string]: any } = {
    isAward: {
        heading: "Award Received",
        type: "award",
        link: "/profile/settings/",
    },
    isNewPost: {
        heading: "New Post",
        type: "post",
        id: "post",
        link: "/post/details/{{id}}",
    },
    isPostLiked: {
        heading: "Post Liked",
        type: "post",
        id: "post",
        link: "/post/details/{{id}}",
    },
    isPostDisLiked: {
        heading: "Post Disliked",
        id: "post",
        type: "post",
        link: "/post/details/{{id}}",
    },
    isInvitation: {
        heading: "Invitation",
        type: "community",
        id: "community",
        link: "/",
    },
    isInvitationResponse: {
        heading: "Invitation Response",
        type: "community",
        id: "community",
        link: "/",
    },
    isNewJoined: {
        heading: "New Joined",
        type: "community",
        id: "community",
        link: "/community/details/{{id}}",
    },
    isJoinedPending: {
        heading: "Joined Pending",
        type: "community",
        id: "community",
        link: "/community/details/{{id}}",
    },
    isJoiningResponse: {
        heading: "Joining Response",
        type: "community",
        id: "community",
        link: "/community/details/{{id}}",
    },
    isPostComment: {
        heading: "Post Comment",
        id: "post",
        type: "post",
        link: "/post/details/{{id}}",
    },
    "Event Invitation": {
        heading: "Event Invitation",
        type: "event",
        id: "event",
        link: "/event/details/{{id}}",
    },
    isPostApproved: {
        heading: "Post Approved",
        type: "post",
        id: "post",
        link: "/post/details/{{id}}",
    },
    AwardReceived: {
        heading: "Award Received",
        type: "award",
        link: "/profile/stats/",
    }

}

const NotificationItem: React.FC<NotificationItemProps> = ({ notification: item }) => {
    const [actionsComplete, setActionsComplete] = React.useState(!!item.actionPerformed)



    const acceptInvititaion = (id: string, notificationID: string) => {
        CommunitiesList.acceptCommunity(id).then(() => {
            notification.actionPerformed(notificationID, true)
            setActionsComplete(true)
        })
    }
    const rejectInvititaion = (id: string, notificationID: string) => {
        CommunitiesList.rejectCommunity(id).then(() => {
            notification.actionPerformed(notificationID, true)
            setActionsComplete(true)
        })
    }

    const acceptRequestMod = () => {
        event.acceptModRequest(item.event).then(() => {
            notification.actionPerformed(item.event || "")
            setActionsComplete(true)
        })
    }

    const rejectRequestMod = () => {
        event.rejectModRequest(item.event).then(() => {
            notification.actionPerformed(item.event || "")
            setActionsComplete(true)
        })
    }

    const getNotificationId = (): string => {
        switch (item.notificationType) {
            case "isPostComment":
            case "isNewPost":
            case "isPostLiked":
            case "isPostDisLiked":
            case "isPostApproved":
                return item.post?._id || "";
            case "isInvitation":
            case "isInvitationResponse":
            case "isNewJoined":
            case "isJoinedPending":
            case "isJoiningResponse":
                return item.community?._id || ""
            case "Event Invitation":
                return item.event || ""
            default:
                return ""
        }
    }

    return (
        <React.Fragment>
            <div className={`profile-container notification--item ${item.isRead ? "done" : ""}`}>
                <div className="pb-1 d-flex flex-lg-row flex-column justify-content-between mb-2">
                    <div className="d-flex flex-lg-row flex-column">
                        <div>
                            <span className="comment-image">
                                <img src={CommentIcon} width="20" alt="comment" />
                            </span>
                            <span className="post-in ml-1">
                                {notificationnHeadings[item.notificationType]?.heading || ""}
                            </span>
                        </div>
                    </div>
                    <div>
                        <span className="post-in">{relativeDate(item.updatedAt)}</span>
                    </div>
                </div>
                <Link
                    to={parseNotificationLink(
                        notificationnHeadings[item.notificationType]?.link || "",
                        getNotificationId()
                    )}
                >
                    {item.person && item.community ? (
                        <div className="pb-1 d-flex">
                            <span className="text-prime">{item?.person.userName}</span>
                            <span className="post-in ml-1">in</span>
                            <span className="text-prime ml-1">{item?.community.name}</span>
                        </div>
                    ) : null}
                    <p className="post-in mb-0 font-weight-bold">{item.message}</p>
                </Link>
                {item.notificationType === "isInvitation" && !actionsComplete ? (
                    <div className="d-flex justify-content-end">
                        <button
                            className="btn btn-sm btn-success mr-2"
                            onClick={() => acceptInvititaion(item.community?._id || "", item._id)}
                        >
                            <i className="fa mr-0 fa-check text-white"></i>
                        </button>

                        <button
                            className="btn btn-sm btn-danger"
                            onClick={() => rejectInvititaion(item.community?._id || "", item._id)}
                        >
                            <i className="fa mr-0 fa-times text-white" />
                        </button>
                    </div>
                ) : null}
                {item.notificationType === "Event Invitation" && !actionsComplete ? (
                    <div className="d-flex justify-content-end">
                        <button className="btn btn-sm btn-success mr-2" onClick={acceptRequestMod}>
                            <i className="fa mr-0 fa-check text-white" />
                        </button>

                        <button className="btn btn-sm btn-danger" onClick={rejectRequestMod}>
                            <i className="fa mr-0 fa-times text-white" />
                        </button>
                    </div>
                ) : null}
            </div>
            <hr />
        </React.Fragment>
    )
}

export default NotificationItem
