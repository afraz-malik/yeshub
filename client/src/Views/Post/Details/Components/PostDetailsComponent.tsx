import React, { FC, useState, useEffect } from "react"
import { useParams } from "react-router-dom"

import relativeDate from "../../../../Helpers/Date/relativeDate"
import Post from "../../../../Helpers/Request/Services/Post/Post"
import { CommentIcon, DownIcon, UpIcon } from "../../../../Shared/Images/Images"
import { FeedTypeData } from "../../../../Interface/Home/FeedsInterface"
import assetUrl from "../../../../Helpers/Functions/assetUrl"
import SharedBtn from "../../../../Shared/HelperBtn/SharedBtn"
import ReportBtn from "../../../../Shared/HelperBtn/ReportBtn"
import SavePost from "../../../../Shared/HelperBtn/SavePost"
import HideBtn from "../../../../Shared/HelperBtn/HideBtn"

const PostDetailsComponent: FC<FeedTypeData> = ({ feed }) => {
    const { id } = useParams()
    const [details, setDetails] = useState(feed)

    useEffect(() => {
        console.log("Sacsaadsa")

        // setSaved()
    }, [])

    const Vote = (id: string, type: "upVote" | "downVote") => {
        type === "upVote"
            ? Post.upVote(id).then(() => {
                  Post.detailsById(id).then(response => {
                      setDetails(response.data.data)
                  })
              })
            : Post.downVote(id).then(() => {
                  Post.detailsById(id).then(response => {
                      setDetails(response.data.data)
                  })
              })
    }

    return (
        <>
            <div className="post-container">
                <div className="post-wrap">
                    <div className="post-body">
                        <div className="ps-left">
                            <div className="left-wrapper">
                                <div className="post-header d-flex justify-content-between">
                                    <div className="post-head-detail d-flex">
                                        <div className="profile-image">
                                            <img src={assetUrl(details.knowledgeGroup?.logo || "")} alt="profile" />
                                        </div>
                                        <div className="post-detail d-flex ml-2">
                                            <div className="post-in">Posted in:</div>
                                            <div className="post-title  ml-1">{details?.knowledgeGroup?.name}</div>
                                            <div className="post-in  ml-1">by: {details.author?.userName}</div>
                                        </div>
                                    </div>
                                    <div className="post-time ">
                                        <div className="post-in">{relativeDate(details.createdAt)}</div>
                                    </div>
                                </div>
                                <p className="post-status-text mb-0">
                                    {details.description}{" "}
                                    <span className="hash-text">
                                        {details.tags &&
                                            details.tags.map((item, idx) => (
                                                <span className="mr-2" key={idx}>
                                                    {item}
                                                </span>
                                            ))}
                                    </span>
                                </p>

                                <div className="post-footer">
                                    <div className="lefts">
                                        <SavePost isSaved={details.isSaved} type="post" id={details._id} />
                                        <SharedBtn type="post" item={details} />
                                    </div>
                                    <div className="rights">
                                        <HideBtn id={details._id} />
                                        <ReportBtn id={details._id} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="ps-right">
                            <div className="voteBox">
                                <div className="top">
                                    <button className="btn btn-vote" onClick={() => Vote(id || "", "upVote")}>
                                        <img src={UpIcon} alt="upvote" />
                                    </button>
                                    <span className="d-block my-2">
                                        {details.likes.length - details.disLikes.length}
                                    </span>
                                    <button className="btn btn-vote">
                                        <img src={DownIcon} alt="downvote" onClick={() => Vote(id || "", "downVote")} />
                                    </button>
                                </div>
                                <div className="bottom">
                                    <span>
                                        <span className="comment-image">
                                            <img src={CommentIcon} alt="comments" />
                                        </span>
                                        <span className="comment-text ml-1">20</span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PostDetailsComponent
