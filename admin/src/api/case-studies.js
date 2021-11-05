import api from "./instance";

const caseStudies = {
    fetchAll: (page) => api.get(`casestudy?page=${page}`),
    fetchInReview: (page) => api.get(`casestudy/in/review?page=${page}`),
    approve: (id) => api.put(`casestudy/accept/${id}`),
    reject: (id) => api.put(`casestudy/reject/${id}`),
    featured: () => api.get("casestudy/featured"),
    markFeatured: (id) => api.put(`casestudy/mark/as/featured/${id}`),
    unMarkFeatured: (id) => api.put(`casestudy/unmark/as/featured/${id}`),
};

export default caseStudies;
