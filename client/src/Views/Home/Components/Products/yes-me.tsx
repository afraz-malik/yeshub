import * as React from "react"
import { Link } from "react-router-dom"
import SideItem from "../SideItem"
import { GroupPhoto } from "../../../../Shared/Images/Images"

export interface YesMeProps {}

const YesMe: React.FC<YesMeProps> = () => {
    return (
        <>
            <div className="content__slider mt-3">
                <div className="row">
                    <div className="col-md-5 mb-3">
                        <div className="side__item heading">
                            <h3 className="title text-center mb-0">
                                Monitoring and evaluation
                            </h3>
                        </div>
                        <SideItem
                            title="Captures data"
                            description="at individual data level across mobile, desktop and API"
                            isActive={true}
                        />

                        <SideItem
                            title="Guided"
                            description="by International Labor Organization, World Bank, and country lead indicators"
                        />

                        <SideItem
                            title="Offline data capture"
                            description="and auto-sync for Android apps"
                        />

                        <SideItem
                            title="Self-service analytics"
                            description="and visualizations"
                        />

                        <button className="btn btn-block btn-warning text-uppercase mt-3">
                            Visit Community
                        </button>
                    </div>
                    <div className="col-md-7">
                        <img
                            src={GroupPhoto}
                            className="team__img h-100"
                            alt="group"
                        />
                    </div>
                </div>
            </div>

            <div className="row py-4">
                <div className="col-12 text-center">
                    <Link
                        to="/"
                        className="btn btn-warning text-uppercase mt-3 px-5"
                    >
                        Visit Page
                    </Link>
                </div>
            </div>
        </>
    )
}

export default YesMe
