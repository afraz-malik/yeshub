export default interface CommunitiesListInterface {
    list: Array<CommunitiesListTypes>
}

export type CommunitiesListTypes = {
    description: string
    logo: string
    coverImage: string
    likes: string[]
    disliskes: string[]
    published: boolean
    _id: string
    name: string
    slug: string
}
