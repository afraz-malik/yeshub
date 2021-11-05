import React, { FC } from "react"
import { Link } from "react-router-dom"

import TrendingCommunitiesInterface from "../../../Interface/SideBar/TrendingCommunitiesInterface"
import assetUrl from "../../../Helpers/Functions/assetUrl"

const GrowingCommunities: FC<TrendingCommunitiesInterface> = ({
    communities,
}) => {
    return (
        <>
            {communities.slice(0, 5).map((item, idx) => (
                <li key={idx}>
                    <Link
                        to={{
                            pathname: `/community/details/${item.id}`,
                            state: item,
                        }}
                    >
                        <span
                            className={`${item.id ? "hrate" : "mrate"} rating`}
                        />
                        <span>
                            <img src={assetUrl(item.logo)} className="community__img" alt={"posted"} />
                        </span>
                        <span className="title"> {item.name} </span>
                    </Link>
                </li>
            ))}
        </>
    )
}

export default GrowingCommunities
