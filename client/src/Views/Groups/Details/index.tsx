import React, { lazy, Suspense, useEffect, useState, ChangeEvent } from "react"
import ReactGA from "react-ga"
import { Link, useLocation, useParams } from "react-router-dom"
import { faEdit } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import SignInAlert from "../../../Container/NotLoggedIn/SignInAlert"
import GroupTopBar from "../../../Container/Top/groupTop"
import SortBy from "../../../Container/Top/SortBy"
import MainContent from "../../../Controller/Main/Content"
import Loader from "../../../Shared/Loader"
import { TrendingCommunities } from "../../../Interface/SideBar/TrendingCommunitiesInterface"
import { isLoggedIn } from "../../../Hooks/Auth/getAuth"
import JoinBtn from "../../../Shared/HelperBtn/JoinBtn"
import CommunitiesList from "../../../Helpers/Request/Services/Communities/Communities"
import { role } from "../../../Constants/getUserId"
import { InfoIcon } from "../../../Shared/Icons"
import MessageModal from "./MessageModal"
import { chat } from "../../../Helpers/Request/Services/chat/chat"
import CommunityHeader from "./Components/Header"
import { SSL_OP_NETSCAPE_CHALLENGE_BUG } from "constants"

const GroupPosts = lazy(() => import("./Components/Posts"))
const GAEvent = (category: string, action: string, label: string) => {
    ReactGA.event({
        category: category,
        action: action,
        label: label,
        nonInteraction: false,
    })
}

const GroupDetails = () => {
    const { state }: TrendingCommunities | any = useLocation()
    const [isOpen, toggleModal] = useState(false)
    const [community, setCommunity] = useState(state)
    const [message, setMessage] = useState("")
    const { id } = useParams()
    const [sorting, setsorting] = useState("newest")
    const [page, setpage] = useState(1)

    const onModalToggle = () => toggleModal(prev => !prev)
    const [sliced, setsliced] = useState(2)
    useEffect(() => {
        CommunitiesList.fetchById(id).then(response => {
            ReactGA.pageview(response.data.data.name || "community detail")
            setCommunity(response.data.data)
        })
        //eslint-disable-next-line
    }, [id])

    const onMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(e.target.value)
    }

    const onMessageSend = () => {
        chat.sendMessageToMods(id, { message }).then(() => {
            onModalToggle()
            setMessage("")
        })
    }

    const onSortChange = (e: any) => {
        setsorting(e)
        setpage(1)
    }

    return (
        <React.Fragment>
            {community ? (
                <MainContent asideRightContent={<RightContent state={community} />}>
                    <React.Fragment>
                        <div className="mc-border mt-5 mt-lg-0 mb-3">
                            <div className="group-wrap">
                                <div className="grp-header d-flex justify-content-between">
                                    {/* <GroupTopBar state={community} /> */}
                                    <CommunityHeader
                                        community={community}
                                        renderJoinBtn={() => {
                                            return (
                                                <JoinBtn
                                                    communityId={community._id}
                                                    isJoined={community.isJoined}
                                                    isPending={community.isJoinPending}
                                                    name={community.name}
                                                />
                                            )
                                        }}
                                        renderSortBy={() => {
                                            return (
                                                <SortBy
                                                    value="newest"
                                                    hideLable={true}
                                                    onValueChange={(e: any) => onSortChange(e)}
                                                />
                                            )
                                        }}
                                    />
                                    {isLoggedIn ? (
                                        <div
                                            className="form-group mb-0"
                                            onClick={() => GAEvent("user", "resource clicked", community.name)}
                                        >
                                            {/* {role === "User" ? (
                                                <div
                                                    className="mr-2 cursor d-flex align-items-center"
                                                    onClick={onModalToggle}
                                                >
                                                    {community.isModerator ? (
                                                        <Link
                                                            to={{
                                                                pathname: `/inbox/${id}`,
                                                                state: {
                                                                    isModerator: community.isModerator,
                                                                    _id: id,
                                                                },
                                                            }}
                                                            type={"button"}
                                                            className={"btn btn-join"}
                                                        >
                                                            Inbox
                                                        </Link>
                                                    ) : (
                                                        <>
                                                            <InfoIcon />{" "}
                                                            <span className="font-weight-bold">Message Mods</span>
                                                        </>
                                                    )}
                                                </div>
                                            ) : null} */}
                                            {community.isComMod && (
                                                <Link
                                                    to={{
                                                        pathname: "/community/edit",
                                                        state: community,
                                                    }}
                                                    className="mr-2"
                                                >
                                                    <span className="icon">
                                                        <FontAwesomeIcon icon={faEdit} />
                                                    </span>
                                                    <span className="text">Edit</span>
                                                </Link>
                                            )}
                                            {/* <JoinBtn
                                                communityId={community._id}
                                                isJoined={community.isJoined}
                                                isPending={community.isJoinPending}
                                                name={community.name}
                                            /> */}
                                        </div>
                                    ) : (
                                        <div className="form-group mb-0">
                                            <SignInAlert />
                                        </div>
                                    )}
                                </div>
                                {/* <p
                                    className="general-text community__description pt-2 mb-0"
                                    dangerouslySetInnerHTML={{ __html: community.description }}
                                /> */}
                            </div>
                        </div>

                        <div className="mc-border mb-3 py-2 px-3">
                            <Link
                                to={{
                                    pathname: "/post/create",
                                    state: { community: id, create_from: "community_detail" },
                                }}
                            >
                                <div className="pc-link">Create Post</div>
                            </Link>
                        </div>
                        {/* <SortBy /> */}
                    </React.Fragment>

                    <Suspense fallback={<Loader />}>
                        <GroupPosts pageNo={page} sorting={sorting} />
                    </Suspense>
                </MainContent>
            ) : (
                <Loader />
            )}
            <MessageModal
                isOpen={isOpen}
                toggle={onModalToggle}
                message={message}
                send={onMessageSend}
                onMessageChange={onMessageChange}
                community={community}
            />
        </React.Fragment>
    )
}

const RightContent = ({ state }: any) => {
    const [sliced, setsliced] = useState(2)
    return (
        <>
            <div className="mc-border">
                <div className="moderators">
                    <div className="group-rules-list">
                        <h6 className="heading-6 ad__title bb-1 pb-3">RULES</h6>
                        <ul className="list-unstyled">
                            {state.rules?.slice(0, sliced).map((item: string[], idx: number) => (
                                <li key={idx}>
                                    <span>
                                        {idx + 1}. {item}
                                    </span>
                                </li>
                            ))}
                        </ul>
                        <div className="form-group mb-2">
                            <button className="btn btn-view" onClick={() => setsliced(state.rules.length)}>
                                VIEW ALL
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mc-border mt-5">
                <div className="moderators">
                    <div className="moderators-list">
                        <h6 className="heading-6 bb-1 pb-3">Moderators</h6>
                        <ul className="list-unstyled">
                            {(state.moderators || []).map((item: { _id: string; userName: string }, idx: number) => (
                                <li key={idx}>
                                    <Link to={`/public/profile/${item._id}`}>
                                        <span>{item.userName}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default GroupDetails
