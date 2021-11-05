import { FeedType } from "../../Interface/Home/FeedsInterface"

export interface INewsFeed {
    _id: string
    id: string
    type: number
    event?: IEvent
    eventCommunities: string[]
    eventApproved: number
    post?: FeedType
    postCommunity?: string
    createdAt: Date
    updatedAt: Date
    __v: number
}

export type IEventModerator = {
    _id: string
    userName: string
}

export default interface IEvent {
    date: DateClass
    time: Time
    images: string[]
    inviteRejected: any[]
    invited: any[]
    moderators: (string | IEventModerator)[]
    isModerator: boolean
    knowledgeGroup: KnowledgeGroup[]
    profile: string
    characteristics: string[]
    isPublished: boolean
    status: number
    isFeatured: number
    isSaved: boolean
    isJoined: boolean
    isComMod: boolean
    totalLikes: number
    totalComments: number
    _id: string
    link: Link[]
    subEvent: SubEvent[]
    parentID: string
    eventName: string
    hostedBy: string
    coHostedBy: string
    description: string
    slug: string
    country: string
    city: string
    venue: string
    address: string
    contactRsvp: string
    author: Author
    createdAt: Date
    updatedAt: Date
    id: string
    notifyUser: any
    isSubscribed: boolean
    going?: any
}

export interface Author {
    userImage: string
    _id: string
    userName: string
    email: string
}

export interface DateClass {
    startDate: Date
    endDate: Date
}

export interface KnowledgeGroup {
    logo: string
    _id: string
    name: string
    slug: string
    isModerator: boolean
}

export interface Link {
    title: string
    url: string
    _id: string
}

export interface SubEvent {
    _id: string
    title: string
    date: Date
    startTime: Date
    endTime: Date
    description: string
}

export interface Time {
    startTime: Date
    endTime: Date
}

export interface IModerator {
    userImage: string
    _id: string
    userName: string
    email: string
    isModerator: boolean
    isInvited: boolean
    isModDeclined: boolean
}
