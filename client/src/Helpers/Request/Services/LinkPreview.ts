import axios from "axios"
import { LINK_PREVIEW_KEY } from "../../../Constants/constants"

const LinkPreview = {
    preview: (url: string) => axios.get(`https://iframe.ly/api/iframely?api_key=${LINK_PREVIEW_KEY}&url=${url}`),
}

export default LinkPreview
