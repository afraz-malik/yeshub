export default interface CommunityUsersInterface {
    users: CommunityUsersList[] | []
}

export interface CommunityUsersList {
    _id: string
    userImage: string
    userName: string
    id: string
}

export interface CommunityUsers {
    _id: string
    userName: string
}
