import api from "./instance";

const stage = {
  fetch: (language = "eng") => api.get("v2/stage", { params: { language } }),
  fetchv3: () => api.get("v3/stage"),
  add: (data, language = "eng") =>
    api.post("v2/stage", data, { params: { language } }),
  update: (data, id, language = "eng") =>
    api.put(`v2/stage/${id}`, data, { params: { language } }),
  delete: (id, language = "eng") =>
    api.delete(`v2/stage/delete/${id}`, { params: { language } }),
  addSection: (stageID, title, image, mainContent, subContent) =>
    api.post(`v3/stage/add/section`, {
      stageID,
      title,
      mainContent,
      subContent,
      image,
    }),
};

export default stage;
