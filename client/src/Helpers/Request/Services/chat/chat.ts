
import axiosService from "../../axiosService"

export const chat = {
    
    archiveChat: (convID: any) => axiosService.post("archive", {conversationID: convID}),
    unArchiveChat: (convID: any) => axiosService.put("archive?conversationID="+convID),
    getAllThreads: () => axiosService.get("message/get/threads"),
    sendToConversation: (id: string, data: any) => axiosService.post(`message/admin/by/conversation?ID=${id}`, data), 
    sendMessageToMods: (id: string, data: any) => axiosService.post(`message/user/to/mod?community=${id}`, data),
    getMessagesFromAdmin: () => axiosService.get("message/get/from/admin"),
    getMessageFromCommunity: (id: string) => axiosService.get(`message/get/from/community/${id}`),
    sendMessageToAdmin: (data: { message: string }) => axiosService.post("message/personal/to/admin", data),
    getThreadsForMods: (id: string) => axiosService.get(`message/get/threads/for/community/${id}`),
    modToUser: (id: string, data: { message: string; to: string }) =>
        axiosService.post("message/mod/to/user", data, {
            params: {
                community: id,
            },
        }),
    getMessagesForCommunityUser: (cid: string, uid: string) =>
        axiosService.get("message/get/from/user/in/community", {
            params: {
                community: cid,
                user: uid,
            },
        }),
    modToMod: (id: string, data: { message: string }) =>
        axiosService.post("message/com/to/com", data, {
            params: {
                community: id,
            },
        }),
    getMessagesByConversation: (ID: string) => axiosService.get("message/byconversation/"+ID),
    seenMessage : (id: string) => axiosService.put("message/action/seen?ID="+id)
    
}
