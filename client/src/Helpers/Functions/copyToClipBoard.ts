import Clipboard from "clipboard"
import Notification from "../../Shared/Notification/Notification"

const copyToClipBoard = (text: string) => {
    const copyDiv = document.createElement("div")

    new Clipboard(copyDiv, {
        action: () => "copy",
        text: () => text,
    })

    copyDiv.click()
    Notification("Link has been copied and is ready to paste.", "success")
}

export default copyToClipBoard
