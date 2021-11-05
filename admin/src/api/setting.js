import api from "./instance";

const setting = {
    fetch: () => api.get("resource/counter"),
    update: (data, id) => api.put(`resource/counter/${id}`, data),
    fetchBanner: () => api.get("banner/get"),
    updateBanner: (data, id) => api.put(`banner/${id}`, data),
};

export default setting;
