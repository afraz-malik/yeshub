import * as React from "react"
import { Link } from "react-router-dom"
import SideItem from "../SideItem"
import { GroupPhoto } from "../../../../Shared/Images/Images"

export interface YesAcademyProps {}

const YesAcademy: React.FC<YesAcademyProps> = () => {
    return (
        <>
            <div className="content__slider mt-3">
                <div className="row">
                    <div className="col-md-5 mb-3">
                        <div className="side__item heading">
                            <h3 className="title text-center mb-0">
                                E-Learning
                            </h3>
                        </div>
                        <SideItem
                            title="Gamified and interactive learning"
                            description="helps users retain and apply learning based on simulations and scenarios"
                            isActive={true}
                        />

                        <SideItem
                            title="Responsive"
                            description="across browsers and devices, with a mobile app to enable offline learning"
                        />

                        <SideItem
                            title="Emphasizes safety"
                            description="online, including data privacy"
                        />

                        <SideItem
                            title="Context-based courses"
                            description="are designed with country and subject matter experts to ensure relevance and appropriateness of content and delivery"
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

export default YesAcademy
