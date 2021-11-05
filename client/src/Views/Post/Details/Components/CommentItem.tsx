import * as React from "react"
import { AxiosResponse } from "axios"
import { Row, Col } from "react-bootstrap"
import { useParams } from "react-router-dom"

import ReportBtn from "../../../../Shared/HelperBtn/ReportBtn"
import CommentHeader from "./CommentHeader"

import { CommentReplies } from "../../../../Interface/Comments/CommentsInterface"
import { PostCommentsService } from "../../../../Helpers/Request/Services/Comments/PostComments"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash } from "@fortawesome/free-solid-svg-icons"
import { userId } from "../../../../Constants/getUserId"

export interface CommentItemProps {
    isMod: boolean
    comment: CommentReplies
    totalReplies: number
    isCommentAllowed: boolean
    deleteReply: (id: string) => void
    postID?: string
}

const CommentItem: React.FC<CommentItemProps> = ({
    comment,
    totalReplies = 0,
    isCommentAllowed = true,
    deleteReply,
    isMod,
    postID,
}) => {
    const { id: pId } = useParams()
    const [repliesCount, setRepliesCount] = React.useState(totalReplies)
    const [showReplies, toggleShowReplies] = React.useState(true)
    const [page, setPage] = React.useState(1)
    const [isVoted, toggleVote] = React.useState(!!comment.isLiked)
    const [totalLiked, setTotalLikes] = React.useState(comment.upVoteCount)
    const [replies, setReplies] = React.useState<CommentReplies[]>(comment.children || [])
    const [reply, setReply] = React.useState({
        body: "",
        commentId: comment._id,
        postId: postID,
    })
    const [isReplying, toggleReply] = React.useState(false)

    const postCommentReply = () => {
        // if (reply.commentId) delete reply.postId

        PostCommentsService.addComment(reply).then(response => {
            setReplies([...replies, response.data.body])
            setRepliesCount(repliesCount + 1)
            toggleReply(false)
        })
    }

    const onDelete = (id: string) => {
        PostCommentsService.delete(id, isMod).then(() => {
            const rep = replies.filter(reply => reply._id !== id)
            setReplies(rep)
            setRepliesCount(repliesCount - 1)
        })
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setReply({ ...reply, [event.target.name]: event.target.value })
    }

    const getReplies = () => {
        setPage(prevPage => prevPage + 1)
    }

    const getCommentReplies = () => toggleShowReplies(!showReplies)

    React.useEffect(() => {
        PostCommentsService.getCommentReplies(comment._id, {}, page).then((response: AxiosResponse) => {
            setReplies([...replies, ...(response.data.data || [])])
            toggleShowReplies(true)
        })
        // eslint-disable-next-line
    }, [page])

    const toggleReplyButton = () => toggleReply(!isReplying)

    const onVote = () => {
        PostCommentsService.helpful(comment._id, isVoted).then(() => {
            setTotalLikes(isVoted ? totalLiked - 1 : totalLiked + 1)
            toggleVote(!isVoted)
        })
    }

    return (
        <div className="post-container comment__item">
            <div className="main-data pt-4">
                <div className="post-wrap">
                    <div className="post-body">
                        <div className="ps-left">
                            <div className="left-wrapper">
                                <CommentHeader comment={comment} />
                                <p className="general-text">{comment.body}</p>
                                <div className="post-footer">
                                    <div className="lefts">
                                        <div className="post-reply pointer" onClick={onVote}>
                                            <span>{totalLiked}</span>
                                            <svg width={20} height={20} viewBox="0 0 40 58" className="">
                                                <path
                                                    d="M23.75 0C23.75 0 25.6 7.20581 25.6 13.052C25.6 18.6535 22.225 23.1946 17.075 23.1946C11.9 23.1946 8 18.6535 8 13.052L8.075 12.0731C3.025 18.5992 0 27.0558 0 36.2466C0 48.2654 8.95 58 20 58C31.05 58 40 48.2654 40 36.2466C40 21.5902 33.525 8.51102 23.75 0ZM19.275 49.8425C14.825 49.8425 11.225 46.0356 11.225 41.3043C11.225 36.8992 13.85 33.7993 18.25 32.8204C22.675 31.8415 27.25 29.5302 29.8 25.805C30.775 29.3127 31.275 33.0108 31.275 36.7904C31.275 43.9963 25.9 49.8425 19.275 49.8425Z"
                                                    fill="#243C4B"
                                                    fillOpacity={isVoted ? 1 : 0.6}
                                                />
                                            </svg>
                                            <span className="text">Helpful{!isVoted ? "?" : ""}</span>
                                        </div>
                                        <div className="post-reply" onClick={toggleReplyButton}>
                                            <span className="icon">
                                                <svg
                                                    className="comment--icon"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M20.8 1H3.2C1.99 1 1 1.99 1 3.2V23L5.4 18.6H20.8C22.01 18.6 23 17.61 23 16.4V3.2C23 1.99 22.01 1 20.8 1ZM20.8 16.4H5.4L3.2 18.6V3.2H20.8V16.4Z"
                                                        fill="#243C4B"
                                                        stroke="#243C4B"
                                                        strokeWidth="0.5"
                                                    />
                                                </svg>
                                            </span>
                                            <span className="text">
                                                {repliesCount ? (
                                                    <span className="badge badge-lg badge-info">{repliesCount}</span>
                                                ) : (
                                                    "Reply"
                                                )}
                                            </span>
                                        </div>
                                        {repliesCount !== 0 ? (
                                            <span className="replyCount" id={comment._id} onClick={getCommentReplies}>
                                                {showReplies ? "Hide Replies" : `+${repliesCount} Replies`}
                                            </span>
                                        ) : null}
                                    </div>
                                    <div className="rights">
                                        <ReportBtn type="comment" id={comment._id} />
                                        {comment?.userId?._id === userId || isMod ? (
                                            <div className="post-hide pointer" onClick={() => deleteReply(comment._id)}>
                                                <FontAwesomeIcon icon={faTrash} className="icon" />
                                                <span className="text">Delete</span>
                                            </div>
                                        ) : null}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {isReplying && isCommentAllowed ? (
                <div className="pl-3">
                    <div className="mc-border p-2 mt-3">
                        <Row className="align-items-center">
                            <Col className="flex-1">
                                <input
                                    name="body"
                                    id="body"
                                    className="form-control form-input2"
                                    type="text"
                                    placeholder="Comment Reply"
                                    onChange={handleChange}
                                    value={reply.body}
                                />
                            </Col>
                            <div style={{ width: "130px" }}>
                                <button type="button" className={"btn btn-md btn-signup"} onClick={postCommentReply}>
                                    Reply
                                </button>
                            </div>
                        </Row>
                    </div>
                </div>
            ) : null}
            {showReplies && (
                <React.Fragment>
                    {replies.map(reply => (
                        <CommentItem
                            isMod={isMod}
                            deleteReply={onDelete}
                            isCommentAllowed={isCommentAllowed}
                            comment={reply}
                            totalReplies={reply.repliesCount}
                            key={reply._id}
                            postID={postID}
                        />
                    ))}
                    {repliesCount > replies.length ? (
                        <div className="text-center">
                            <button onClick={getReplies} className="text-muted btn font-weight-bold show__more-btn">
                                Load More
                            </button>
                        </div>
                    ) : null}
                </React.Fragment>
            )}
        </div>
    )
}

export default CommentItem
