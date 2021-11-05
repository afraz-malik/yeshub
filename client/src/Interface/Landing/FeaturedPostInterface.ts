export default interface FeaturedPostsInterface {
    publications: FeaturePost[]
}

export interface FeaturePost {
    displayImage: {
        thumbnail: string
        original: string
    }
    _id: string
    title: string
    description: string
    redirectUrl: string
    author: {
        userImage: string
        _id: string
        userName: string
    }
}

export type FeaturePostSingle = {
    publication: FeaturePost
    key?: number
}
