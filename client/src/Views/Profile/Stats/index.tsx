import React, { FC, ReactElement, useState, useEffect } from "react"

import Profile from ".."
import FormHeader from "../../../Container/Top/FormHeader"
import MemberStats from "./Components/MemberStats"
import PendingAchievements from "./Components/Pending"
import StatsAndAchievements from "./Components/StatsAndAchievements"
import UserSettings from "../../../Helpers/Request/Services/Profile/UserSettings"
import AwardApi from "../../../Helpers/Request/Services/Awards";
import Awards from "../Points"

const StatsAchievements: FC = (): ReactElement => {
    const [stats, setStats] = useState<any>({
        progressBar: {},
        achievements: {},
        points: 0,
    })
    const [awards, setawards] = useState<any>([])

    useEffect(() => {
        
        UserSettings.fetchAll().then(response => {
            setStats({
                progressBar: response.data.data.progressBar,
                achievements: response.data.data.achievements,
                points: response.data.data.points.toFixed(3),
                receivedAward: response.data.data.receivedAward || [],
                awardGiven: response.data.data.awardGiven || [],
            })
        })
        //eslint-disable
    }, [])

    return (
        <Profile>
            {/* <Awards awards={awards} stats={stats} /> */}
            <FormHeader title={"My Stats"} showDrafts={false} />
            {/*<img style={{"width": "100%"}} src="https://paintingsmadebyme.com/wp-content/uploads/2015/08/Coming-Soon-PNG.png" alt=""/>*/}
            {/*<PendingAchievements pending={stats.progressBar} />*/}
            <MemberStats stats={stats} />
            {/*<StatsAndAchievements achievements={stats.achievements /> */}
        </Profile>
    )
}
 
export default StatsAchievements
