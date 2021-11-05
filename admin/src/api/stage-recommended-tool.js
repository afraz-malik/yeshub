import api from "./instance";

const stageRecommendedTool = {
    add: (data, language = "eng") => api.post(`v2/stage/add/tool?language=${language}`, data),
    update: (data, stgId, tid, language = "eng") =>
        api.put(`v2/stage/update/tool?stgId=${stgId}&tid=${tid}&language=${language}`, data),
    delete: (stgId, tid, language = "eng") =>
        api.put(`v2/stage/remove/tool?stgId=${stgId}&tid=${tid}&language=${language}`),
};

export default stageRecommendedTool;
