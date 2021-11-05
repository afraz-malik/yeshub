import axiosService from "../../axiosService"

export const getAds = {
    getAll: axiosService.get("/ad"),
}
