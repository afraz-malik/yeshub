import { CommunitiesListTypes } from '../Communities/CommunitiesListInterface'
import { Achievements, MetaInfo, OtherInfo, ProgressBar, SavedPosts, Award } from './Stats'

export default interface ProfileInterface {
    PersonalStatement: string
    userImage: string
    points: number
    joinedCommunities: CommunitiesListTypes[]
    _id: string
    userName: string
    email: string
    progressBar: ProgressBar
    achievements: Achievements
    metaInfo: MetaInfo
    otherInfo: OtherInfo
    savedPosts: SavedPosts[]
    receivedAward: Award[]
    awardGiven: Award[]
}
