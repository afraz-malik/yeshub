import axiosService from "../../axiosService"

const moderator = {
    search: (eventID: string, keyword: string) =>
        axiosService.get(`event/search/user?search=${keyword}&eventID=${eventID}`),
    remove: (eventID: string, userID: string) => axiosService.put(`event/remove/mod/${eventID}?userID=${userID}`),
    sendInvite: (eventID: string, userID: string) =>
        axiosService.post("event/inivte/user/for/mod", { eventID, userID }),
}

export default moderator
