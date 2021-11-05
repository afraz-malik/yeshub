import React from "react"

interface NotificationBarProps {}

const NotificationTopBar: React.FC<NotificationBarProps> = () => {
    return (
        <div className="cp-header">
            <div className="d-flex flex-lg-row flex-column justify-content-between align-items-lg-center">
                <span className="head">Notifications</span>
            </div>
        </div>
    )
}

export default NotificationTopBar
