import React, { ReactElement } from "react"

import Create from "./Component/Create"
import { DefaultContent } from "../../../Controller/Main/ContentWithCommunities"
import { Link } from "react-router-dom"
import { RefreshIcon } from "../../../Shared/Images/Images"

const CreatePost = (): ReactElement => {
    return (
        <DefaultContent>
            <Create />
        </DefaultContent>
    )
}

export const CommunityRules = (): ReactElement => {
    return (
        <React.Fragment>
            <div className="mc-border">
                <div className="select-community-rules">
                    <div className="scr-wrap position-relative">
                        <span className="community-refresh-icon">
                            <img src={RefreshIcon} alt={"Refresh"} />
                        </span>
                        <span className="scr-link">Select a Community to load their rules</span>
                    </div>
                </div>
            </div>
            <p className="content-policy-note py-4">
                Please be mindful of YES!HUB
                <Link to="#">content policy</Link>
            </p>
        </React.Fragment>
    )
}

export default CreatePost
