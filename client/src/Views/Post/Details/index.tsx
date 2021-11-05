import React, { ChangeEvent, ReactElement, useEffect, useRef, useState } from "react"
import { useLocation, useParams, Link } from "react-router-dom"
import ReactCSSTransitionGroup from "react-transition-group"
import SignInAlert from "../../../Container/NotLoggedIn/SignInAlert"
import MainContent from "../../../Controller/Main/Content"
import CommunitiesList from "../../../Helpers/Request/Services/Communities/Communities"
import Post from "../../../Helpers/Request/Services/Post/Post"
import CommentBox from "./Components/CommentBox"
import PostComments from "./Components/PostComments"
import { PostedImage } from "../../../Shared/Images/Images"
import { isLoggedIn } from "../../../Hooks/Auth/getAuth"
import { PostCommentsService } from "../../../Helpers/Request/Services/Comments/PostComments"
import assetUrl from "../../../Helpers/Functions/assetUrl"
import { FeedType } from "../../../Interface/Home/FeedsInterface"
import PostItem from "../../../Controller/Home/Posts/PostItem"

const comRef: any = React.createRef()

const PostDetails = (): ReactElement => {
    const { id } = useParams<{ id: string }>()
    const { state }: any = useLocation()
    const [page, setPage] = useState(1)
    const [comments, setComments] = useState<any>({
        comments: [],
        totalVotes: 0,
        totalReplies: 0,
    })
    const [values, setValues] = useState({
        postId: id,
        body: "",
    })
    // let commentTest = useRef({postId: id, body: ""});
    const [details, setDetails] = useState<FeedType | undefined>(state || undefined)
    const [auth] = useState(isLoggedIn)

    const onChange = (e?: ChangeEvent<HTMLInputElement>) => {
        if (e) {
            setValues({ ...values, [e.target.name]: e.target.value })
        } else {
            setValues({ ...values, body: "" })
        }

        // commentTest = {postId: id, body: e.target.value};
    }

    const getComments = () => setPage(page + 1)

    const fetchComments = () => {
        PostCommentsService.getTopLevelComments(id || "", {}, page).then(response => {
            const { docs, upVoteCount, downVoteCount, totalDocs } = response.data.body
            setComments({
                comments: [...comments.comments, ...docs],
                totalVotes: upVoteCount - downVoteCount,
                totalReplies: totalDocs,
            })
            setValues({
                ...values,
                body: "",
            })
        })
    }

    useEffect(() => {
        fetchComments()
    }, [page])

    useEffect(() => {
        document.addEventListener("comment-success", fetchComments)
        return () => document.removeEventListener("comment-success", fetchComments)
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        Post.detailsById(id).then(response => {
            setDetails(response.data.data)
        })
    }, [id])

    const joinCommunity = (communityId: string) => {
        CommunitiesList.joinCommunity(communityId)
    }

    const afterComment = (data: any) => {
        onChange()
        // setValues({ ...values, body: "" })
        let comment = values
        comment.body = ""
        setValues({ ...values })
        setComments({ ...values, comments: [data, ...comments.comments] })
        scroll()
    }

    const scroll = () => {
        let wScroll = window.scrollY
        let scrollTo = wScroll + 130 // comRef.current.offsetTop;
        window.scrollTo(0, scrollTo)
    }

    return (
        <MainContent
            asideRightContent={
                <div className="mc-border mt-5 mt-lg-0 mb-3">
                    <div className="group-wrap">
                        <div className="grp-header d-flex justify-content-between">
                            <Link to={`/community/details/${details?.knowledgeGroup?._id}`}>
                                <div className="d-flex flex-row align-items-center ">
                                    <div className="image mr-2 profile-image">
                                        <img
                                            src={
                                                details?.knowledgeGroup?.logo
                                                    ? assetUrl(details.knowledgeGroup?.logo)
                                                    : PostedImage
                                            }
                                            alt="profile"
                                        />
                                    </div>
                                    <div className="d-flex flex-column">
                                        <div className="grp-name">{details?.knowledgeGroup?.name}</div>
                                        <div className="grp-members">
                                            <span>Members</span>
                                            <span className={"ml-2"}>{details?.knowledgeGroup?.members || 0}</span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                        <p className="general-text pt-2 mb-0">{details?.knowledgeGroup?.description || ""}</p>
                        <div className="form-group mt-3">
                            {(auth && (
                                <button
                                    className="btn btn-view"
                                    onClick={() => joinCommunity(details?.knowledgeGroup?._id || "")}
                                >
                                    JOINED
                                </button>
                            )) || <SignInAlert />}
                        </div>
                    </div>
                </div>
            }
        >
            {details ? (
                <PostItem
                    totalComments={comments.totalReplies}
                    post={details}
                    idx={0}
                    isUser={true}
                    topMargin={false}
                    hideAward={false}
                />
            ) : null}
            <CommentBox
                isCommentAllowed={!!details?.isJoined}
                onChange={onChange}
                data={values.body}
                postId={values.postId}
                // afterComment={fetchComments}
                afterComment={(data: any) => afterComment(data)}
                submitUrl={"/comment"}
            />
            <div ref={comRef}></div>
            <PostComments
                isMod={!!details?.isComMod}
                hasMoreComments={comments.totalReplies > comments.comments.length}
                fetchComments={getComments}
                isCommentAllowed={!!details?.isJoined}
                comments={comments.comments}
            />
        </MainContent>
    )
}

export default PostDetails
