export default interface TrendingCommunitiesInterface {
    communities: Array<TrendingCommunities>
}

export type TrendingCommunities = {
    _id: string
    description: string
    logo: string
    coverImage: string
    likes: any[]
    disliskes: any[]
    published: boolean
    name: string
    slug: string
    author: {
        _id: string
        userName: string
    }
    id: string
    userList: Array<{
        _id: string
        userName: string
        userImage: string
    }>
    isJoinPending: boolean
    isJoined: boolean
    pendingJoining: pendingUsers[]
    joingType: number | null
}

export type pendingUsers = {
    _id: string
    userName: string
}
