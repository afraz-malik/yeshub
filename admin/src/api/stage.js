import api from "./instance";

const stage = {
  fetch: (language = "eng") => api.get("v2/stage", { params: { language } }),
  fetchv3: () => api.get("v3/stage"),
  add: (data, language = "eng") =>
    api.post("v3/stage", data, { params: { language } }),
  updateStage: (id, num, title) =>
    api.post("v3/stage/update/stage", { stageNumber: num, stageID: id, title }),
  update: (sectionID, title, image, description, content) =>
    api.post(`v3/stage/update/section`, {
      sectionID,
      title,
      description,
      content,
      image,
    }),
  delete: (id, language = "eng") =>
    api.delete(`v3/stage/delete/${id}`, { params: { language } }),
  addSection: (stageID, title, image, description, subContent) =>
    api.post(`v3/stage/add/section`, {
      stageID,
      title,
      description: description,
      content: subContent,
      image,
    }),
};

export default stage;
