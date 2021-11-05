import React, { useState, useEffect, ChangeEvent } from "react"

import MainContent from "../../../Controller/Main/Content"
import EventDetails from "./Components/Details"
import EventInfo from "../Create/Component/EventInfo"
import EventModerators from "../Create/Component/EventModerators"
import { useLocation, useParams } from "react-router-dom"
import IEvent from "../../../Models/User/IEvent"
import eventApi from "../../../Helpers/Request/Services/Event/Event"
import CommentBox from "../../Post/Details/Components/CommentBox"
import PostComments from "../../Post/Details/Components/PostComments"
import EventModeratorListSidebar from "../Create/Component/EventModeratorListSidebar"
import { isEventEditAllowed } from "../../../Helpers/Functions/isAllowed"
const EventDetail = () => {
    const { state } = useLocation<any>()
    const { id } = useParams()
    const [page, setPage] = useState(1)
    const [event, setEvent] = useState<IEvent>()
    const [comment, setComment] = useState({
        eventId: id,
        body: "",
    })

    const [comments, setComments] = useState<any>({
        comments: [],
        totalVotes: 0,
        totalReplies: 0,
    })

    useEffect(() => {}, [])

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setComment({ ...comment, [name]: value })
    }

    useEffect(() => {
        eventApi.fetchById(id).then(response => {
            setEvent({ ...response.data.data })
        })
    }, [id])

    const getComments = () => setPage(page + 1)

    useEffect(() => {
        eventApi.fetchComments(id || "", page).then(response => {
            if (response) {
                const res = response.data.body
                setComments((c: any) => ({
                    ...c,
                    comments: [...c.comments, ...res.docs],
                }))
                setComment(c => ({
                    ...c,
                    body: "",
                }))
            }
        })
    }, [page, id])

    useEffect(() => {
        document.addEventListener("comment-success", getComments)
        return () => document.removeEventListener("comment-success", getComments)
        // eslint-disable-next-line
    }, [])

    return (
        <MainContent
            asideRightContent={
                <>
                    {event && (
                        <>
                            <EventInfo event={event} />
                            {/* {isEventEditAllowed(event) ? (
                                <EventModeratorListSidebar eventID={event._id} eventTitle={event.eventName} />
                            ) : null}
                            <EventModerators event={event} /> */}
                        </>
                    )}
                </>
            }
        >
            {event && (
                <EventDetails
                    onGoingChange={going => {
                        alert("changed")
                        setEvent({ ...event, going: going })
                    }}
                    event={event}
                />
            )}
            <CommentBox
                isCommentAllowed={!!event?.isJoined}
                onChange={onChange}
                postId={comment.eventId}
                data={comment.body}
                submitUrl={"comment/to/event"}
            />
            <PostComments
                isMod={!!event?.isComMod}
                hasMoreComments={comments.totalReplies > comments.comments.length}
                fetchComments={getComments}
                isCommentAllowed={!!event?.isJoined}
                comments={comments.comments}
            />
        </MainContent>
    )
}

export default EventDetail
