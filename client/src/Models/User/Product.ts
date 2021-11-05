export interface ILink {
    _id: string
    title: string
    link: string
    __v: number
}

export default interface IProduct {
    _id: string
    title: string
    shortDescription: string
    videoUrl: string
    description: string
    sections: Section[]
    recommendedTools: RecommendedTool[]
    __v: number
}

export interface RecommendedTool {
    _id: string
    title: string
    redirectUrl: string
    file: string
    fileType: string
}

export interface Section {
    _id: string
    title: string
    body: string
}
