import axiosService from "../../axiosService"

const getUserPosts = {
    fetchAllMixedPublic: (ID: string, page = 1) => axiosService.get("/general/get/all?page=" + page + "&ID=" + ID),
    fetchAllMixed: (page = 1) => axiosService.get("/general/get/all?page=" + page),
    fetch: (page = 1) => axiosService.get("/post/getAll?page=" + page),
    fetchPublic: (ID: string, page: number = 1) => axiosService.get("/post/getAll?ID=" + ID + "&page=" + page),
    drafts: () => axiosService.get("/general/event/savedas/draft"),
    saved: () => axiosService.get("/post/user/get/saved"),
    savedEvents: () => axiosService.get("/event/get/saved"),
    getModCommunities: () => axiosService.get("/user/mod/communities/get"),
    getDraftPosts: () => axiosService.get("/general/post/savedas/draft"),
}

export default getUserPosts
