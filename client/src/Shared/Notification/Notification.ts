import { ToastsStore } from "react-toasts"

import NotificationConfig from "./../../Configs/Notification.json"

const Notification = (
    message: string,
    type: "success" | "info" | "warning" | "error"
) => {
    switch (type) {
        case "success":
            ToastsStore.success(message, NotificationConfig.autoDismissTimeout)
            break
        case "info":
            ToastsStore.info(message, NotificationConfig.autoDismissTimeout)
            break
        case "warning":
            ToastsStore.warning(message, NotificationConfig.autoDismissTimeout)
            break
        case "error":
            ToastsStore.error(message, NotificationConfig.autoDismissTimeout)
            break
    }
}
export default Notification
