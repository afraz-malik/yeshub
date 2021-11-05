import React, { useState, useEffect } from "react"

import Profile from ".."
import FormHeader from "../../../Container/Top/FormHeader"
import PostsItems from "../../../Controller/Home/Posts/Items"
import getUserPosts from "../../../Helpers/Request/Services/Profile/GetUserPosts"
import { SAVED_POST_EVENT, SAVED_EVENT_EVENT } from "../../../Constants/constants"
import { NavLink, Switch, Route } from "react-router-dom"
import EventsItems from "../Events/Components/EventsItems"
import IEvent from "../../../Models/User/IEvent"
import { FeedType } from "../../../Interface/Home/FeedsInterface"

const SavedFeeds = () => {
    const [savedPosts, setSavedPosts] = useState<FeedType[]>([])
    const [savedEvents, setSavedEvents] = useState<IEvent[]>([])

    useEffect(() => {
        getUserPosts.saved().then(response => {
            setSavedPosts([...response.data.data.docs])
        })

        getUserPosts.savedEvents().then(response => {
            setSavedEvents(response.data.data)
        })

        // eslint-disable-next-line
    }, [])

    const onSaveToggled = (event: any) => {
        const s = savedPosts.filter((e: FeedType) => e._id !== event.detail.id)
        setSavedPosts([...s])
    }

    const onSaveToggleEvent = (event: any) => {
        const e = savedEvents.filter((e: IEvent) => e._id !== event.detail.id)
        setSavedEvents([...e])
    }

    useEffect(() => {
        document.addEventListener(SAVED_POST_EVENT, onSaveToggled)
        return () => document.removeEventListener(SAVED_POST_EVENT, onSaveToggled)
        // eslint-disable-next-line
    }, [savedPosts])

    useEffect(() => {
        document.addEventListener(SAVED_EVENT_EVENT, onSaveToggleEvent)
        return () => document.removeEventListener(SAVED_EVENT_EVENT, onSaveToggleEvent)
        // eslint-disable-next-line
    }, [savedEvents])

    return (
        <Profile>
            <div className="profile-wrap">
                <FormHeader title="Saved" showDrafts={false} />

                <div className="mc-border py-2 mt-2">
                    <div className="profile-tabs">
                        <div className="d-flex justify-content-between align-items-center">
                            <ul className="nav profile-tabs-nav flex-nowrap" role="tablist">
                                <li className="nav-item">
                                    <NavLink className="nav-link" exact activeClassName="active" to="/profile/saved">
                                        Posts
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" activeClassName="active" to="/profile/saved/events">
                                        Events
                                    </NavLink>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <Switch>
                    <Route path="/profile/saved/events" render={() => <EventsItems events={savedEvents} />} />
                    <Route
                        path="/profile/saved"
                        render={() => <PostsItems feeds={savedPosts} awards={[]} hideAward={true} />}
                    />
                </Switch>
            </div>
        </Profile>
    )
}

export default SavedFeeds
