import * as React from "react"
import { Link } from "react-router-dom"
import SideItem from "../SideItem"
import { GroupPhoto } from "../../../../Shared/Images/Images"

export interface YesTessaProps {}

const YesTessa: React.FC<YesTessaProps> = () => {
    return (
        <>
            <div className="content__slider mt-3">
                <div className="row">
                    <div className="col-md-5 mb-3">
                        <div className="side__item heading">
                            <h3 className="title text-center mb-0">Chat bot</h3>
                        </div>
                        <SideItem
                            title="Uses natural language processing"
                            description="to help young people start their employment journey alongside a safe and non-intimidating “older sister”"
                            isActive={true}
                        />

                        <SideItem
                            title="Builds CVs"
                            description="and identifies skills with the user in a dialogue format"
                        />

                        <SideItem
                            title="Recommends jobs and trainings"
                            description="based on the user’s geographical location, skills, and interests"
                        />

                        <SideItem
                            title="Provides support"
                            description="such as interview preparation guidance and check-ups on the user’s progress along their employment journey"
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

export default YesTessa
