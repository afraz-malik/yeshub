import axiosService from "../../axiosService"

const event = {
    fetchById: (id: string) => axiosService.get(`general/event/detail/${id}`),
    fetch: (page: number) => axiosService.get(`event/get/all?page=${page}`),
    fetchApproved: (page: number) => axiosService.get(`event/get/all/approved?page=${page}`),
    fetchFeaturedEvents: () => axiosService.get("featured/events"),
    fetchComments: (id: string, page: number = 1) => axiosService.get(`comment/byevent/${id}?page=${page}`),
    deleteCommunityEvent: (comId: string, id: string) =>
        axiosService.delete(`event/remove/from/community/${comId}/${id}`),
    delete: (id: string) => axiosService.delete(`event/delete/${id}`),
    search: (filters: string) => axiosService.get(`event/advance/search?${filters}`),
    simpleSearch: (query: string) => axiosService.get(`event/search?search=${query}`),
    acceptModRequest: (id: string = "") => axiosService.put(`event/accept/invitation/${id}`),
    rejectModRequest: (id: string = "") => axiosService.put(`event/reject/invitation/${id}`),
    save: (id: string) => axiosService.put(`event/save?ID=${id}`),
    requestFeatured: (id: string) => axiosService.put(`event/request/for/featured/${id}`),
    hide: (id: string) => axiosService.put(`general/hide/event/${id}`),
    subscribe: (id: string, going: number = 0) => axiosService.post(`event/subscribed?ID=${id}&going=${going}`),
    markGoing: (event: any, action: number) => axiosService.post(`event/going/mark`, { event, action }),
}

export default event
