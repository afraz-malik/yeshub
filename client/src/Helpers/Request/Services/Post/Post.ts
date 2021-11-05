import axiosService from "../../axiosService"

const Post = {
    detailsById: (id: string | undefined) => axiosService.get(`/post/detail/get?id=${id}`),
    save: (id: string | undefined) => axiosService.post(`/post/user/save?ID=${id}`),
    delete: (id: string | undefined) => axiosService.delete(`post/delete?ID=${id}`),
    updateImage: (data: FormData, id: string) => axiosService.put(`post/updateImage/${id}`, data),
    deleteImage: (data: { ID: string; image: string }) =>
        axiosService.delete("post/deleteImage", {
            data,
        }),
    pin: (id: string, type: "pin" | "unpin" = "pin") => axiosService.put(`post/${type}/by/id/${id}`),
    upVote: (id: string | undefined) => axiosService.put(`user/post/like?ID=${id}`),
    downVote: (id: string | undefined) => axiosService.put(`user/post/dislike?ID=${id}`),
    markAsCaseStudy: (id: string) => axiosService.put(`/casestudy/mark/it/${id}`),
    requestForCaseStudy: (id: string) => axiosService.put(`/casestudy/request/${id}`),
    hide: (id: string) => axiosService.put(`general/hide/post/${id}`),
}

export default Post
