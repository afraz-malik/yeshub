import { WEBSITE_URL } from "../../Constants/constants"
import { GA_U_ID } from "../../Constants/constants"
import isBaseImg from "./isBaseImg"
import isFullImageUrl from "./isFullImageUrl"
export default function assetUrl(url: string) {
    if (isBaseImg(url)) {
        return url
    }

    if (isFullImageUrl(url)) {
        return url
    }

    return `${WEBSITE_URL}/${url}`
}
