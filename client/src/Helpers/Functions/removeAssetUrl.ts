import { WEBSITE_URL } from "../../Constants/constants"

export default function removeAssetUrl(str: string) {
    console.log(WEBSITE_URL)

    return str.replace(`${WEBSITE_URL}/`, "")
}
