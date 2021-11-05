import React from "react"
import { Link } from "react-router-dom"

import IGroups from "../../../../Interface/Groups/GroupsInterface"
import { PostedImage } from "../../../../Shared/Images/Images"
import JoinBtn from "../../../../Shared/HelperBtn/JoinBtn"
import assetUrl from "../../../../Helpers/Functions/assetUrl"

const Items: React.FC<IGroups> = ({ communities = [] }) => {
    return (
        <div className="mc-mid pt-lg-0 pt-5">
            {/* <div className="mc-border">
                <div className="top-communities">
                    <div className="top-communities-list">
                        <h6 className="heading-6 bb-1 pb-3">Today's top Growing Communities</h6>
                        <div className="list-unstyled"> */}
            {communities.map((item, idx) => (
                <Community key={idx} item={item} />
                // <li key={idx}>
                //     <div className="d-flex justify-content-between">
                //         <Link
                //             to={{
                //                 pathname: `/community/details/${item._id}`,
                //                 state: item,
                //             }}
                //         >
                //             <div>
                //                 <span className={`${item.id ? "hrate" : "mrate"} rating`} />
                //                 <span className="profile-image">
                //                     <img
                //                         src={item.logo ? assetUrl(item.logo) : PostedImage}
                //                         alt={"PostedBy"}
                //                     />
                //                 </span>
                //                 <span className="title"> {item.name} </span>
                //             </div>
                //         </Link>
                //         <JoinBtn
                //             communityId={item._id}
                //             isJoined={item.isJoined || false}
                //             isPending={item.isJoinPending || false}
                //             name={item.name}
                //         />
                //     </div>
                //     <p className="pt-2 community-list-description">{item.description}</p>
                // </li>
            ))}
            {/* </div>
                    </div>
                </div>
            </div> */}
        </div>
    )
}

const Community = ({ item }: any) => {
    return (
        <div className="card__layout">
            <div className="community__header">
                <Link
                    to={{
                        pathname: `/community/details/${item._id}`,
                        state: item,
                    }}
                >
                    <div className="community__header_left">
                        <span>
                            <img src={item.logo ? assetUrl(item.logo) : PostedImage} alt={"PostedBy"} />
                        </span>
                        <span className="title">
                            <span id="title_text">{item.name}</span>

                            <p id="members_row">{item.totalMembers} members</p>
                        </span>
                    </div>
                </Link>
                <div className="community__header_right">
                    <JoinBtn
                        communityId={item._id}
                        isJoined={item.isJoined || false}
                        isPending={item.isJoinPending || false}
                        name={item.name}
                    />
                </div>
            </div>
            <div className="community__body">
                <p className="pt-2">{item.description}</p>
            </div>
        </div>
    )
}

export default Items
