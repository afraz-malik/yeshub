import axios from "../axiosService"
import { LINK_PREVIEW_KEY } from "../../../Constants/constants"

const AwardApi = {
    getAllAwards: () => axios.get("award/list"),
}

export default AwardApi
