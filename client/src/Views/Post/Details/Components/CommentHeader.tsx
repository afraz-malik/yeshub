import * as React from "react"
import { Link } from "react-router-dom"
import assetUrl from "../../../../Helpers/Functions/assetUrl"
import relativeDate from "../../../../Helpers/Date/relativeDate"
import { CommentReplies } from "../../../../Interface/Comments/CommentsInterface"
import isBaseImg from "../../../../Helpers/Functions/isBaseImg"
import { RemovedImage } from "../../../../Shared/Images/Images"

export interface CommentHeaderProps {
    comment: CommentReplies
}

const CommentHeader: React.SFC<CommentHeaderProps> = ({ comment }) => {
    return (
        <div className="post-header d-flex justify-content-between">
            <div className="post-head-detail d-flex">
                <Link to={`${comment.userId ? `/profile/${comment?.userId?._id}` : null}`}>
                    <div className="post-detail pl-0 d-flex">
                        <div className="profile-image">
                            <img
                                src={
                                    // isBaseImg(comment.userId?.userImage)
                                    //     ? comment.userId?.userImage
                                    //     :
                                    comment.userId ? assetUrl(comment.userId?.userImage) : RemovedImage
                                }
                                alt={comment.userId?.userName || "User Removed"}
                            />
                        </div>
                        <div className="post-in">Reply by :</div>
                        <div className="post-in  ml-1">
                            {" "}
                            {comment.userId ? comment.userId?.userName : "User Removed"}
                        </div>
                    </div>
                </Link>
            </div>
            <div className="post-time ">
                <div className="post-in">{relativeDate(comment.createdAt)}</div>
            </div>
        </div>
    )
}

export default CommentHeader
