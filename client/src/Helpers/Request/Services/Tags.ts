import axiosService from "../axiosService"

const tags = {
    search: (_search: string) => {
        console.log("request calling ", _search)
        return axiosService.get(`tag/search?search=${_search}`)
    },

    create: (name: string) => axiosService.post("tag", { name }),

    getPostsByTag: (tag: string) => axiosService.get("general/post/by/tags?tag=" + tag),

    follow: (tag: string) => axiosService.put("tag/follow", { tag }),
}

export default tags
