import api from './instance'

export const chat = {
    searchUser: (keyword) => api.get("user/search", {
        params: {
            search: keyword
        }
    }),
    archiveThread: (conID) => api.post('archive', {conversationID: conID}),
    unarchiveThread: (conID) => api.put(`archive?conversationID=${conID}`),
    uploadFile: (data) => api.post(`media/upload`, data),
    adminToUser: (data) => api.post("message/personal/to/user", data),
    messageSideBarUsers: () => api.get("message/get/threads/for/admin"),
    userMessages: (id) => api.get(`message/get/from/user/${id}`),
    getByConversationID: (id) => api.get("message/byadmin/byid", {
        params: {
            ID: id
        }
    }),
    adminToMod: (id, data) => api.post("message/admin/to/com", data, {
        params: {
            community: id
        }
    }),
    messageByConversationID: (id, data) => api.post("message/admin/by/conversation", data, {
        params: {
            ID: id
        }
    }),
    markedAsSeen: (conversationID) => api.put("message/action/seen?ID="+conversationID)
}