import React, { FC } from "react"

import NotificationInterface from "../../../../Interface/Notifications/NotificationInterface"
import { INotification } from "../../../../Models/User/Notification"
import NotificationItem from "./NotificationItem"

export interface NotificationContentProps {
    notifications: INotification[],
    loading: Boolean
}



const NotificationContent: React.FC<NotificationContentProps> = ({
    notifications,
    loading
}) => {
    return (
        <div className="mc-border mt-3">
            <div className="notification-description">
                <NotificationItems notifications={notifications} />
            </div>
        </div>
    )
}

const NotificationItems: FC<NotificationInterface> = ({
    notifications = [],
}) => {
    return (
        <>
            {notifications.map(item => (
                <NotificationItem key={item._id} notification={item} />
            ))}
        </>
    )
}

export default NotificationContent
