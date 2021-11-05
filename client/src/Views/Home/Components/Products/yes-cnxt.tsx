import * as React from "react"
import { Link } from "react-router-dom"
import SideItem from "../SideItem"
import { GroupPhoto } from "../../../../Shared/Images/Images"

export interface YesCnxtProps {}

const YesCnxt: React.FC<YesCnxtProps> = () => {
    return (
        <>
            <div className="content__slider mt-3">
                <div className="row">
                    <div className="col-md-5 mb-3">
                        <div className="side__item heading">
                            <h3 className="title text-center mb-0">
                                Job-Matching
                            </h3>
                        </div>
                        <SideItem
                            title="Swipe for success"
                            description="CNXT combines concepts from social networking, 
job matching, and machine learning to help youth find decent work with a 
swipe of a thumb"
                            isActive={true}
                        />

                        <SideItem
                            title="Designed to cater"
                            description="to young people from disadvantaged backgrounds 
with its simple design and mechanics"
                        />

                        <SideItem
                            title="Integrated to TESSA"
                            description="the social media chatbot for employment  support"
                        />

                        <SideItem
                            title="Verified jobs"
                            description="are posted on the platform through partnerships with government and the private sector (varies from country to country)"
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

export default YesCnxt
