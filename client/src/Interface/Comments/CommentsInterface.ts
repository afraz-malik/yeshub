export interface CommentInterface {
    likes: number
    dislikes: number
    _id: string
    postId: string
    body: string
    userId: string
    createdAt: string
    updatedAt: string
}

export interface CommentsArrayInterface {
    comments: CommentInterface[]
}

export interface CommentResponseInterface {
    docs: CommentReplies[]
    totalDocs: number
    perPage: number
    totalPages: number
    currentPge: number
    pagingCounter: number
    hasPrevPage: boolean
    hasNextPage: boolean
    prevPage: null | number
    nextPage: null | number
    upVoteCount: number
    downVoteCount: number
    repliesCount: number
    replies: []
}

export interface CommentUser {
    _id: string
    userName: string
    userImage: string
}

export interface CommentReplies {
    _id: string
    commentId: string
    body: string
    userId: CommentUser
    createdAt: string
    updatedAt: string
    upVoteCount: number
    downVoteCount: number
    isLiked: boolean
    repliesCount: number
    id: string
    replies: []
    vote: number
    children: CommentReplies[] | undefined,
    postId?:string
}
