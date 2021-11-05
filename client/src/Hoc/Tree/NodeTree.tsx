import React, { FC, ReactElement, useState } from "react"

import relativeDate from "../../Helpers/Date/relativeDate"
import { BackArrow } from "../../Shared/Images/Images"
import { CommentReplies } from "../../Interface/Comments/CommentsInterface"
import { PostCommentsService } from "../../Helpers/Request/Services/Comments/PostComments"
import AwardBtn from "../../Shared/HelperBtn/AwardBtn"
import SharedBtn from "../../Shared/HelperBtn/SharedBtn"
import ReportBtn from "../../Shared/HelperBtn/ReportBtn"
import SavePost from "../../Shared/HelperBtn/SavePost"
import HideBtn from "../../Shared/HelperBtn/HideBtn"
import { node } from "prop-types"
import { Link } from "react-router-dom"

type node = {
    props: any
    comment: CommentReplies
    isReply?: boolean
    replyId?: string
}

const NodeTree: FC<node> = ({ props, comment }): ReactElement => {
    const [children, setChildren] = useState([])

    const onMore = () => {
        PostCommentsService.getCommentReplies(comment._id).then(response => {
            setChildren(response.data.data.docs)
        })
    }
    return (
        <>
            <div className={"main-data message-container pt-3"} key={comment._id}>
                <div className="post-wrap">
                    <div className="post-body">
                        <div className="ps-left">
                            <div className="left-wrapper">
                                <div className="post-header d-flex justify-content-between">
                                    <div className="post-head-detail d-flex">
                                        <Link to={`/profile/${comment.userId._id}`}>
                                            <div className="post-detail d-flex">
                                                <div className="post-in">Reply by :</div>
                                                <div className="post-in  ml-1">{comment.userId.userName}</div>
                                            </div>
                                        </Link>
                                    </div>
                                    <div className="post-time ">
                                        <div className="post-in">{relativeDate(comment.createdAt)}</div>
                                    </div>
                                </div>
                                <p className="general-text">{comment.body}</p>
                                <div className="post-footer">
                                    <div className="lefts">
                                        <div className="post-reply">
                                            <span>
                                                <span className="icon">
                                                    <img src={BackArrow} alt="back" />
                                                </span>
                                                <span className="text">Reply</span>
                                            </span>
                                        </div>
                                        <SavePost isSaved={false} type="post" id={""} />
                                        <SharedBtn type="comment" item={comment} />
                                    </div>
                                    <div className="rights">
                                        <HideBtn id={comment._id} type="comment" />
                                        <ReportBtn id={comment._id} type="comment" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="ps-right">
                            <div className="voteBox">
                                <div className="top">
                                    <button className="btn btn-vote">
                                        <i className={`fa fa-arrow-up `} />
                                    </button>
                                    <span className="d-block my-2">{12}</span>
                                    <button className="btn btn-vote">
                                        <i className={`fa fa-arrow-down`} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <span className="replyCount" id={comment._id} onClick={onMore}>
                +{comment.replies} Replies
            </span>
            {children.map((childNode: any) => (
                <NodeTree {...props} comment={childNode} />
            ))}
        </>
    )
}

export default NodeTree
