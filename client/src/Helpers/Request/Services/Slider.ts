import axiosService from "../axiosService"

const slider = {
    fetch: axiosService.get("slides"),
}

export default slider
