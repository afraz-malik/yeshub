// @ts-nocheck

import React, { useState, useEffect } from "react"
import Post from "../../../Helpers/Request/Services/Post/Post"
import SavePost from "../../../Shared/HelperBtn/SavePost"
import assetUrl from "../../../Helpers/Functions/assetUrl"
import SharedBtn from "../../../Shared/HelperBtn/SharedBtn"
import CommentBtn from "../../../Shared/HelperBtn/CommentBtn"
import PostBody from "./PostBody"
import PostDropdown from "./PostDropdown"
import HideBtn from "../../../Shared/HelperBtn/HideBtn"
import ReportBtn from "../../../Shared/HelperBtn/ReportBtn"
import { user, userId } from "../../../Constants/getUserId"
import PostHeader from "./PostHeader"
import { DELETE_POST_EVENT } from "../../../Constants/constants"
import { FeedType } from "../../../Interface/Home/FeedsInterface"
import ReactGA from "react-ga"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAward } from "@fortawesome/free-solid-svg-icons"
import AwardModal from "../../../Shared/Award/Award"
import CommentBox from "../../../Views/Post/Details/Components/CommentBox"
import { useHistory } from "react-router"
import { PostCommentsService } from "../../../Helpers/Request/Services/Comments/PostComments"

export interface PostItemProps {
    post: FeedType
    topMargin: boolean
    isUser: boolean
    idx: number
    totalComments?: number
    awards?: any
    hideAward?: boolean
}

const PostItem: React.FC<PostItemProps> = ({
    post,
    topMargin,
    isUser,
    idx,
    totalComments,
    awards = [],
    hideAward = false,
    location,
    match,
}) => {
    const [item, setItem] = React.useState(post)
    const [showAwardDialog, setShowAwardDialog] = React.useState(false)

    const onDelete = () => {
        const confirm = window.confirm("Are you sure")
        if (confirm) {
            Post.delete(item._id).then(() => {
                document.dispatchEvent(
                    new CustomEvent(DELETE_POST_EVENT, {
                        detail: {
                            id: item._id,
                        },
                    })
                )
            })
        }
    }

    const AppendImages = (items: string[]) => {
        let result: any = []
        items.map(item => result.push(assetUrl(item)))
        return result
    }

    const markAsCaseStudy = () => {
        Post.markAsCaseStudy(item._id).then(response => {
            if (response) {
                setItem({
                    ...item,
                    isCaseStudy: 1,
                })
            }
        })
    }

    const requestAsCaseStudy = () => {
        Post.requestForCaseStudy(item._id).then(response => {
            if (response) {
                setItem({
                    ...item,
                    isCaseStudy: 2,
                })
            }
        })
    }

    const handleAwardShow = bit => {
        setShowAwardDialog(bit)
    }

    return (
        <div className={`post-container ${(idx > 0 && "pt-4") || (topMargin && "mt-4")}`} key={item._id}>
            <div className="post-wrap">
                <div className="post-body">
                    <div className="ps-left" style={{ padding: "2em" }}>
                        <div
                            className="left-wrapper"
                            onClick={() =>
                                ReactGA.event({
                                    category: "user",
                                    action: "posts clicked",
                                    label: item?.knowledgeGroup?.name,
                                    nonInteraction: false,
                                })
                            }
                        >
                            <PostHeader
                                onVoteToggled={() => setItem({ ...item, isLiked: !item.isLiked })}
                                item={item}
                            />
                            <PostBody
                                onVoteToggled={() => setItem({ ...item, isLiked: !item.isLiked })}
                                AppendImages={AppendImages}
                                post={item}
                            />
                            <div className="post-footer" style={{ backgroundColor: "white" }}>
                                <div className="lefts">
                                    {!hideAward && <AwardButton handleAwardShow={() => handleAwardShow(true)} />}
                                    {/* <SharedBtn type="post" item={item} /> */}
                                    <CommentBtn text={item.totalComments} link={`/post/details/${item._id}`} />
                                </div>

                                <div className="rights">
                                    {item.author?._id !== userId && (
                                        <React.Fragment>
                                            {/* <HideBtn id={item._id} /> */}
                                            <ReportBtn id={item._id} />
                                        </React.Fragment>
                                    )}
                                    <PostDropdown
                                        isUser={isUser}
                                        item={item}
                                        onDelete={onDelete}
                                        markAsCaseStudy={markAsCaseStudy}
                                        requestAsCaseStudy={requestAsCaseStudy}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {window.location.pathname.indexOf("details") === -1 && <CommentSM postId={item._id} />}
            </div>
            {showAwardDialog && (
                <AwardModal
                    isOpened={showAwardDialog}
                    awards={awards}
                    toggle={() => handleAwardShow(false)}
                    post={item}
                    subText={"Please select the award you want to give"}
                    title={"Award List"}
                    containerClass="award__containerClass"
                    mainClass="award__mainclass"
                />
            )}
        </div>
    )
}

export default PostItem

export const AwardButton: React.FC<any> = ({ handleAwardShow }) => {
    return (
        <span className="mr-4" onClick={() => handleAwardShow(true)}>
            {/* <FontAwesomeIcon icon={faAward} /> */}
            {AwardIconSM} <span style={{ marginLeft: ".42em", alignContent: "center" }}>Award</span>
        </span>
    )
}

export const NominateButton: React.FC<any> = ({}) => {
    return (
        <span className="mr-4">
            {/* <FontAwesomeIcon icon={faAward} /> */}
            {NominateIconSM} <span style={{ marginLeft: ".42em", alignContent: "center" }}>Nominate</span>
        </span>
    )
}

export const NominateIconSM = (
    <svg width="17" height="20" viewBox="0 0 17 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M14.3651 0H2.46032C1.36905 0 0.476196 0.892857 0.476196 1.98413V17.8571C0.476196 18.9484 1.36905 19.8413 2.46032 19.8413H14.3651C15.4564 19.8413 16.3492 18.9484 16.3492 17.8571V1.98413C16.3492 0.892857 15.4564 0 14.3651 0ZM2.46032 1.98413H7.42064V9.92063L4.94048 8.43254L2.46032 9.92063V1.98413Z"
            fill="#243C4B"
        />
    </svg>
)

export const AwardIconSM = (
    <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M18.0451 4.01003H15.8596C15.9699 3.69925 16.0401 3.3584 16.0401 3.00752C16.0401 1.34336 14.6967 0 13.0326 0C11.9799 0 11.0677 0.541353 10.5263 1.35338L10.0251 2.02506L9.52381 1.34336C8.98246 0.541353 8.07017 0 7.01754 0C5.35338 0 4.01002 1.34336 4.01002 3.00752C4.01002 3.3584 4.0802 3.69925 4.19048 4.01003H2.00501C0.89223 4.01003 0.0100251 4.90226 0.0100251 6.01504L0 17.0426C0 18.1554 0.89223 19.0476 2.00501 19.0476H18.0451C19.1579 19.0476 20.0501 18.1554 20.0501 17.0426V6.01504C20.0501 4.90226 19.1579 4.01003 18.0451 4.01003ZM13.0326 2.00501C13.584 2.00501 14.0351 2.45614 14.0351 3.00752C14.0351 3.5589 13.584 4.01003 13.0326 4.01003C12.4812 4.01003 12.0301 3.5589 12.0301 3.00752C12.0301 2.45614 12.4812 2.00501 13.0326 2.00501ZM7.01754 2.00501C7.56892 2.00501 8.02005 2.45614 8.02005 3.00752C8.02005 3.5589 7.56892 4.01003 7.01754 4.01003C6.46616 4.01003 6.01504 3.5589 6.01504 3.00752C6.01504 2.45614 6.46616 2.00501 7.01754 2.00501ZM18.0451 17.0426H2.00501V15.0376H18.0451V17.0426ZM18.0451 12.0301H2.00501V6.01504H7.09774L5.01253 8.85213L6.63659 10.0251L9.02256 6.77694L10.0251 5.41353L11.0276 6.77694L13.4135 10.0251L15.0376 8.85213L12.9524 6.01504H18.0451V12.0301Z"
            fill="#243C4B"
        />
    </svg>
)
export const CommentSM: React.FC = ({ postId }) => {
    const history = useHistory()
    const [comment, setcomment] = useState("")

    const createComment = e => {
        e.preventDefault()
        PostCommentsService.addComment({ postId: postId, body: comment })
            .then(res => {
                history.push("/post/details/" + postId)
            })
            .catch(err => console.log(err))
    }

    return (
        <div className="d-flex flex-row p-2e" style={{ paddingTop: "0" }}>
            <div className="profile pr-4">
                <img
                    src={assetUrl(user.userImage)}
                    style={{ width: "50px", height: "50px", borderRadius: "50%", border: "1px solid lightgray" }}
                />
            </div>
            <form style={{ width: "100%" }} onSubmit={e => createComment(e)}>
                <input
                    style={{ height: "50px" }}
                    type="text"
                    className="form-control fs-16 br-10 bg-custom-gray"
                    placeholder="leave comment"
                    value={comment}
                    onChange={e => setcomment(e.target.value)}
                />
            </form>
            {/* <button className="btn btn-sm btn-primary">Comment</button> */}
        </div>
    )
}
