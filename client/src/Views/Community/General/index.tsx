import React, { lazy, Suspense } from "react"

import Loader from "../../../Shared/Loader"
import { DefaultContent } from "../../../Controller/Main/ContentWithCommunities"
import { NavLink, Switch, Route } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUserFriends } from "@fortawesome/free-solid-svg-icons"

const GeneralCommunities = lazy(() => import("./Component/AllCommunities"))
const Groups = lazy(() => import("../../Groups/List"))

const Communities = () => {
    return (
        <DefaultContent>
            <div className="mc-border py-2 mt-2 communities__mapping_naigation">
                <div className="profile-tabs">
                    <div className="metainfo__community_tab">
                        <FontAwesomeIcon width="65" height="65" icon={faUserFriends} size="6x" />
                        <h2>Welcome</h2>
                        <p>
                            Here you can join vibrant communities, connect with your peers, and share resources and
                            opportunities
                        </p>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                        <ul className="nav profile-tabs-nav flex-nowrap" role="tablist">
                            <li className="nav-item">
                                <NavLink className="nav-link" exact activeClassName="active" to="/communities">
                                    Recent Posts
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" activeClassName="active" to="/communities/all">
                                    Browse Communities
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="communities_navigationbody">
                <Switch>
                    <Route
                        path={["/communities"]}
                        exact
                        render={() => (
                            <Suspense fallback={<Loader />}>
                                <GeneralCommunities />
                            </Suspense>
                        )}
                    />
                    <Route exact path="/communities/all" render={() => <Groups singleView />} />
                </Switch>
            </div>
        </DefaultContent>
    )
}

export default Communities
