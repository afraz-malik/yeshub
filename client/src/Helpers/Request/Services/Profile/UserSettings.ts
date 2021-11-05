import axiosService from "../../axiosService"
import { STORAGE_USER_PROFILE, USER_PROFILE_CHANGED } from "../../../../Constants/constants"

const UserSettings = {
    fetchProfile: (id: string) => axiosService.get(`/user/profile/get/${id}`),
    fetchAll: () =>
        axiosService.get("/user/profile/get").then(response => {
            localStorage.setItem(STORAGE_USER_PROFILE, JSON.stringify(response.data.data))
            document.dispatchEvent(new CustomEvent(USER_PROFILE_CHANGED))
            return response
        }),

    setMuteNotificationBit: (data: any) =>
        axiosService.post("/user/profile/muteNotifications", data).then(response => {
            localStorage.setItem(STORAGE_USER_PROFILE, JSON.stringify(response.data.data))
            document.dispatchEvent(new CustomEvent(USER_PROFILE_CHANGED))
            return response
        }),
}

export default UserSettings
