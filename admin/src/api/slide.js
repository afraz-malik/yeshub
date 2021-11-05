import api from "./instance";

const slide = {
    fetch: () => api.get("slides"),
    add: (data) => api.post("slides", data),
    delete: (id) => api.delete(`slides/${id}`),
};

export default slide;
