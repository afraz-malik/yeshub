import * as React from "react"
import CommunitiesList from "../../Helpers/Request/Services/Communities/Communities"
import { COMMUNITY_JOIN_TOGGLE_EVENT } from "../../Constants/constants"
import ReactGA from "react-ga"
export interface JoinBtnProps {
    communityId: string
    isJoined: boolean
    isPending: boolean
    name: string
}

export type JoinStatus = {
    isJoined: boolean
    isPending: boolean
}

const JoinBtn: React.FC<JoinBtnProps> = ({ communityId, isJoined, isPending, name }) => {
    const [hasJoined, setJoined] = React.useState({
        isJoined,
        isPending,
    })

    const dispatchEvent = (data: JoinStatus) => {
        document.dispatchEvent(
            new CustomEvent(COMMUNITY_JOIN_TOGGLE_EVENT, {
                detail: {
                    ...data,
                    community: communityId,
                },
            })
        )
    }

    const toggleCommunity = () => {
        if (hasJoined.isJoined) {
            CommunitiesList.leaveCommunity(communityId).then(() => {
                const data = {
                    isJoined: false,
                    isPending: false,
                }
                dispatchEvent(data)
                setJoined(data)
                ReactGA.event({
                    category: "user",
                    action: "leaved",
                    label: name,
                    nonInteraction: false,
                })
            })
        } else if (!hasJoined.isPending) {
            CommunitiesList.joinCommunity(communityId).then(response => {
                const data = {
                    isJoined: response.data.isJoined,
                    isPending: response.data.isJoinPending,
                }
                dispatchEvent(data)
                ReactGA.event({
                    category: "user",
                    action: "joined",
                    label: name,
                    nonInteraction: false,
                })
                setJoined(data)
            })
        }
    }

    React.useEffect(() => {
        setJoined(data => ({ ...data, isPending }))
    }, [isPending])

    React.useEffect(() => {
        setJoined(data => ({ ...data, isJoined }))
    }, [isJoined])

    return (
        <button type="button" disabled={hasJoined.isPending} className="btn btn-join" onClick={toggleCommunity}>
            {hasJoined.isJoined ? "Leave Community" : hasJoined.isPending ? "Pending" : "Join Community"}
        </button>
    )
}

export default JoinBtn
