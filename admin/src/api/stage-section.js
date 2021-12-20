import api from "./instance";

const stageSection = {
  add: (data, language = "eng") =>
    api.post(`v3/stage/add/section?language=${language}`, data),
  update: (data, stgId, sid, language = "eng") =>
    api.put(
      `v3/stage/update/section?stgId=${stgId}&sid=${sid}&language=${language}`,
      data,
    ),
  delete: (stgId, sid, language = "eng") =>
    api.put(
      `v3/stage/remove/section?stgId=${stgId}&sid=${sid}&language=${language}`,
    ),
};

export default stageSection;
