import { CommunitiesListTypes } from "./../Communities/CommunitiesListInterface"

export default interface Stats {
    userImage: string
    points: number
    _id: string
    userName: string
    progressBar: ProgressBar
    achievements: Achievements

}

export interface ProgressBar {
    email: boolean
    updateProfile: boolean
    joinThreeCommunities: boolean
    firstPost: boolean
    tenUpvotes: boolean
    createBookmarkEvent: boolean

}

export interface Achievements {
    firstCaseStudy: boolean
    contributefiveCaseStudy: boolean
    contributeTenCaseStudy: boolean
    contributeTwentyfiveCaseStudy: boolean
    createTenPost: boolean
    createTwentyFivePost: boolean
    createFiftyPost: boolean
    createHundredPost: boolean
    createFiveCalendarEntries: boolean
    createTenCalendarEntries: boolean
    createTwentyFiveCalendarEntries: boolean
}

export type ProjectProgram = {
    title: string
    description: string
    isPublic: boolean
    _id: string
}

export interface MetaInfo {
    organization: string
    position: string
    departmentTeam: string
    supervisorManager: string
    homeOffice: string
    projectProgram: Array<ProjectProgram> | []
}

export interface OtherInfo {
    disabilityGroup: Disabilities
    identifyAs: string
    city: string
    nationalities: string[]
    birthDetail: {
        month: string | null
        year: string | null
    }
}

type Disabilities = {
    hearing: boolean
    seeing: boolean
    walking: boolean
    otherMobility: boolean
    remembering: boolean
    communication: boolean
}

export interface SavedPosts {
    likes: string[]
    image: string[]
    isPublished: boolean
    _id: boolean
    title: string
    description: string
    slug: string
}


export interface Award {
   awardDescription: string
   awardName: string
   cost: number
   images: string[]
}
