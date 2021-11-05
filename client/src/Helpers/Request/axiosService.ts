import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios"

import Notification from "../../Shared/Notification/Notification"
import { WEBSITE_URL } from "../../Constants/constants"

// import StatusCodes from "../../Enums/StatusCodes"
const axiosService = axios.create({
    baseURL: `${WEBSITE_URL}/api/`,
})

axiosService.interceptors.request.use((config: AxiosRequestConfig) => {
    if (localStorage.getItem("token") || sessionStorage.getItem("token")) {
        config.headers.common["x-auth-token"] = localStorage.getItem("token") || sessionStorage.getItem("token")
    }

    return config
})

axiosService.interceptors.response.use(
    (response: AxiosResponse) => {
        if (!response) {
            Notification("Something went wrong!", "info")
            throw new Error("Something went wrong!")
        }
        if (response.config.url === "/general/post") {
            Notification(response.data.message, "success")
        }

        return response
    },
    (error: AxiosError) => {
        const toastMsg = error?.response ? error?.response?.data.message : "Network Error! Failed to Complete Request"
        Notification(toastMsg, "error")

        return Promise.reject(error)
    }
)

export default axiosService
