import api from "./instance";

const language = {
    fetch: (id = "") => api.get(`language/${id}`),
    active: (isStage = false) => api.get(`language/get/active${isStage ? "/stages" : ""}`),
    create: (data) => api.post("language", data),
    update: (data, id) => api.put(`language/${id}`, data),
    delete: (id) => api.delete(`language/${id}`),
};

export default language;
