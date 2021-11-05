import React, { FC, useEffect, useState } from "react"

import CommunitiesList from "../../../Helpers/Request/Services/Communities/Communities"
import Items from "./Items"
import { DefaultContent } from "../../../Controller/Main/ContentWithCommunities"
import { isLoggedIn } from "../../../Hooks/Auth/getAuth"
import { COMMUNITY_JOIN_TOGGLE_EVENT } from "../../../Constants/constants"

export interface GroupInterface {
    singleView?: any
}

const Groups: React.FC<GroupInterface> = ({ singleView }) => {
    const [communities, setCommunities] = useState<any>([])

    useEffect(() => {
        isLoggedIn &&
            CommunitiesList.fetchAll().then(response => {
                setCommunities(response.data.data.docs)
            })
    }, [isLoggedIn])

    const onCommunityJoinToggle = (event: any) => {
        const com = communities.map((community: any) => {
            if (event.detail.community === community._id) {
                return {
                    ...community,
                    isJoined: event.detail.isJoined,
                    isJoinPending: event.detail.isPending,
                }
            }
            return community
        })
        setCommunities(com)
    }

    useEffect(() => {
        document.addEventListener(COMMUNITY_JOIN_TOGGLE_EVENT, onCommunityJoinToggle)
        return () => document.removeEventListener(COMMUNITY_JOIN_TOGGLE_EVENT, onCommunityJoinToggle)
    }, [onCommunityJoinToggle, communities])

    if (singleView) {
        return <Items communities={communities} />
    }

    return (
        <DefaultContent>
            <Items communities={communities} />
        </DefaultContent>
    )
}

export default Groups
