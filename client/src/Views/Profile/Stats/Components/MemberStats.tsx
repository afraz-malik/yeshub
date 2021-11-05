import React, { FC, ReactElement } from "react"
import { Link } from "react-router-dom"

import { AwardImage, CookieIcon, TrophyImage } from "../../../../Shared/Images/Images"
import ProfileInterface from "../../../../Interface/Profile/Profile"
import { WEBSITE_URL } from "../../../../Constants/constants"

type MemberStats = {
    stats: ProfileInterface
}

const MemberStats: FC<MemberStats> = ({ stats }): ReactElement => {
    const { points, receivedAward = [], awardGiven = [] } = stats

    const getImageUrl = (image: any) => {
        if ([undefined, null, ""].includes(image)) {
            return undefined
        }

        return `${WEBSITE_URL}/${image}`
    }

    return (
        <div className="mc-border mt-4">
            <div className="member-stats-wrap px-lg-4 px-2">
        
                <h6 className="heading-sm pb-3 bb-1 mb-0">Member Stats</h6>
                <div className="member-stats-container">
                    <ul className="list-unstyled mb-0 member-stats-list">
                        <li>
                            <div className="member-points">
                                <span className="pt-image">
                                    <img src={CookieIcon} alt="cookie" />
                                </span>
                                <span className="pt-text">
                                    <strong>Cookie Points:</strong> {points}
                                </span>
                            </div>
                        </li>
                        <li>
                            <div className="award-earned">
                                <strong className="heading-sm">{`Awards earned (${receivedAward.length})`}</strong>
                                <div className="member-awards-list">
                                    <ul className="list-unstyled d-flex">
                                        {receivedAward.map((ra, i) => {
                                            return (
                                                <li key={i}>
                                                    <img src={getImageUrl(ra.images[0])} alt="trophy" />
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="award-earned">
                                <strong className="heading-sm">{`Awards given (${awardGiven.length})`}</strong>
                                <div className="member-awards-list">
                                    <ul className="list-unstyled d-flex">
                                        {awardGiven.map((ra, i) => {
                                            return (
                                                <li key={i}>
                                                    <img src={getImageUrl(ra.images[0])} alt="trophy" />
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </div>
                            </div>
                        </li>
                    </ul>
                    {/*<ul
                                            className="list-unstyled mb-0 pt-10 cdata-list event-related-links"
                                            id="sub-links"
                                        >
                                            <h6 className="event-head-text">
                                                Case studies contributed
                                            </h6>
                                            <li>
                                                <Link to="#">This is a Link</Link>
                                            </li>
                                            <li>
                                                <Link to="#">This is a Link</Link>
                                            </li>
                                            <li>
                                                <Link to="#">This is a Link</Link>
                                            </li>
                                        </ul>*/}
                    {/*<ul
                        className="list-unstyled mb-0 pt-10 cdata-list event-related-links"
                        id="sub-links"
                    >
                        <h6 className="event-head-text">
                            Calendar events contributed
                        </h6>
                        <li>
                            <Link to="#">This is a Link</Link>
                        </li>
                        <li>
                            <Link to="#">This is a Link</Link>
                        </li>
                        <li>
                            <Link to="#">This is a Link</Link>
                        </li>
                    </ul>*/}
                </div>
            
              </div>
         </div> 
    )
}

export default MemberStats
