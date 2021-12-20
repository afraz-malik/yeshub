import api from "./instance";

const stageRecommendedTool = {
  addToolItem: (id, item) =>
    api.post("v3/stage/add/toolitem", { toolId: id, ...item }),
  add: (data, language = "eng") =>
    api.post(`v3/stage/add/tool?language=${language}`, data),
  updateDownloadable: (toolID, itemID, downloadable) =>
    api.post("v3/stage/update/toolitem/downloadable", {
      toolID,
      itemID,
      downloadAble: downloadable,
    }),
  updateViewable: (toolID, itemID, viewable) =>
    api.post("v3/stage/update/toolitem/viewable", {
      toolID,
      itemID,
      viewable,
    }),
  update: (data, stgId, tid, language = "eng") =>
    api.put(
      `v3/stage/update/tool?stgId=${stgId}&tid=${tid}&language=${language}`,
      data,
    ),
  delete: (stgId, tid, language = "eng") =>
    api.put(
      `v3/stage/remove/tool?stgId=${stgId}&tid=${tid}&language=${language}`,
    ),
};

export default stageRecommendedTool;
