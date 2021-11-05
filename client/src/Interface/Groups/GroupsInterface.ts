import { TrendingCommunities } from "../SideBar/TrendingCommunitiesInterface"

export default interface GroupsInterface {
    communities: Array<TrendingCommunities>
}

export type GroupsInterfaceType = {
    _id: string
    name: string
    slug: string
    logo: string
    description?: string
    members: number
} | null
