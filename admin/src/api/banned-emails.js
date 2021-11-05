import api from "./instance";

const BannedEmails = {
    fetch: () => api.get("banned/email"),
    create: (data) => api.post("banned/email", data),
    update: (id, data) => api.put(`banned/email/${id}`, data),
    delete: (id) => api.delete(`banned/email/${id}`),
};

export default BannedEmails;
