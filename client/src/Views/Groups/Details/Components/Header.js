import React from "react"
import assetUrl from "../../../../Helpers/Functions/assetUrl"
import { PostedImage } from "../../../../Shared/Images/Images"

const CommunityHeader = ({ community, renderJoinBtn, renderSortBy }) => {
    const { logo, name, description, totalMembers = 0 } = community
    return (
        <div className="commuity__top_container">
            <div className="community_header_leftImage">
                <img src={logo ? assetUrl(logo) : PostedImage} alt={name} />
            </div>
            <div className="community_header_rightMeta">
                <h2>{name}</h2>
                <p className="community__members">{totalMembers} Members</p>
                <p>{description}</p>
                <div className="community__join_BtnandSort_container">
                    <div>{renderJoinBtn()}</div>
                    <div>{renderSortBy()}</div>
                </div>
            </div>
        </div>
    )
}

export default CommunityHeader
