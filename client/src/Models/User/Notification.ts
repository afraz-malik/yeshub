interface IPerson {
    _id: string
    userName: string
}

interface ICommunity {
    _id: string
    name: string
    slug: string
}

interface IPost {
    _id: string
}

export interface INotification {
    _id: string
    userID: string
    admin: null
    moderator: null
    message: string
    post?: IPost
    community?: ICommunity
    person?: IPerson
    isRead: boolean
    actionPerformed?: boolean
    event?: string
    notificationType: string
    createdAt: string
    updatedAt: string
    id: string
}
