import api from "./instance";

const ad = {
  fetch: () => api.get("ad"),
  add: (data) => api.post("ad", data),
  update: (data, id) => api.put(`ad/${id}`, data),
  delete: (id) => api.delete(`ad/${id}`),
};

export default ad;
