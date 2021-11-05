import React, { useEffect, useState } from "react"
import Profile from ".."
import NotificationContent from "./Components/Notifications"
import NotificationTopBar from "./Components/NotificationTopBar"
import notification from "../../../Helpers/Request/Services/Notification/Notification"
import { INotification } from "../../../Models/User/Notification"
import { NOTIFICATION_RECEIVED_EVENT } from "../../../Constants/constants"
// import useInfiniteScroll from "../../../../Hooks/useInfiniteScroll"
import useInfiniteScroll from "../../../Hooks/useInfiniteScroll";
export const NOTIFICATION_RECEIVED_EVENT_DISPATCH = new CustomEvent(NOTIFICATION_RECEIVED_EVENT)

const Notifications = () => {
    const [notifications, setNotifications] = useState<INotification[]>([])
    const [allRead, setAllRead] = useState(true)
    const {page} = useInfiniteScroll();
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        notification.fetch(page).then(response => {
            setNotifications([...notifications, ...response.data.data.docs])
            const isRead = (response.data.data.docs as INotification[]).every(item => item.isRead)
            setLoading(false);
            setAllRead(isRead)
        })
    }, [page])

    useEffect(() => {
        if (!allRead) {
            document.dispatchEvent(NOTIFICATION_RECEIVED_EVENT_DISPATCH)
        }
    }, [allRead])

    return (
        <Profile>
            <NotificationTopBar />
            <NotificationContent notifications={notifications} loading={loading}/>
        </Profile>
    )
}

export default Notifications
