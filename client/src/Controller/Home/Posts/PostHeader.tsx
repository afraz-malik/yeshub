import * as React from "react"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faThumbtack } from "@fortawesome/free-solid-svg-icons"

import { FeedType } from "../../../Interface/Home/FeedsInterface"
import assetUrl from "../../../Helpers/Functions/assetUrl"
import CaseStudyStatus from "../../../Helpers/General/PostCaseStudyStatus"
import relativeDate from "../../../Helpers/Date/relativeDate"

import Post from "../../../Helpers/Request/Services/Post/Post"
import { POST_PIN_EVENT } from "../../../Constants/constants"
import PostVote from "./PostVote"
import SavePost from "../../../Shared/HelperBtn/SavePost"
import { RemovedImage } from "../../../Shared/Images/Images"

export interface PostHeaderProps {
    item: FeedType
    onVoteToggled?: any
}

const PostHeader: React.SFC<any> = ({ item, onVoteToggled }) => {
    const [isPinned, togglePinned] = React.useState(item.isPined)

    const onPinToggled = () => {
        Post.pin(item._id, isPinned ? "unpin" : "pin").then(() => {
            togglePinned(!isPinned)
            document.dispatchEvent(
                new CustomEvent(POST_PIN_EVENT, {
                    detail: {
                        id: item._id,
                        pinned: !isPinned,
                    },
                })
            )
        })
    }

    return (
        <div className="post-header">
            <div className="post-head-detail d-flex flex-row">
                <div className="profile-image">
                    <Link to={`/public/profile/${item?.author?._id}`}>
                        <img
                            src={
                                item.author
                                    ? assetUrl(
                                          item?.author?.userImage ||
                                              "https://brighterwriting.com/wp-content/uploads/icon-user-default.png"
                                      )
                                    : RemovedImage
                            }
                            alt={item.knowledgeGroup?.name}
                        />
                    </Link>
                </div>
                <div className="user-name d-flex flex-column" style={{ marginLeft: "1.2em" }}>
                    <Link to={"/public/profile/" + item?.author?._id}>
                        <span
                            className="post-header-username"
                            style={{ color: "243c4b", fontWeight: 700, fontSize: "16px" }}
                        >
                            {item?.author?.userName || "User Removed"}
                        </span>
                    </Link>
                    <span className="post-header-username" style={{ color: "243c4b", opacity: 0.5, fontSize: "12px" }}>
                        {relativeDate(item.createdAt.toLocaleString()) || item.createdAt || "2 Minuts Ago"}
                    </span>
                </div>
                <span style={{ marginLeft: "10px", marginRight: "10px" }}>{ChevronRight}</span>
                <span
                    className="post-header-community-name"
                    style={{ color: "243c4b", fontWeight: 700, fontSize: "16px" }}
                >
                    <Link to={`/community/details/${item.knowledgeGroup?._id}`}>{item.knowledgeGroup?.name || ""}</Link>
                </span>
                <div className="ml-auto flex-row-reverse" style={{ display: "inline-block" }}>
                    {/* <span style={{ marginRight: "1em" }}>{BellIcon}</span> */}
                    {/* <span>{SavedIcon} Save</span> */}
                    <SavePost isSaved={item.isSaved} id={item._id} type="post" />
                </div>
            </div>
            <div className="d-flex flex-row mlp-45">
                <PostVote
                    onToggled={() => onVoteToggled()}
                    postId={item._id}
                    isLiked={item.isLiked}
                    totalLikes={item.totalVotes || 0}
                />
                <Link className="d-block mt-auto mb-auto" to={{ pathname: `/post/details/${item._id}`, state: item }}>
                    <h2 className=" text-dark-blue fw-700 fs-24">{item.title}</h2>
                </Link>
            </div>
        </div>
    )

    //             {isPinned ? <span className={`badge mr-2 pointer badge-success`}>Pinned</span> : null}

    //             {item.isModerator || item.isComMod ? (
    //                 <span
    //                     className={`badge mr-2 pointer badge-${isPinned ? "success" : "info"}`}
    //                     onClick={onPinToggled}
    //                 >
    //                     <FontAwesomeIcon icon={faThumbtack} />
    //                 </span>
    //             ) : null}
    //             <div className="post-in">{relativeDate(item.createdAt)}</div>
    //         </div>
    //     </div>
    // )
}

export default PostHeader

export const ChevronRight = (
    <svg width="5" height="10" viewBox="0 0 5 10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 5L0 10L-4.37114e-07 0L5 5Z" fill="#243C4B" />
    </svg>
)

export const BellIcon = (
    <svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M8 20C9.1 20 10 19.1 10 18H6C6 19.1 6.89 20 8 20ZM14 14V9C14 5.93 12.36 3.36 9.5 2.68V2C9.5 1.17 8.83 0.5 8 0.5C7.17 0.5 6.5 1.17 6.5 2V2.68C3.63 3.36 2 5.92 2 9V14L0 16V17H16V16L14 14Z"
            fill="#243C4B"
        />
    </svg>
)

export const SavedIcon = (
    <svg width="17" height="22" viewBox="0 0 17 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M14.2857 0H2.38095C1.07143 0 0.011905 1.07143 0.011905 2.38095L0 21.4286L8.33333 17.8571L16.6667 21.4286V2.38095C16.6667 1.07143 15.5952 0 14.2857 0ZM14.2857 17.8571L8.33333 15.2619L2.38095 17.8571V2.38095H14.2857V17.8571Z"
            fill="#243C4B"
        />
    </svg>
)

export const PostVoteComponent: React.FC<any> = ({ counts }) => {
    return (
        <span>
            {counts} <span>{VoteIcon}</span>
        </span>
    )
}

export const VoteIcon = (
    <svg width="20" height="28" viewBox="0 0 20 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M11.875 0C11.875 0 12.8 3.47867 12.8 6.30098C12.8 9.00516 11.1125 11.1974 8.5375 11.1974C5.95 11.1974 4 9.00516 4 6.30098L4.0375 5.82841C1.5125 8.9789 0 13.0614 0 17.4984C0 23.3005 4.475 28 10 28C15.525 28 20 23.3005 20 17.4984C20 10.4229 16.7625 4.10877 11.875 0ZM9.6375 24.0619C7.4125 24.0619 5.6125 22.2241 5.6125 19.94C5.6125 17.8134 6.925 16.3169 9.125 15.8444C11.3375 15.3718 13.625 14.256 14.9 12.4576C15.3875 14.151 15.6375 15.9362 15.6375 17.7609C15.6375 21.2396 12.95 24.0619 9.6375 24.0619Z"
            fill="#243C4B"
        />
    </svg>
)

export const VoteComponent: React.FC<any> = ({ count, liked, _id }) => {
    return (
        <span style={{ padding: "1em", border: "1px solid lightgray", backgroundColor: "yellow" }}>
            {count} {VoteIcon}
        </span>
    )
}
