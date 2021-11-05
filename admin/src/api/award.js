import api from "./instance";

const award = {
  fetch: () => api.get("award/list"),
  add: (data) => api.post("award/add", data),
  update: (data) => api.post("award/update", data),
  delete: (id) => api.delete(`award/remove?ID=${id}`)
};

export default award;
