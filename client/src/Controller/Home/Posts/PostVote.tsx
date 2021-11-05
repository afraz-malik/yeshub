import * as React from "react"
import VoteBtn from "../../../Shared/HelperBtn/VoteBtn"

export interface PostVoteProps {
    isLiked: boolean
    postId: string
    totalLikes: number
    showText?: boolean
    onToggled?: any
}

const PostVote: React.FC<PostVoteProps> = ({ isLiked, postId, totalLikes, showText = false, onToggled }) => {
    return (
        <div className="post__vote">
            <VoteBtn
                onToggled={onToggled}
                isLiked={isLiked}
                postId={postId}
                totalLikes={totalLikes}
                showText={showText}
            />
        </div>
    )
}

export default PostVote
