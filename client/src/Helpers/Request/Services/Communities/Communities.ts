import axiosService from "../../axiosService"

const CommunitiesList = {
    fetchList: () => axiosService.get("/user/joinedCommunities/list"),
    fetchAll: () => axiosService.get("/communities/all/list"),
    fetchById: (id: string) => axiosService.get(`user/community/detail/${id}`),
    joinCommunity: (id: string | undefined) => axiosService.put(`user/community/join?ID=${id}`),
    leaveCommunity: (id: string | undefined) => axiosService.put(`user/community/leave?ID=${id}`),
    getCommunityPostsById: (id: string | undefined, page = 1, sorting = "newest") =>
        axiosService.get(`general/by/community/${id}?page=${page}&sort=${sorting}`),
    removeUser: (communityID: string, userID: string) =>
        axiosService.delete("/community/user/remove", {
            data: {
                communityID,
                userID,
            },
        }),
    getCommunityUsers: (id: string | undefined) => axiosService.get(`user/communityJoined/list?ID=${id}`),
    acceptCommunity: (id: string) => axiosService.put(`user/Invitation/acceptInvite?ID=${id}`),
    rejectCommunity: (id: string) => axiosService.put(`user/Invitation/rejectInvite?ID=${id}`),
}

export default CommunitiesList
