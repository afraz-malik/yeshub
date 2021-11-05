import api from "./instance";

const featurepost = {
  fetch: () => api.get("featurepost"),
  add: (data) => api.post("featurepost", data),
  update: (data, id) => api.put(`featurepost/${id}`, data),
  delete: (id) => api.delete(`featurepost/${id}`),
};

export default featurepost;
