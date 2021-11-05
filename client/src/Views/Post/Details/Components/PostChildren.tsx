import React, { FC, ReactElement } from "react"

import relativeDate from "../../../../Helpers/Date/relativeDate"
import { CommentReplies } from "../../../../Interface/Comments/CommentsInterface"
import { BackArrow } from "../../../../Shared/Images/Images"
import AwardBtn from "../../../../Shared/HelperBtn/AwardBtn"
import SharedBtn from "../../../../Shared/HelperBtn/SharedBtn"
import ReportBtn from "../../../../Shared/HelperBtn/ReportBtn"
import SavePost from "../../../../Shared/HelperBtn/SavePost"
import HideBtn from "../../../../Shared/HelperBtn/HideBtn"
import { Link } from "react-router-dom"

type PostChildren = {
    item: CommentReplies
    topMargin?: boolean
}

export const PostChildren: FC<PostChildren> = ({ item, topMargin = false }): ReactElement => {
    return (
        <div className={`main-data message-container ${topMargin && "pt-4"}`}>
            <div className="post-wrap">
                <div className="post-body">
                    <div className="ps-left">
                        <div className="left-wrapper">
                            <div className="post-header d-flex justify-content-between">
                                <div className="post-head-detail d-flex">
                                    <Link to={`/profile/${item.userId._id}`}>
                                        <div className="post-detail pl-0 d-flex">
                                            <div className="post-in">Reply by :</div>
                                            <div className="post-in  ml-1">{item.userId.userName}</div>
                                        </div>
                                    </Link>
                                </div>
                                <div className="post-time ">
                                    <div className="post-in">{relativeDate(item.createdAt)}</div>
                                </div>
                            </div>
                            <p className="post-title1 mb-0 py-1">{item.body}</p>
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
                                    <SavePost isSaved={false} type="post" id={item._id} />
                                    <SharedBtn type="post" item={item} />
                                </div>
                                <div className="rights">
                                    <HideBtn id={item._id} type="comment" />
                                    <ReportBtn id={item._id} type="comment" />
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
                                <span className="d-block my-2"> {item.upVoteCount - item.downVoteCount} </span>
                                <button className="btn btn-vote">
                                    <i className={`fa fa-arrow-down`} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
