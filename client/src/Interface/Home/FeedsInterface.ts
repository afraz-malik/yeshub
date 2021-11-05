import { GroupsInterfaceType } from "../Groups/GroupsInterface"
import IEvent from "../../Models/User/IEvent"

export default interface FeedsInterface {
    feeds: Array<any> | Array<FeedType> | SavedFeeds[] | DraftEvents[]
    topMargin?: boolean
    showDelete?: boolean
    isUser?: boolean
    showReportFlag?: boolean
    loading?: boolean
    awards: any
    hideAward: any | boolean
}

export type IAuthor = {
    _id: string
    userName: string
    userImage: string
}

export type FeedType = {
    _id: string
    knowledgeGroup: GroupsInterfaceType
    profile: null | string
    likes: any[]
    disLikes: any[]
    image: string[]
    tags: string[]
    isPublished: boolean
    title: string
    author: IAuthor | null
    description: string
    slug: string
    isJoined: boolean
    link: linksType[]
    createdAt: string
    updatedAt: string
    totalVotes: number
    totalComments: number
    id: string
    isModerator: boolean
    isComMod: boolean
    isLike: boolean
    isPined: boolean
    isDisLike: boolean
    isCaseStudy: number
    videoUrl?: string
    isSaved: boolean
}

export type DraftEvents = {
    _id: string
    event: IEvent
}

export type FeedTypeSingle = {
    feed: FeedType
    col?: number
}

export type SavedFeeds = {
    likes: any[]
    image: any[]
    isPublished: boolean
    _id: string
    title: string
    description: string
    slug: string
}

export type FeedTypeData = {
    feed: FeedType
}

export interface NewsFeedResponse {
    totalDocs: number
    limit: number
    totalPages: number
    page: number
    pagingCounter: number
    hasPrevPage: boolean
    hasNextPage: boolean
    prevPage: null | number | string
    nextPage: null | number | string
    docs: FeedType[]
}

type linksType = {
    title: string
    url: string
}
