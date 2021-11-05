import React, { FC, useEffect, useState } from "react"
import { CommentReplies } from "../../../../Interface/Comments/CommentsInterface"
import CommentItem from "./CommentItem"
import { PostCommentsService } from "../../../../Helpers/Request/Services/Comments/PostComments"

//@ts-ignore
import { Fade, Bounce} from 'react-reveal';

type PostComments = {
    isMod: boolean
    comments: CommentReplies[]
    isCommentAllowed: boolean
    fetchComments: () => void
    hasMoreComments: boolean
    postId?:string 
}

const PostComments: FC<PostComments> = ({
    comments,
    isCommentAllowed,
    fetchComments,
    hasMoreComments = true,
    isMod = false,
}) => {
    const [allComments, setAllComments] = useState<CommentReplies[]>([...comments])

    useEffect(() => {
        console.log('checking comments ', comments)
        setAllComments(comments)
    }, [comments])

    const onDelete = (id: string) => {
        PostCommentsService.delete(id, isMod).then(() => {
            const rep = allComments.filter(reply => reply._id !== id)
            setAllComments(rep)
        })
    }
 
    // const [] = useState<Record<string, any>>({})

    return (
        <React.Fragment>
            {allComments.map(item => (
                <Fade enter={true} down delay={300}>
                    <CommentItem
                        isMod={isMod}
                        deleteReply={onDelete}
                        isCommentAllowed={isCommentAllowed}
                        key={item._id}
                        comment={item}
                        totalReplies={item.repliesCount}
                        postID={item.postId} />
                </Fade>
            ))}
            {hasMoreComments ? (
                <div className="text-center">
                    <button onClick={fetchComments} className="text-muted btn font-weight-bold show__more-btn">
                        Load More
                    </button>
                </div>
            ) : null}
        </React.Fragment>
    )
}

export default PostComments
