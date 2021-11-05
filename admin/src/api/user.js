import api from "./instance";

const user = {
  fetch: (page) => api.get(`user/list?page=${page}`),
  search: (keyword, page = 1) =>
    api.get(`user/search?search=${keyword}&page=${page}`),
  delete: (id) => api.delete(`admin/delete/user/${id}`),
  makeItStaff: (id) => api.put(`user/action/makeit/staff/${id}`),
  makeItUser: (id) => api.put(`user/action/makeit/user/${id}`),
};

export default user;
