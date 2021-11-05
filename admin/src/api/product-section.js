import api from "./instance";

const section = {
  add: (data, language = "eng") => api.post("product/add/section", data, {
    params: {
      language
    }
  }),
  update: (data, pid, sid, language = "eng") =>
    api.put(`product/update/section`, data, {
      params: {
        pid: pid,
        sid: sid,
        language
      }
    }),
  delete: (pid, sid, language = "eng") => api.put(`product/remove/section?pid=${pid}&sid=${sid}&language=${language}`),
};

export default section;
