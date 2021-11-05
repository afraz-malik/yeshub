import axiosService from "../../axiosService"

export const PostCommentsService = {
    addComment: (data: any) => axiosService.post("/comment", data),
    getTopLevelComments: (id: string, data?: Record<string, any>, page: number = 1) =>
        axiosService.get(`comment/bypost/${id}?page=${page}`, {
            params: data,
        }),
    getCommentReplies: (id: string, data?: Record<string, any>, page: number = 1) =>
        axiosService.get(`comment/by/comment/${id}?page=${page}`, {
            params: data,
        }),
    delete: (id: string, isMod: boolean) => axiosService.delete(`comment/${id}${isMod ? "?mod=345" : ""}`),
    helpful: (id: string, isHelpful: boolean) => axiosService.put(`vote/comment/${isHelpful ? "down" : "up"}?ID=${id}`),
    createCommentReply: (data: Record<string, any>) => axiosService.post("reply/to/comment", data),
}
