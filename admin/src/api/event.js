import api from "./instance";

const event = {
  fetch: (page = 1) => api.get(`event/get/all/approved?page=${page}`),
  fetchReported: (currentPage = 1) => api.get(`report?page=${currentPage}`),
  actionPerformed: (id) => api.put(`report/${id}`),
  fetchPending: () => api.get("general/events/pending/to/approve"),
  fetchFeatured: () => api.get("featured/events"),
  fetchFeaturedPending: (currentPage = 1) =>
    api.get(`event/get/pending/featured?page=${currentPage}`),
  approve: (pId, id) =>
    api.put(`general/event/approve?parentID=${pId}&eventID=${id}`),
  approveFeatured: (id) => api.put(`event/approve/for/featured/${id}`),
  reject: (pId, id) =>
    api.put(`general/event/reject?parentID=${pId}&eventID=${id}`),
  rejectFeatured: (id) => api.put(`event/reject/for/featured/${id}`),
  delete: (id) => api.delete(`${id}`),
  deleteReportedItem: (id, type) => api.delete(`admin/delete/${type}/${id}`),
  deleteReported: (id) => api.delete(`admin/delete/report/${id}`),
  deleteComment: (id) => api.delete(`comment/${id}`),
  markFeatured: (id) => api.put(`event/mark/as/featured/${id}`),
  unMarkFeatured: (id) => api.put(`event/unmark/as/featured/${id}`),
  deleteEvent: (id) => api.delete(`general/event/action/remove/${id}`),
};

export default event;
