import api from "./instance";

const analytics = {
    getCommunities: (from, to = new Date()) => api.get("analytics/get/communities?from="+from +"&&to="+to),
    getTopUsers: (from, to = new Date()) => api.get(`analytics/get/top/users?from=${from}&&to=${to}`),
    getTopPosts: (from, to = new Date()) => api.get(`analytics/get/top/posts?from=${from}&&to=${to}`),
    getSiteAnalytics: (from, to = new Date()) => api.get(`ga/site/analytics?from=${from}&&to=${to}`),
    geCommunityGA: (page, from, to = new Date()) => api.get(`ga/community/analytics?page=${page}&&from=${from}&&to=${to}`)
};

export default analytics;