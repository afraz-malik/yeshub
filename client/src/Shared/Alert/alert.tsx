import * as React from "react"
import SweetAlert from "sweetalert2"

export const OPEN_ALERTBOX = "OPEN_ALERTBOX"
export const alertBoxEvent = new CustomEvent(OPEN_ALERTBOX)

const AlertBox: React.FC = () => {
    const toggleAlert = (event: any) => {
        SweetAlert.fire({
            icon: "success",
            title: "",
            text: "",
            ...event.detail,
        }).then(result => {
            if (result.isConfirmed && event.detail.successCallback) {
                event.detail.successCallback()
            } else if (result.isDismissed && event.detail.failCallback) {
                event.detail.failCallback()
            }
        })

        // toggleOpen(!isOpen)
    }

    React.useEffect(() => {
        document.addEventListener(OPEN_ALERTBOX, toggleAlert)

        return () => document.removeEventListener(OPEN_ALERTBOX, toggleAlert)
    }, [])

    return null
}

export default AlertBox
