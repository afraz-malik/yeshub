import api from "./instance";

const community = {
  fetch: (currentPage = 1) =>
    api.get(`knowledgeGroup/list?page=${currentPage}`),
  pendingPosts: (id, page, limit = 10) =>
    api.get(
      `general/pendingposts/bycommunity/${id}?page=${page}&limit=${limit}`,
    ),
  acceptPending: (id) => api.put(`general/approve/community/post/${id}`),
  add: (data) => api.post("knowledgeGroup/add", data),
  update: (data) => api.put("knowledgeGroup/update", data),
  delete: (id) => api.delete(`knowledgeGroup/delete?ID=${id}`),
  archive: (id) => api.put(`knowledgeGroup/archived/${id}`),
  memebers: (id) => api.get(`userlist/by/community/${id}`),
  export: (id) => api.get(`user/exports/in/community/${id}`),
  updateLogo: (data) => api.put("knowledgeGroup/updatelogo", data),
  fetchArchived: (currentPage) =>
    api.get(`knowledgeGroup/archive/list?page=${currentPage}`),
  undoArchived: (id) => api.put(`knowledgeGroup/archived/remove/${id}`),
  updateCover: (data) => api.put("knowledgeGroup/updateCoverImage", data),
  fetchMembers: (id, currentPage = 1) =>
    api.get(`userlist/by/community/${id}?page=${currentPage}`),
  searchMemebers: (keyword, communityId, currentPage = 1) =>
    api.get(
      `user/search/member/in/community?search=${keyword}&ID=${communityId}&page=${currentPage}`,
    ),
  deleteMember: (communityID, userID) =>
    api.delete("community/user/remove", { data: { communityID, userID } }),
  acceptMember: (communityID, userID) =>
    api.put(`communityAdmin/joinig/accept?ID=${communityID}`, { userID }),
  rejectMember: (communityID, userID) =>
    api.put(`communityAdmin/joinig/reject?ID=${communityID}`, { userID }),
  pendingJoiningRequests: (communityID, page = 1, limit = 15) =>
    api.get(
      `knowledgeGroup/pending/joining/list?communityID=${communityID}&page=${page}&limit=${limit}`,
    ),
  moderatorsList: (communityID, page = 1, limit = 15) =>
    api.get(
      `knowledgeGroup/moderators/list?communityID=${communityID}&page=${page}&limit=${limit}`,
    ),
};

export default community;
