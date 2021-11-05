import axiosService from "../../axiosService"

const Post = {
    uploadFile: (data: FormData) => axiosService.post(`media/upload`, data),
    deleteFile: (file: string) => axiosService.delete(`media/upload`, {data: {file: file}})
}

export default Post