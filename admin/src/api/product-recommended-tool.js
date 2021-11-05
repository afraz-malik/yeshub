import api from "./instance";

const recommendedTool = {
  add: (data, language = "eng") => api.post("product/add/tool", data, {
    params: {
      language
    }
  }),
  update: (data, pid, tid, language = "eng") =>
    api.put(`product/update/tool`, data, {
      params: {
        pid: pid,
        tid: tid,
        language
      }
    }),
  delete: (pid, tid, language = "eng") => api.put(`product/remove/tool?pid=${pid}&tid=${tid}&language=${language}`),
};

export default recommendedTool;
