import api from "./instance";

const link = {
    fetch: () => api.get("links/get"),
    add: (data) => api.post("links/add", data),
    update: (data, id) => api.put(`links/${id}`, data),
    delete: (id) => api.delete(`links/${id}`),
};

export default link;
