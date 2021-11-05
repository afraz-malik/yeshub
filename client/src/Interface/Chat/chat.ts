export interface ThreadsInterface {
    _id: string
    isAdmin: boolean
    name: string
    logo: string
    isUser: boolean
    isMod: boolean
    isEvent: boolean
    lastMessage: string
    lastTime: string
}

export interface CommunityMessages {
    seen: boolean
    _id: string
    message: string
    from: {
        _id: string
        userImage: string
        userName: string
    }
    to?: {
        _id: string
        userImage: string
        userName: string
    }
    community: {
        logo: string
        _id: string
        name: string
        slug: string
    }
    conversationID: string
    createdAt: string
    updatedAt: string
}

export interface AdminMessages {
    seen: boolean
    _id: string
    message: string
    from: {
        _id: string
        userName: string
    }
    conversationID: string
    createdAt: string
    updatedAt: string
}
