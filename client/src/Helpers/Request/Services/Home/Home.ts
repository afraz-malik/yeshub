import axiosService from "../../axiosService"

export const HomeApis = {
    getLinks: axiosService.get("/links/get"),
    getAllProducts: (language: string = "eng") => axiosService.get("/product", { params: { language } }),
    getAllStages: (language: string = "eng") => axiosService.get("v2/stage", { params: { language } }),
    getAllCaseStudies: axiosService.get("/casestudy"),
    getAllFeaturedPosts: axiosService.get("/featurepost"),
    getStatics: axiosService.get("/counts/get"),
    getFeatured: axiosService.get("/casestudy/featured"),
    getBanner: axiosService.get("banner/get"),
    about: axiosService.get("aboutus"),
    languages: (isStage = false) => axiosService.get(`/language/get/active${isStage ? "/stages" : ""}`),
}
