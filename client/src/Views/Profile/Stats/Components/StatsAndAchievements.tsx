import React, { FC, Fragment } from "react"

import { AchievedIcon } from "../../../../Shared/Images/Images"
import { Achievements } from "../../../../Interface/Profile/Stats"
import { achievementsText } from "../../../../Constants/AchievementType"

type Achievement = {
    achievements: Achievements
}

const StatsAndAchievements: FC<Achievement> = ({ achievements }) => {
    return (
        <div className="mc-border mt-4">
            <div className="member-stats-wrap px-lg-4 px-2">
                <h6 className="heading-sm pb-3 mb-0">Achievements</h6>
                <div className="member-achievements-wrap">
                    <AchievedItems achievements={achievements} />
                </div>
            </div>
        </div>
    )
}

const AchievedItems: FC<Achievement> = ({ achievements }) => {
    return (
        <ul className="member-achievements-list mb-0 list-unstyled ">
            {Object.entries(achievements).map((item, idx) => (
                <Fragment key={idx}>
                    {item[1] && (
                        <li key={idx}>
                            <span className="img-data">
                                <img src={AchievedIcon} alt="achieved" />
                            </span>
                            <span className="text-data">{achievementsText[item[0]]}</span>
                        </li>
                    )}
                </Fragment>
            ))}
        </ul>
    )
}

export default StatsAndAchievements
