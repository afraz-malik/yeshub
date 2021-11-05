import * as React from "react"
import { Link } from "react-router-dom"
import assetUrl from "../../../../Helpers/Functions/assetUrl"
import { KnowledgeGroup } from "../../../../Models/User/IEvent"
import ReactGA from "react-ga"
export interface EventHeaderProps {
    community: KnowledgeGroup
}

const EventHeader: React.SFC<EventHeaderProps> = ({ community }) => {
    return (
        <Link to={`/event/details/${community._id}`}>
            <div className="post-header d-flex flex-row justify-content-between">
                <div
                    className="post-head-detail d-flex flex-row"
                    onClick={() =>
                        ReactGA.event({
                            category: "user",
                            action: "events clicked",
                            label: community?.name,
                            nonInteraction: false,
                        })
                    }
                >
                    <div className="profile-image">
                        <img src={assetUrl(community?.logo || "")} alt={community?.name} />
                    </div>
                    <div className="post-detail d-flex flex-row flex-wrap align-items-start align-items-sm-center">
                        <div className="post-in">Posted in:</div>
                        <div className="post-title  ml-1">{community?.name || ""}</div>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default EventHeader
