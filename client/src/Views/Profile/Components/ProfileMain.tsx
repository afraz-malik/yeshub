import React, { Fragment, useEffect, useState } from "react"
import { Switch, Route, NavLink } from "react-router-dom"

import FormHeader from "../../../Container/Top/FormHeader"
import SortBy from "../../../Container/Top/SortBy"
import MyPosts from "./Posts"
import UserEvents from "./UserEvents"
import EventPostsOverView from "./All"
import getUserPosts from "../../../Helpers/Request/Services/Profile/GetUserPosts"
import eventApi from "./../../../Helpers/Request/Services/Event/Event"
import useInfiniteScroll from "../../../Hooks/useInfiniteScroll"
import IEvent from "../../../Models/User/IEvent"
import axiosService from "../../../Helpers/Request/axiosService"
import PostVote from "../../../Controller/Home/Posts/PostVote"
import { ChevronRight } from "../../../Controller/Home/Posts/PostHeader"
import PostItem, { AwardButton } from "../../../Controller/Home/Posts/PostItem"
import CommentBtn from "../../../Shared/HelperBtn/CommentBtn"
import SavePost from "../../../Shared/HelperBtn/SavePost"
import ReportBtn from "../../../Shared/HelperBtn/ReportBtn"
import EventBody from "../../../Controller/Home/Announcement/newDesign/EventBody"
import NewsFeedEvent from "../../../Controller/Home/Announcement/NewsFeedEvent"
import UserSettings from "../../../Helpers/Request/Services/Profile/UserSettings"
import EventBus from "../../../Helpers/Request/Services/event-bus"
import ModIndex from "../../Modinbox"
interface pagination {
    page: number
    totalPages?: number
    totalDocs?: number
    hasNextPage?: boolean
    hasPrevPage?: boolean
}

const ProfileMain: React.FC<any> = ({ ID, _posts = [] }) => {
    const [posts, setPosts] = useState<any[]>(_posts)
    const [events, setEvents] = useState<IEvent[]>([])
    const [state, setstate] = useState(1)
    const [mixed, setmixed] = useState<any[]>([])
    const [pagination, setpagination] = useState<pagination>({
        page: 1,
        hasNextPage: false,
        hasPrevPage: false,
        totalDocs: 0,
        totalPages: 0,
    })
    const page = 1

    const loadMore = () => {
        if (ID) {
            getUserPosts.fetchAllMixedPublic(ID, pagination.page + 1).then((response: any) => {
                setmixed([...mixed, ...response.data.data.docs])
                setpagination({ ...response.data.data })
            })
        } else {
            getUserPosts.fetchAllMixed(pagination.page + 1).then(response => {
                setmixed([...mixed, ...response.data.data.docs])
                setpagination({ ...response.data.data })
            })
        }
    }

    useEffect(() => {
        if (ID) {
            getUserPosts.fetchAllMixedPublic(ID).then((response: any) => {
                setmixed([...response.data.data.docs])
                setpagination({ ...response.data.data })
            })
        } else {
            getUserPosts.fetchAllMixed().then(response => {
                setmixed([...response.data.data.docs])
                setpagination({ ...response.data.data })
            })
        }
    }, [])

    useEffect(() => {
        if (ID) {
            UserSettings.fetchProfile(ID)
                .then(res => {
                    console.log(res.data)
                    EventBus.dispatch("profile-data", { detail: res.data.data })
                })
                .catch(err => console.log(err))
        }
    }, [])

    const updateEvents = (event: any, index: number) => {
        events[index] = event
        setEvents([...events])
    }

    const count = () => {
        let counter = 0
        mixed.forEach(itm => {
            if (itm.type === 2 && itm.event) {
                counter++
            }
        })
        if (counter <= 4) {
            loadMore()
        }
    }

    return (
        <div className="profile-wrap">
            <FormHeader title={"My Profile"} showDrafts={false} />

            <div className="mc-border py-2 mt-2">
                <div className="profile-tabs">
                    <div className="d-flex justify-content-between align-items-center">
                        <ul className="nav profile-tabs-nav flex-nowrap" role="tablist">
                            <li
                                className={`nav-item cursor-pointer ${state === 1 ? "fw-700" : ""}`}
                                style={{ borderBottom: `${state === 1 ? "5px" : "0px"} solid yellow` }}
                            >
                                <span onClick={() => setstate(1)} className="nav-link active">
                                    All
                                </span>
                            </li>
                            <li
                                className={`nav-item cursor-pointer ${state === 2 ? "fw-700" : ""}`}
                                style={{ borderBottom: `${state === 2 ? "5px" : "0px"} solid yellow` }}
                            >
                                <span
                                    onClick={() => setstate(2)}
                                    className={`nav-link active ${state === 0 ? "active" : ""}`}
                                >
                                    Posts
                                </span>
                            </li>
                            <li
                                className={`nav-item cursor-pointer ${state === 3 ? "fw-700" : ""}`}
                                style={{ borderBottom: `${state === 3 ? "5px" : "0px"} solid yellow` }}
                            >
                                <span
                                    className={`nav-link ${state === 3 ? "active" : ""}`}
                                    onClick={() => {
                                        count()
                                        setstate(3)
                                    }}
                                >
                                    Events
                                </span>
                            </li>
                        </ul>
                        <SortBy />
                    </div>
                </div>
            </div>

            {state === 1 && (
                <>
                    {mixed.map((item: any, index: number) => (
                        <Fragment key={item._id}>
                            {item.type && item.type === 2 && item.event ? (
                                <NewsFeedEvent event={item.event} />
                            ) : item.post ? (
                                <PostItem post={item.post} topMargin={true} idx={index} isUser={true} awards={[]} />
                            ) : null}
                        </Fragment>
                    ))}
                    <p className="text-center mt-4 cursor-pointer">
                        {pagination.hasNextPage && <a onClick={() => loadMore()}>Load more</a>}
                    </p>
                </>
            )}
            {state === 2 && (
                <>
                    {mixed.map((item: any, index: number) => (
                        <Fragment key={item._id}>
                            {item.type && item.type === 1 && item.post && <ProfilePost post={item.post} />}
                        </Fragment>
                    ))}{" "}
                    <p className="text-center mt-4 cursor-pointer">
                        {pagination.hasNextPage && <a onClick={() => loadMore()}>Load more</a>}
                    </p>
                </>
            )}

            {state === 39 && (
                <>
                    {mixed.map((item: any, index: number) => (
                        <Fragment key={item._id}>
                            {item.type && item.type === 1 && item.event && <NewsFeedEvent event={item.event} />}
                        </Fragment>
                    ))}{" "}
                    <p className="text-center mt-4">
                        {pagination.hasNextPage && <a onClick={() => loadMore()}>Load more</a>}
                    </p>
                </>
            )}

            {state === 3 && (
                <div className="container-fluid">
                    <div className="row">
                        {mixed.map(
                            (item: any, index: number) =>
                                item.type &&
                                item.type === 2 &&
                                item.event && (
                                    <div className="col-md-4 col-sm-4 col-4">
                                        <div className="pt-3">
                                            <div className="event-card-wrap">
                                                <EventBody
                                                    event={item.event}
                                                    onMarkGoing={(going: any) =>
                                                        updateEvents({ ...item.event, going: going }, index)
                                                    }
                                                    link={"link"}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )
                        )}
                        <p className="text-center mt-4 cursor-pointer">
                            {pagination.hasNextPage && <a onClick={() => loadMore()}>Load more</a>}
                        </p>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ProfileMain

export const ProfilePost: React.FC<any> = ({ post }) => {
    return (
        <div className="mc-border mt-4 d-flex flex-row">
            <div className="d-block mt-auto mb-auto">
                <PostVote
                    onToggled={() => {}}
                    postId={post?._id || false}
                    isLiked={post?.isLiked || false}
                    totalLikes={post?.totalVotes || 0}
                />
            </div>

            <img className="m-auto" src={post?.image[0] || "https://i.stack.imgur.com/y9DpT.jpg"} height="100px" />
            <div>
                <p className="text-dark-blue fs-16 fw-700 pl-4">
                    {post.title || "Invitation To Join Plan International's Youth Reasearch Community"}
                </p>
                <p className="fs-12 fw-500 text-dark-blue">
                    <span className="pl-4 pr-2">{ChevronRight}</span>
                    {post?.knowledgeGroup?.name || "Community XYZ"} <span className="pl-2 pr-2">{DotIcon}</span>
                    <span className="color-light-gray">
                        Posted By ({post.author?.userName || "some user"}) 2 days ago
                    </span>
                </p>
                <p>
                    <span className="pl-4 pr-2">{ResizeIcon}</span>
                    <span className="pl-2 ">
                        <AwardButton />
                    </span>
                    <span className="pr-2" style={{ display: "inline-block" }}>
                        <CommentBtn text={post.totalComments} link={`/post/details/${post._id}`} />
                    </span>

                    <span className="pr-2 pl-2" style={{ display: "inline-block" }}>
                        <SavePost isSaved={post.isSaved} id={post._id} type="post" />
                    </span>

                    <span className="pr-2 pl-2" style={{ display: "inline-block" }}>
                        <ReportBtn id={post._id} />
                    </span>
                </p>
            </div>
        </div>
    )
}

export const ProfileEventsList = ({}) => {
    return <> </>
}

export const DotIcon = (
    <svg width="4" height="4" viewBox="0 0 4 4" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M2 4C3.10457 4 4 3.10457 4 2C4 0.89543 3.10457 0 2 0C0.89543 0 0 0.89543 0 2C0 3.10457 0.89543 4 2 4Z"
            fill="#243C4B"
            fill-opacity="0.6"
        />
    </svg>
)

export const ResizeIcon = (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M10.6429 1C10.4724 1 10.3088 1.06773 10.1883 1.18829C10.0677 1.30885 10 1.47236 10 1.64286C10 1.81335 10.0677 1.97687 10.1883 2.09743C10.3088 2.21798 10.4724 2.28571 10.6429 2.28571H16.8079L10.8614 8.23214C10.7941 8.28977 10.7395 8.36069 10.7009 8.44045C10.6623 8.5202 10.6406 8.60707 10.6372 8.69561C10.6338 8.78414 10.6487 8.87243 10.681 8.95492C10.7133 9.03742 10.7624 9.11234 10.825 9.17499C10.8877 9.23764 10.9626 9.28666 11.0451 9.31898C11.1276 9.3513 11.2159 9.36622 11.3044 9.3628C11.3929 9.35938 11.4798 9.3377 11.5596 9.29911C11.6393 9.26052 11.7102 9.20587 11.7679 9.13857L17.7143 3.19214V9.35714C17.7143 9.52764 17.782 9.69115 17.9026 9.81171C18.0231 9.93227 18.1866 10 18.3571 10C18.5276 10 18.6912 9.93227 18.8117 9.81171C18.9323 9.69115 19 9.52764 19 9.35714V1H10.6429Z"
            fill="#243C4B"
        />
        <path
            d="M1 10.6429C1 10.4724 1.06773 10.3088 1.18829 10.1883C1.30885 10.0677 1.47236 10 1.64286 10C1.81335 10 1.97687 10.0677 2.09743 10.1883C2.21798 10.3088 2.28571 10.4724 2.28571 10.6429V16.8079L8.23214 10.8614C8.28977 10.7941 8.36069 10.7395 8.44045 10.7009C8.5202 10.6623 8.60707 10.6406 8.69561 10.6372C8.78414 10.6338 8.87243 10.6487 8.95492 10.681C9.03742 10.7133 9.11234 10.7624 9.17499 10.825C9.23764 10.8877 9.28666 10.9626 9.31898 11.0451C9.3513 11.1276 9.36622 11.2159 9.3628 11.3044C9.35938 11.3929 9.3377 11.4798 9.29911 11.5596C9.26052 11.6393 9.20587 11.7102 9.13857 11.7679L3.19214 17.7143H9.35714C9.52764 17.7143 9.69115 17.782 9.81171 17.9026C9.93227 18.0231 10 18.1866 10 18.3571C10 18.5276 9.93227 18.6912 9.81171 18.8117C9.69115 18.9323 9.52764 19 9.35714 19H1V10.6429Z"
            fill="#243C4B"
        />
    </svg>
)
