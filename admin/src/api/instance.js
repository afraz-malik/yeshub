import axios from "axios";
import { API_WEBSITE, ACTIVATE_LOADER, DEACTIVATE_LOADER } from "./../config/config";
import { toast } from "react-toastify";

const activateLoaderEvent = new CustomEvent(ACTIVATE_LOADER);
const deActivateLoaderEvent = new CustomEvent(DEACTIVATE_LOADER);

const instance = axios.create({
    baseURL: `${API_WEBSITE}`,
});

instance.interceptors.request.use((config) => {
    if (localStorage.getItem("token")) {
        config.headers["x-auth-token"] = localStorage.getItem("token");
    }

    if (!(config.method === "GET" || config.method === "get")) {
        document.dispatchEvent(activateLoaderEvent);
    }

    return config;
});

instance.interceptors.response.use(
    (response) => {
        document.dispatchEvent(deActivateLoaderEvent);
        return response.data;
    },
    (error) => {
        document.dispatchEvent(deActivateLoaderEvent);
        if (error.response) {
            toast(error.response.data.message, {
                type: "error",
            });
        }

        return Promise.reject(error);
    }
);

export default instance;
