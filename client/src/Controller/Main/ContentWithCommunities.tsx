import React, { FC } from "react"
import { Link } from "react-router-dom"

import MainContent from "../../Controller/Main/Content"
import { CommunityBanner } from "../../Shared/Images/Images"

type DefaultContent = {
    extraComponent?: React.ReactNode | React.ReactNode[]
}

export const DefaultContent: FC<DefaultContent> = ({ children, extraComponent }) => {
    return (
        <>
            <MainContent
                asideRightContent={
                    <>
                        {extraComponent}
                        {/* <GrowingCommunitiesComponent
                            communities={communities}
                        /> */}
                        <TrendingCommunitiesComponent />
                    </>
                }
            >
                {children}
            </MainContent>
        </>
    )
}

// const GrowingCommunitiesComponent: FC<TrendingCommunitiesInterface> = ({
//     communities,
// }) => (
//     <div className="mc-border">
//         <div className="top-communities">
//             <div className="top-communities-list">
//                 <h6 className="heading-6 bb-1 pb-3">Top Growing Communities</h6>
//                 <ul className="list-unstyled">
//                     <Suspense fallback={<Loader />}>
//                         <GrowingCommunities communities={communities} />
//                     </Suspense>
//                 </ul>
//                 <div className="form-group mb-2">
//                     <Link to="/communities/list">
//                         <button className="btn btn-view">VIEW ALL</button>
//                     </Link>
//                 </div>
//             </div>
//         </div>
//     </div>
// )

const TrendingCommunitiesComponent: FC = () => {
    return (
        <div className="mc-border">
            <div className="top-communities">
                <div className="top-growing-list">
                    <img src={CommunityBanner} alt={CommunityBanner} className="img-responsive" />
                    <div className="form-group mb-2">
                        <Link to="/communities/list" className="btn btn-view">
                            SEE ALL COMMUNITIES
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
