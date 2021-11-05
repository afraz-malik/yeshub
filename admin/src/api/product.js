import api from "./instance";

const product = {
    fetch: (language = "eng") => api.get("product", { params: { language } }),
    add: (data, language = "eng") => api.post("product", data, { params: { language } }),
    update: (data, id, language = "eng") => api.put(`product/${id}`, data, { params: { language } }),
    delete: (id, language = "eng") => api.delete(`product/${id}`, { params: { language } }),
};

export default product;
