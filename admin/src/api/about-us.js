import api from "./instance";

const aboutUs = {
    fetch: () => api.get("aboutus"),
    updateImage: (data, aboutId) => api.put(`aboutus/update/image/${aboutId}`, data),
    addPoint: (data, aboutId) => api.put(`aboutus/add/point/${aboutId}`, data),
    updatePoint: (data, aboutId) => api.put(`aboutus/update/point/${aboutId}`, data),
    deletePoint: (aboutId, pointId) => api.put(`aboutus/remove/point/${aboutId}?ID=${pointId}`),
};

export default aboutUs;
