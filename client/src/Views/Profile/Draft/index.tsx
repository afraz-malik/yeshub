import React, { useState, useEffect } from "react"

import Profile from ".."
import getUserPosts from "../../../Helpers/Request/Services/Profile/GetUserPosts"
import Announcement from "../../../Controller/Home/Announcement/Index"
import { DraftEvents } from "../../../Interface/Home/FeedsInterface"
import { formatDate } from "@fullcalendar/common"
import { Link } from "react-router-dom"

const Drafts = () => {
    const [drafts, setDrafts] = useState<DraftEvents[]>([])
    const [draftPosts, setdraftPosts] = useState<any[]>([])
    const [selected, setselected] = useState("events")
    useEffect(() => {
        getUserPosts.drafts().then(response => {
            console.log(response)
            setDrafts(response.data.data)
        })
    }, [])

    const getDraftedPosts = () => {
        getUserPosts
            .getDraftPosts()
            .then(res => {
                console.log(res)
                setdraftPosts([...res.data.data])
            })
            .catch(err => console.log(err))
    }

    return (
        <Profile>
            <div className="mc-border mt-5 mt-lg-0 mb-3">
                <div className="d-flex flex-row">
                    <span
                        onClick={() => {
                            getDraftedPosts()
                            setselected("posts")
                        }}
                        style={{
                            cursor: "pointer",
                            marginRight: "1em",
                            borderBottom: `${selected === "posts" ? "5px solid yellow" : ""}`,
                        }}
                    >
                        Posts
                    </span>
                    <span
                        onClick={() => {
                            setselected("events")
                        }}
                        style={{
                            cursor: "pointer",
                            marginRight: "1em",
                            borderBottom: `${selected === "events" ? "5px solid yellow" : ""}`,
                        }}
                    >
                        Events
                    </span>
                </div>
                <br />
            </div>

            {selected === "events" &&
                drafts.map(draft => <Announcement key={draft._id} link={`/event/create-update`} event={draft} />)}

            {selected === "posts" &&
                draftPosts.map(itm => (
                    <div className="mc-border mt-5 mt-lg-0 mb-3" style={{ padding: "1em" }}>
                        <Link to={{ pathname: "/post/create", state: itm }}>
                            <p style={{ marginBottom: "0", cursor: "pointer" }}>{itm.title}</p>
                            <span style={{ color: "lightgray" }}>{itm.createdAt.toLocaleString()}</span>
                        </Link>
                    </div>
                ))}
        </Profile>
    )
}

export default Drafts
