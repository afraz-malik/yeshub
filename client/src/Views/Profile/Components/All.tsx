import React, { useEffect, useState } from "react"

import PostsItems from "../../../Controller/Home/Posts/Items"
import getUserPosts from "../../../Helpers/Request/Services/Profile/GetUserPosts"
import EventsItems from "../Events/Components/EventsItems"
import { Link } from "react-router-dom"

const EventPostsOverView = ({ events, posts, awards }: any) => {
    const getEvents = () => {
        if (events.length > 3) {
            return events.splice(0, 3)
        }

        return events
    }

    return (
        <div className="eventPost__overview_container">
            <div className="eventPost__overview_postContainer">
                <PostsItems
                    feeds={posts.length ? [posts[0]] : []}
                    showDelete
                    isUser
                    showReportFlag={false}
                    hideAward={true}
                    awards={[]}
                />
                <div className="eventPost__overview_viewMore">
                    <Link to="/profile/user-posts">
                        <button className="btn btn-view">VIEW MORE</button>
                    </Link>
                </div>
            </div>

            <div className="eventPost__overview_eventContainer">
                <EventsItems events={getEvents()} />
                <div className="eventPost__overview_viewMore">
                    <Link to="/profile/user-events">
                        <button className="btn btn-view">VIEW MORE</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
export default EventPostsOverView
