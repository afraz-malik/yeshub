import * as React from "react"
import { Link } from "react-router-dom"
import SideItem from "../SideItem"
import { GroupPhoto } from "../../../../Shared/Images/Images"

export interface YesIntlProps {}

const YesIntl: React.FC<YesIntlProps> = () => {
    return (
        <>
            <div className="content__slider mt-3">
                <div className="row">
                    <div className="col-md-5 mb-3">
                        <div className="side__item heading">
                            <h3 className="title text-center mb-0">
                                Market Scanning
                            </h3>
                        </div>
                        <SideItem
                            title="Guide questions"
                            description="help staff determine what jobs exist, where the jobs are, who’s hiring, and what skills are needed to get those jobs"
                            isActive={true}
                        />

                        <SideItem
                            title="Minds the gaps"
                            description="mainstreams topics like gender, disability, and migration which often face a lack of disaggregated data"
                        />

                        <SideItem
                            title="Expert-ready"
                            description="data is collated and presented in a way that makes large data sets convenient to analyze for the appropriate technical experts"
                        />

                        <SideItem
                            title="Information democratization"
                            description="data is stored on the cloud to enable comparison across contexts, collaborations in data-gathering and analysis, and formulation of recommendations for policies and programming"
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

export default YesIntl
