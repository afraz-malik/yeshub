import IEvent from "../../Models/User/IEvent"
import { userId } from "../../Constants/getUserId"
import { FeedType } from "../../Interface/Home/FeedsInterface"

export const isEventEditAllowed = (event: IEvent): boolean => {
    return event.isModerator || event.isComMod || event.author?._id === userId
}

export const isPostEditAllowed = (post: FeedType): boolean => {
    return post.isModerator || post.author?._id === userId || post.isComMod
}
