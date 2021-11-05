import React, { FC } from "react"

import { FeedType } from "../../Interface/Home/FeedsInterface"
import relativeDate from "../../Helpers/Date/relativeDate"
import assetUrl from "../../Helpers/Functions/assetUrl"

export interface SharePostProps {
    post: FeedType
}

const SharePost: FC<SharePostProps> = ({ post }) => {
    return (
        <div className="mc-border p-3">
            <div className="post-header d-flex justify-content-between">
                <div className="post-head-detail d-flex">
                    <div className="profile-image">
                        <img src={assetUrl(post.knowledgeGroup?.logo || "")} alt={post.knowledgeGroup?.name} />
                    </div>
                    <div className="post-detail d-flex ml-2">
                        <div className="post-in">Posted in:</div>
                        <div className="post-title  ml-1">{post.knowledgeGroup?.name}</div>
                        <div className="post-in  ml-1">by: {post.author?.userName}</div>
                    </div>
                </div>
                <div className="post-time pr-3">
                    <div className="post-in">{relativeDate(post.createdAt)}</div>
                </div>
            </div>
            <div className="px-2">
                <p className="post-status-text mb-0">{post.title}</p>
            </div>
            <div className="post-mnain-image mb-1">
                <img src={assetUrl(post.image![0])} alt={post.title} className="img-fluid" />
            </div>
            <div className="post-footer pb-2 pl-2">
                <div className="lefts">
                    <div className="points">
                        <span className="text">{post.likes.length} Points</span>
                    </div>
                    <div className="comments">
                        <span className="text">{post.totalComments} Comments</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SharePost
